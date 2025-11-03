"use client";

import { motion } from "framer-motion";
import { Ghost, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-secondary/10 text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-primary/10 rounded-full p-6 mb-6"
        >
          <Ghost className="w-16 h-16 text-primary" />
        </motion.div>

        <h1 className="text-5xl font-extrabold mb-3 text-foreground">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Oops! Looks like this page got lost in the void. 👻
          Let’s get you back on track.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-6 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Error: Page not found — but your vibes are immaculate ✨
      </motion.div>
    </div>
  );
}
