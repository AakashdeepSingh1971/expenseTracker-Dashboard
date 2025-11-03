import mongoose, { Schema, Document, Model } from "mongoose";

// 1️⃣ Define TypeScript interface
export interface IExpense extends Document {
  userId: string;
  amount: number;
  category: string;
  description: string;
  transaction_date: Date;
  receipt_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Define schema
const ExpenseSchema = new Schema<IExpense>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    transaction_date: { type: Date, required: true },
    receipt_url: { type: String },
  },
  { timestamps: true }
);

// 3️⃣ Export properly typed model
export const Expense: Model<IExpense> =
  mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
