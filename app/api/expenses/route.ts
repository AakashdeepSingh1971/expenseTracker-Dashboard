import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAuthHeader } from "@/lib/auth";
import { Expense } from "@/models/Expense";

export async function GET(req: Request) {
  try {
    await connectDB();

    const user = verifyAuthHeader(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const expenses = await Expense.find({ userId: user.id })
      .sort({ transaction_date: -1 })
      .exec();

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("GET /api/expenses error:", error);
    return NextResponse.json({ message: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = verifyAuthHeader(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, category, description, transaction_date, receipt_url } = body;

    if (!amount || !category || !description || !transaction_date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const expense = await Expense.create({
      userId: user.id,
      amount,
      category,
      description,
      transaction_date,
      receipt_url,
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.error("POST /api/expenses error:", error);
    return NextResponse.json({ message: "Failed to create expense" }, { status: 500 });
  }
}
