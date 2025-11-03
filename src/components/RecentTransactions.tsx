import { useEffect, useState } from "react";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  receipt_url?: string;
  transaction_date: string;
}

const RecentTransactions = ({ userId }: { userId: string }) => {
  const [transactions, setTransactions] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No auth token found");
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.data) {
          setTransactions(res.data);
        }


      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading recent transactions...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <ul className="space-y-4">
        {transactions.slice(0, 5).map((tx) => (
          <li
            key={tx._id}
            className="flex items-center justify-between p-3 rounded-xl bg-muted hover:bg-muted/70 transition"
          >
            <div className="flex items-center space-x-3">
              {tx.receipt_url ? (
                <img
                  src={tx.receipt_url}
                  alt="receipt"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-muted-foreground/10 flex items-center justify-center rounded-lg">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">
                  {tx.description || tx.category}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(tx.transaction_date), "PP")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                ${tx.amount.toFixed(2)}
              </p>
              <ArrowUpRight className="w-4 h-4 text-primary inline-block ml-1" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
