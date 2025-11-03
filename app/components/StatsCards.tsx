"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingDown, Wallet, PiggyBank, Target } from "lucide-react";

interface Expense {
  amount: number;
  category: string;
  transaction_date: string;
  userId: string;
}

interface StatCard {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: any;
  color?: string;
  bgColor?: string;
}

interface StatsCardsProps {
  userId?: string;
  refreshTrigger?: number;
  data?: Expense[]; // ✅ allows pre-fetched data
}

const StatsCards = ({ userId, refreshTrigger = 0, data }: StatsCardsProps) => {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        let expenses: Expense[] = [];

        if (data && data.length > 0) {
          expenses = data;
        } else {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No auth token found");
            setLoading(false);
            return;
          }

          const res = await axios.get(`/api/expenses`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          expenses = Array.isArray(res.data) ? res.data : [];
        }

        if (expenses.length === 0) {
          setStats([
            {
              label: "No data yet",
              value: "$0",
              change: "Start adding expenses",
              changeType: "neutral",
              icon: Wallet,
              color: "text-muted-foreground",
              bgColor: "bg-muted",
            },
          ]);
          return;
        }

        // ✅ Total spent
        const totalSpent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

        // ✅ Monthly totals
        const monthlyTotals: Record<string, number> = {};
        expenses.forEach((e) => {
          const month = new Date(e.transaction_date).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
        });

        const months = Object.keys(monthlyTotals).sort((a, b) => {
          const da = new Date(a);
          const db = new Date(b);
          return da.getTime() - db.getTime();
        });

        const thisMonth = months[months.length - 1];
        const lastMonth = months[months.length - 2];
        const thisMonthValue = monthlyTotals[thisMonth] || 0;
        const lastMonthValue = monthlyTotals[lastMonth] || 0;
        const monthDiff = thisMonthValue - lastMonthValue;

        // ✅ Top category
        const categoryTotals: Record<string, number> = {};
        expenses.forEach((e) => {
          categoryTotals[e.category] =
            (categoryTotals[e.category] || 0) + e.amount;
        });
        const sortedCategories = Object.entries(categoryTotals).sort(
          (a, b) => b[1] - a[1]
        );
        const [topCategory, topCategoryValue] = sortedCategories[0] || [
          "N/A",
          0,
        ];

        // ✅ Build stat cards
        const computedStats: StatCard[] = [
          {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString()}`,
            change: `${months.length} month${months.length > 1 ? "s" : ""}`,
            changeType: "neutral",
            icon: Wallet,
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            label: "Top Category",
            value: topCategory,
            change: `$${topCategoryValue.toLocaleString()}`,
            changeType: "neutral",
            icon: Target,
            color: "text-secondary",
            bgColor: "bg-secondary/10",
          },
          {
            label: "Average per Month",
            value: `$${(totalSpent / months.length).toFixed(2)}`,
            change: "",
            changeType: "positive",
            icon: PiggyBank,
            color: "text-accent",
            bgColor: "bg-accent/10",
          },
          {
            label: "vs Last Month",
            value: `${monthDiff >= 0 ? "+" : "-"}$${Math.abs(
              monthDiff
            ).toLocaleString()}`,
            change: monthDiff >= 0 ? "More spent" : "Less spent",
            changeType: monthDiff >= 0 ? "negative" : "positive",
            icon: TrendingDown,
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
        ];

        setStats(computedStats);
      } catch (err) {
        console.error("❌ Failed to fetch stats:", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, refreshTrigger, data]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  if (loading)
    return (
      <div className="text-center text-muted-foreground py-6">
        Loading stats...
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label || index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.change && (
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.changeType === "positive"
                        ? "bg-primary/10 text-primary"
                        : stat.changeType === "negative"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold mb-1 text-foreground">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
