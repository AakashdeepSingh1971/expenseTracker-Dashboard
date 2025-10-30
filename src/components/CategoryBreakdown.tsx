import { motion } from "framer-motion";
import { ShoppingBag, Coffee, Home, Car, Heart, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Shopping", amount: 1240, percentage: 28.6, icon: ShoppingBag, color: "bg-primary" },
  { name: "Food & Dining", amount: 890, percentage: 20.6, icon: Coffee, color: "bg-secondary" },
  { name: "Housing", amount: 1450, percentage: 33.5, icon: Home, color: "bg-accent" },
  { name: "Transportation", amount: 420, percentage: 9.7, icon: Car, color: "bg-destructive" },
  { name: "Health", amount: 228, percentage: 5.3, icon: Heart, color: "bg-primary/60" },
  { name: "Others", amount: 100, percentage: 2.3, icon: MoreHorizontal, color: "bg-muted" },
];

const CategoryBreakdown = () => {
  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow h-full"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-bold text-foreground mb-6">
        Spending by Category
      </h2>
      <div className="space-y-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`${category.color} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    ${category.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {category.percentage}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`${category.color} h-full rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryBreakdown;
