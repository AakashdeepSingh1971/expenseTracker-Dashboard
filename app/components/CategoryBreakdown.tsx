"use client";

import { motion } from "framer-motion";
import { Wallet, ShoppingBag, Home, Utensils, Car, Heart, Film, MoreHorizontal } from "lucide-react";

const iconMap: Record<string, any> = {
  "shopping": ShoppingBag,
  "food & dining": Utensils,
  "housing": Home,
  "transportation": Car,
  "health": Heart,
  "entertainment": Film,
  "others": Wallet,
};

export default function CategoryBreakdown({ data }: { data: any }) {
  if (!data?.categoryBreakdown || data.categoryBreakdown.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border text-center text-muted-foreground">
        No category data available yet.
      </div>
    );
  }

  const categories = data.categoryBreakdown;
  const totalSpent = data.totalSpent || 0;

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border border-border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-foreground">Category Breakdown</h2>
      <div className="space-y-4">
        {categories.map((category: any, index: number) => {
          const Icon = iconMap[category._id?.toLowerCase()] || MoreHorizontal;
          const percent = ((category.total / totalSpent) * 100).toFixed(1);

          return (
            <motion.div
              key={category._id || index}
              className="flex items-center justify-between p-3 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {category._id}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {percent}% of total
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-foreground">
                  ${category.total.toLocaleString()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
