/*
 * ExpiredView — shown when max views (3) have been reached
 */
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function ExpiredView() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6"
      >
        <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-[#F5C518]" />
        </div>
        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          This Demo Has Expired
        </h1>
        <p className="text-[#777] max-w-sm mx-auto mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          You have reached the maximum number of views (3) for this demo.
          Please contact us for a live walkthrough.
        </p>
        <a
          href="mailto:demo@bidsnap.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5C518] text-[#0a0a0a] font-semibold rounded-md hover:bg-[#e6b800] transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Request Live Demo
        </a>
      </motion.div>
    </div>
  );
}
