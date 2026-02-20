/*
 * EmailGate — full-screen email capture overlay
 * Design: Noir Cinema — dark theater, gold spotlight
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Shield } from "lucide-react";

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export default function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter your email");
      return;
    }
    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(245,197,24,0.08) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#F5C518" }}
          >
            BidSnap
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Instant Sealcoating Pricing
          </p>
        </div>

        {/* Gate card */}
        <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-lg p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#F5C518]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#F5C518]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Exclusive Product Demo
              </h2>
              <p className="text-xs text-[#777]">Enter your email to view</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@company.com"
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-[#111] border border-[#333] rounded-md text-white placeholder-[#555] focus:outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]/30 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#F5C518] hover:bg-[#e6b800] text-[#0a0a0a] font-semibold rounded-md transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Watch Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-[10px] text-[#555] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            This demo is watermarked and limited to 3 views.
            <br />
            Your email will be displayed as a security watermark.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
