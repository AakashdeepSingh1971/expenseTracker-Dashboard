import { NextResponse, NextRequest } from "next/server";
import { Expense } from "@/models/Expense";
import { verifyAuthHeader } from "@/lib/auth";
import "@/lib/db";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // 👈 await params because it's a Promise in Next 14+
  const user = verifyAuthHeader(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await Expense.findOneAndDelete({ _id: id, userId: user.id });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
