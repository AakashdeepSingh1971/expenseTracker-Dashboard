"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import StatsCards from "@/components/StatsCards";
import SpendingChart from "@/components/SpendingChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import RecentTransactions from "@/components/RecentTransactions";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import { apiFetch } from "@/lib/api";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await apiFetch("/api/dashboard");
        setDashboardData(data);
        setUser(data.user); // if you return user info in /api/dashboard
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/auth");
      }
    };

    fetchDashboardData();
  }, [router, refreshKey]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signed out successfully");
    router.push("/auth");
  };

  const handleExpenseAdded = () => {
    setRefreshKey((prev) => prev + 1); // re-fetch dashboard data
  };

  if (!dashboardData)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading your dashboard...
      </div>
    );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <motion.header
          className="mb-10 lg:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">💰</span>
                <span className="text-sm font-semibold text-primary">
                  Financial Insights
                </span>
              </motion.div>
            </div>
            <div className="flex items-center gap-3">
              <AddExpenseDialog onExpenseAdded={handleExpenseAdded} />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSignOut}
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Spending Analytics
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track expenses, manage budgets, and take control of your money.
            </p>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-10"
        >
          <StatsCards userId={user?._id} refreshTrigger={refreshKey} data={dashboardData.recentTransactions} />
        </motion.div>

        {/* Charts & Breakdown */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <SpendingChart data={dashboardData} />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <CategoryBreakdown data={dashboardData} />
          </motion.div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <RecentTransactions data={dashboardData} />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Built with 💙 — Empowering smarter financial habits</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Dashboard;
