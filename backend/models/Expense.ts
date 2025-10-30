import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  transaction_date: { type: Date, required: true },
  receipt_url: { type: String },
}, { timestamps: true });

export const Expense = mongoose.model('Expense', ExpenseSchema);
