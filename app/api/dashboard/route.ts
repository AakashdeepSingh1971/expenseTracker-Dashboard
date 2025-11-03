import { NextResponse } from "next/server";
import { verifyAuthHeader } from "@/app/lib/auth";
import { Expense } from "@/app/models/Expense";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
    await connectDB();

    const user = verifyAuthHeader(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch dashboard data
    const [expenses, stats, categories] = await Promise.all([
        Expense.find({ userId: user.id }).sort({ transaction_date: -1 }).limit(10), // recent
        Expense.aggregate([
            { $match: { userId: user.id } },
            { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
        ]),
        Expense.aggregate([
            { $match: { userId: user.id } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } },
        ]),
    ]);

    // Generate monthly spending trends
    const allTransactions = await Expense.find({ userId: user.id }).sort({ transaction_date: 1 });

    const monthlyTotals: Record<string, number> = {};
    allTransactions.forEach((tx) => {
        const month = new Date(tx.transaction_date).toLocaleString("default", {
            month: "short",
            year: "numeric",
        });
        monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
    });

    const spendingTrends = Object.entries(monthlyTotals).map(([month, spending]) => ({
        month,
        spending,
        budget: 2000, // 🔧 placeholder, replace with dynamic value if available
        savings: Math.max(0, 2000 - spending),
    }));

    return NextResponse.json({
        recentTransactions: expenses,
        totalSpent: stats[0]?.total || 0,
        totalTransactions: stats[0]?.count || 0,
        categoryBreakdown: categories,
        spendingTrends, // ✅ added for SpendingChart
    });
}
