"use client";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

interface ChartData {
  month: string;
  spending: number;
  budget: number;
  savings: number;
}

const SpendingChart = ({ data }: { data: { spendingTrends: ChartData[] } }) => {
  const spendingData = data?.spendingTrends || [];

  if (!spendingData.length) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border h-full flex items-center justify-center text-muted-foreground">
        No spending data available.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:shadow-lg transition-shadow"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1">
            Spending Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Last 6 months comparison
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground font-medium">Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground font-medium">Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground font-medium">Savings</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={spendingData}>
          <defs>
            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160 60% 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160 60% 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(180 60% 50%)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(180 60% 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(160 20% 90%)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="hsl(160 10% 45%)"
            style={{ fontSize: "13px", fontWeight: "500" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(160 10% 45%)"
            style={{ fontSize: "13px", fontWeight: "500" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.12)",
              padding: "12px 16px",
            }}
            labelStyle={{ fontWeight: "600", color: "hsl(160 10% 10%)" }}
            formatter={(value) => [`$${value}`, ""]}
          />
          <Area
            type="monotone"
            dataKey="spending"
            stroke="hsl(160 60% 50%)"
            strokeWidth={3}
            fill="url(#spendingGradient)"
            dot={{ r: 6, fill: "hsl(160 60% 50%)", strokeWidth: 2, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="budget"
            stroke="hsl(180 60% 50%)"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#budgetGradient)"
            dot={{ r: 5, fill: "hsl(180 60% 50%)", strokeWidth: 2, stroke: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="hsl(45 95% 55%)"
            strokeWidth={2}
            dot={{ r: 5, fill: "hsl(45 95% 55%)", strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SpendingChart;
