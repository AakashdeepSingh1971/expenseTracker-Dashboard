"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { apiFetch } from "@/lib/api";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/api/uploadthing/route";

// ✅ Form validation schema
const expenseSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(1, "Description is required").max(200),
});

const categories = [
  "Shopping",
  "Food & Dining",
  "Housing",
  "Transportation",
  "Health",
  "Entertainment",
  "Others",
];

export default function AddExpenseDialog({
  onExpenseAdded,
}: {
  onExpenseAdded?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  // ✅ Reset form fields
  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setTransactionDate(new Date().toISOString().split("T")[0]);
    setReceiptUrl(null);
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      expenseSchema.parse({
        amount: parseFloat(amount),
        category,
        description,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        amount: parseFloat(amount),
        category,
        description,
        transaction_date: new Date(transactionDate).toISOString(),
        receipt_url: receiptUrl,
      };

      await apiFetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success("Expense added successfully!");
      setOpen(false);
      resetForm();
      onExpenseAdded?.();
    } catch (err: any) {
      const message =
        err?.message ||
        err?.response?.data?.message ||
        "Failed to add expense. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto transition-all duration-200 ease-out">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min={0}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              required
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
              maxLength={200}
              rows={3}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Transaction Date</Label>
            <Input
              id="date"
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              required
              disabled={loading}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Receipt Upload */}
          <div className="space-y-2">
            <Label>Receipt (Optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors min-h-[160px] flex flex-col justify-center">
              {receiptUrl ? (
                <div className="relative">
                  <img
                    src={receiptUrl}
                    alt="Receipt preview"
                    className="w-full h-40 object-cover rounded-lg border"
                    title={receiptUrl}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setReceiptUrl(null)}
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <UploadButton<OurFileRouter, "receiptUploader">
                    endpoint="receiptUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]?.url) {
                        setReceiptUrl(res[0].url);
                        toast.success("Receipt uploaded successfully!");
                      }
                    }}
                    onUploadBegin={() => toast.info("Uploading receipt...")}
                    onUploadError={(err) => {
                      toast.error("Upload error:" + err.message);
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload an image of your receipt (max 8MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Adding..." : "Add Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
