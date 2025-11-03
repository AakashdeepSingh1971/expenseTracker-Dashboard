import { NextResponse } from "next/server";
import { Expense } from "@/models/Expense";
import { verifyAuthHeader } from "@/lib/auth";
import "@/lib/db";

interface Params {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: Params) {
  const user = verifyAuthHeader(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await Expense.findOneAndDelete({ _id: params.id, userId: user.id });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
