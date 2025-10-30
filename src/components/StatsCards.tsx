import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingDown, Wallet, PiggyBank, Target } from "lucide-react";

const mockStats = [
  {
    label: "Total Spent",
    value: "$4,328",
    change: "-8.2%",
    changeType: "positive",
    icon: Wallet,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Monthly Budget",
    value: "$5,000",
    change: "86.6% used",
    changeType: "neutral",
    icon: Target,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    label: "Total Saved",
    value: "$672",
    change: "+12.5%",
    changeType: "positive",
    icon: PiggyBank,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "vs Last Month",
    value: "-$356",
    change: "8.2% less",
    changeType: "positive",
    icon: TrendingDown,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const StatsCards = ({ userId }: { userId: string }) => {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/stats/${userId}`);
        if (res.data) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats, using mock data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading stats...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            initial="initial"
            animate="animate"
          >
            <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
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
