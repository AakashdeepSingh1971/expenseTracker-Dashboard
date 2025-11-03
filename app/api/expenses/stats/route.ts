import { NextResponse } from "next/server";
import { Expense } from "@/models/Expense";
import { verifyAuthHeader } from "@/lib/auth";
import "@/lib/db";

export async function GET(req: Request) {
  const user = verifyAuthHeader(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const agg = await Expense.aggregate([
      { $match: { userId: user.id } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);
    return NextResponse.json(agg[0] || { total: 0, count: 0 });
  } catch {
    return NextResponse.json({ message: "Stats failed" }, { status: 500 });
  }
}
