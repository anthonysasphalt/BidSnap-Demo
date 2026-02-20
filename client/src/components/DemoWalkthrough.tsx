/*
 * DemoWalkthrough — Animated 6-step BidSnap product walkthrough
 * Design: Noir Cinema — dark theater, gold spotlight, auto-advancing steps
 * Each step shows a polished animated mockup of the BidSnap flow
 */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, HelpCircle, Satellite, DollarSign,
  FileCheck, CalendarCheck, ChevronLeft, ChevronRight,
  Play, Pause, RotateCcw,
} from "lucide-react";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/wrmu01ynKvsMiVLcddWnvf/sandbox/BqJksrIMGteY9obSzP7WWQ-img-1_1771621179000_na1fn_Ymlkc25hcC1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvd3JtdTAxeW5LdnNNaVZMY2RkV252Zi9zYW5kYm94L0JxSmtzcklNR3RlWTlvYlN6UDdXV1EtaW1nLTFfMTc3MTYyMTE3OTAwMF9uYTFmbl9ZbWxrYzI1aGNDMW9aWEp2TFdKbi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=D3LciJ8xtGjgYbey8IHYzHQoU1xiC0Xi8v66cQAOIXW8W7FFVLkxw~0IJcL~qGJaeQsqbr95KkgopPGPZFJR9NdKvCzc~Ju7~r-WjZDSCWsCaIKlijtjYFjC0V2EEz0FTaGQGm4FKlFvOr9tewKb4ot92nUSGSk~0-pkcBXTh9bsGiEDPW6r1ms49Iq4mGRRGMuNuQYesDyI9gR2kY5FlkvU3hB7EK0KqBg3JHb~7owzYwOjWhT0NfAU~6FYU94lswqMZpnWSjT6ZZTasiEhg-PbcnjbGV5OceBTekPHwGXiINdKiGv~UFmpB50W7Y7mnzvCk-77c00cJTfwiTbJcQ__";

const SATELLITE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/wrmu01ynKvsMiVLcddWnvf/sandbox/BqJksrIMGteY9obSzP7WWQ-img-3_1771621172000_na1fn_Ymlkc25hcC1zYXRlbGxpdGU.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvd3JtdTAxeW5LdnNNaVZMY2RkV252Zi9zYW5kYm94L0JxSmtzcklNR3RlWTlvYlN6UDdXV1EtaW1nLTNfMTc3MTYyMTE3MjAwMF9uYTFmbl9ZbWxrYzI1aGNDMXpZWFJsYkd4cGRHVS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PzFrrDtgKjJqDCjB7V0QiK7WgX7UBH5zVnJqtZhtofZVzRw2GunV3BIXEWgsnSptttZYHpn-GnqhaiQ9CLoBEOIBg78M3M-glC1lZJW~yl866GEV37UDTAzC~w9q43fj~BGnTmYlwHuy3Oi4NNONQgk4U-avyIf44jboir~zp4n36~LCih97fqmNqvByfA11Jbg2XICnYZyOmIgW4kk90yrnOImpWEmujsICvmgrIp0iVs5HVj3ZQqzi7aveZ5anOHKFaaXSsiH5drtSjheXTk2nLkakmkS9Jzro0mSsymLBbjRoAYYEowlxTXL9ekV0nCGJSTyUbjfL4yxpi7udFQ__";

const CONTRACT_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/wrmu01ynKvsMiVLcddWnvf/sandbox/BqJksrIMGteY9obSzP7WWQ-img-4_1771621166000_na1fn_Ymlkc25hcC1jb250cmFjdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvd3JtdTAxeW5LdnNNaVZMY2RkV252Zi9zYW5kYm94L0JxSmtzcklNR3RlWTlvYlN6UDdXV1EtaW1nLTRfMTc3MTYyMTE2NjAwMF9uYTFmbl9ZbWxrYzI1aGNDMWpiMjUwY21GamRBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=FBMiNEk3wXsR0BysOLp-5X86Ad32ssbWaa1EveXXA7z1Y5qy8-8mNJUSBwQFKl6SQqUh8FT7LpeyEkUoM5Fc~-aBUhDTq3d16C88MbN06oQj~WZN2dwhbDxOBSLyy-mSiJDc-FESYsW6w~im98eSO0I-PDRXHA8iC6M-qUOGAqJ71HLYOYfNuIRc9~4UbLF45TpXtWiTuJLDM4BajfCu~mqzTU1NQ2dsAme6H0gG44ojzfm~D~oXnyvO6QMLldniH1LJzLrlfP3tKuxMsrxkHn6rRLayX5TrxOblBNXXO1gPzxQSfg3LLKV1yhJ--OKHiaw-1R470twnZG8Fnaz~gA__";

const STEP_DURATION = 7000;

interface StepData {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

function Step1Content() {
  const [typed, setTyped] = useState("");
  const address = "1847 Lakewood Dr, Grass Lake, MI";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= address.length) {
        setTyped(address.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 70);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-5">
      <div
        className="rounded-lg overflow-hidden h-40 sm:h-48 relative"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[10px] uppercase tracking-widest text-[#F5C518] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Property Location
          </p>
        </div>
      </div>
      <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
        <label className="text-xs text-[#666] mb-2 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Enter property address
        </label>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#F5C518] shrink-0" />
          <span className="text-white text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
            {typed}
            <span className="animate-pulse text-[#F5C518]">|</span>
          </span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="bg-[#F5C518] text-[#0a0a0a] text-center py-2.5 rounded-md font-semibold text-sm"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Look Up Property
      </motion.div>
    </div>
  );
}

function Step2Content() {
  const [q1, setQ1] = useState(-1);
  const [q2, setQ2] = useState(-1);

  useEffect(() => {
    const t1 = setTimeout(() => setQ1(1), 1200);
    const t2 = setTimeout(() => setQ2(2), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const q1Options = ["Less than 5 years", "5–10 years", "10–20 years", "20+ years"];
  const q2Options = ["Never", "1–2 years ago", "3–5 years ago", "5+ years ago"];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Question 1 of 2
        </p>
        <p className="text-white text-sm font-medium mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          How old is your driveway?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {q1Options.map((opt, i) => (
            <motion.div
              key={opt}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className={`text-xs py-2.5 px-3 rounded-md border text-center transition-all ${
                q1 === i
                  ? "border-[#F5C518] bg-[#F5C518]/10 text-[#F5C518]"
                  : "border-[#2a2a2a] bg-[#111] text-[#999]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {opt}
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-[#888] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Question 2 of 2
        </p>
        <p className="text-white text-sm font-medium mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          When was it last sealed?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {q2Options.map((opt, i) => (
            <motion.div
              key={opt}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.15 }}
              className={`text-xs py-2.5 px-3 rounded-md border text-center transition-all ${
                q2 === i
                  ? "border-[#F5C518] bg-[#F5C518]/10 text-[#F5C518]"
                  : "border-[#2a2a2a] bg-[#111] text-[#999]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {opt}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3Content() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden relative h-48 sm:h-56">
        <img
          src={SATELLITE_IMG}
          alt="Satellite measurement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/30" />
        {progress < 100 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
              <Satellite className="w-6 h-6 text-[#F5C518] mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-[#999] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Measuring driveway...
              </p>
              <div className="w-40 h-1.5 bg-[#222] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#F5C518] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
        {progress >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
              <p className="text-[#F5C518] text-lg font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                900 sq ft
              </p>
              <p className="text-xs text-[#999]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Driveway area detected
              </p>
            </div>
          </motion.div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Length", value: "45 ft" },
          { label: "Width", value: "20 ft" },
          { label: "Area", value: "900 sq ft" },
        ].map((item) => (
          <div key={item.label} className="bg-[#111] border border-[#2a2a2a] rounded-md py-2 px-1">
            <p className="text-[10px] text-[#666]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
            <p className="text-sm text-[#F5C518] font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4Content() {
  const [showPrice, setShowPrice] = useState(false);
  const [countUp, setCountUp] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setShowPrice(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showPrice) return;
    const target = 347;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      setCountUp((c) => {
        if (c >= target) { clearInterval(timer); return target; }
        return Math.min(c + step, target);
      });
    }, 40);
    return () => clearInterval(timer);
  }, [showPrice]);

  return (
    <div className="space-y-4">
      <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-xs text-[#666] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Price Calculation
        </p>
        <div className="space-y-2 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {[
            { label: "Driveway Area", value: "900 sq ft" },
            { label: "Base Rate", value: "$0.28/sq ft" },
            { label: "Distance Zone", value: "Zone A (< 15 mi)" },
            { label: "Condition Factor", value: "1.15x (5-10 yr)" },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.3 }}
              className="flex justify-between py-1.5 border-b border-[#1a1a1a]"
            >
              <span className="text-[#777]">{row.label}</span>
              <span className="text-white">{row.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPrice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[#F5C518]/20 to-[#F5C518]/5 border border-[#F5C518]/30 rounded-lg p-6 text-center"
          >
            <p className="text-xs text-[#F5C518] uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Your Instant Quote
            </p>
            <p className="text-4xl font-bold text-[#F5C518]" style={{ fontFamily: "'Space Mono', monospace" }}>
              ${countUp}
            </p>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Professional sealcoating • 2-year warranty
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        {["Zone A: < 15 mi", "Zone B: 15–30 mi", "Zone C: 30+ mi"].map((z, i) => (
          <div
            key={z}
            className={`flex-1 text-center py-1.5 rounded text-[10px] border ${
              i === 0
                ? "border-[#F5C518] bg-[#F5C518]/10 text-[#F5C518]"
                : "border-[#222] bg-[#111] text-[#555]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {z}
          </div>
        ))}
      </div>
    </div>
  );
}

function Step5Content() {
  const [checks, setChecks] = useState([false, false, false]);

  useEffect(() => {
    const t1 = setTimeout(() => setChecks([true, false, false]), 1200);
    const t2 = setTimeout(() => setChecks([true, true, false]), 2400);
    const t3 = setTimeout(() => setChecks([true, true, true]), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const items = [
    "I acknowledge the quoted price of $347",
    "I understand the 2-year warranty terms",
    "I agree to the service terms & conditions",
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden relative h-32">
        <img
          src={CONTRACT_IMG}
          alt="Contract"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
      </div>
      <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-xs text-[#F5C518] font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Service Agreement
        </p>
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.5 }}
              className="flex items-start gap-3"
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  checks[i]
                    ? "border-[#F5C518] bg-[#F5C518]"
                    : "border-[#444] bg-transparent"
                }`}
              >
                {checks[i] && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-[#0a0a0a]"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </div>
              <span className="text-xs text-[#ccc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      {checks.every(Boolean) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F5C518] text-[#0a0a0a] text-center py-2.5 rounded-md font-semibold text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Sign & Continue
        </motion.div>
      )}
    </div>
  );
}

function Step6Content() {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooked(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dates = [
    { day: "Mon", date: "Mar 3", available: true },
    { day: "Tue", date: "Mar 4", available: false },
    { day: "Wed", date: "Mar 5", available: true },
    { day: "Thu", date: "Mar 6", available: true },
    { day: "Fri", date: "Mar 7", available: true },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-xs text-[#666] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Select preferred date
        </p>
        <div className="flex gap-2">
          {dates.map((d, i) => (
            <motion.div
              key={d.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`flex-1 text-center py-3 rounded-md border transition-all ${
                i === 2
                  ? "border-[#F5C518] bg-[#F5C518]/10"
                  : d.available
                  ? "border-[#2a2a2a] bg-[#0a0a0a]"
                  : "border-[#1a1a1a] bg-[#0a0a0a] opacity-40"
              }`}
            >
              <p className="text-[10px] text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{d.day}</p>
              <p
                className={`text-xs font-bold ${i === 2 ? "text-[#F5C518]" : "text-white"}`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {d.date.split(" ")[1]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CRM Integration Active
          </p>
        </div>
        <div className="space-y-1.5 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {[
            "Customer record created",
            "Job card generated",
            "Crew notification sent",
            "Calendar event synced",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.4 }}
              className="flex items-center gap-2 text-[#aaa]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {booked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4 text-center"
          >
            <CalendarCheck className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-sm font-semibold text-green-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Job Scheduled!
            </p>
            <p className="text-xs text-[#888]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Wed, Mar 5 • 9:00 AM – 12:00 PM
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const STEPS: StepData[] = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Enter Address",
    subtitle: "Client enters their property address",
    content: <Step1Content />,
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    title: "Qualifying Questions",
    subtitle: "Two quick questions about the driveway",
    content: <Step2Content />,
  },
  {
    icon: <Satellite className="w-5 h-5" />,
    title: "Satellite Measurement",
    subtitle: "AI measures the driveway automatically",
    content: <Step3Content />,
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Instant Pricing",
    subtitle: "Price calculated by distance from Grass Lake, MI",
    content: <Step4Content />,
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    title: "Mini Contract",
    subtitle: "Acknowledgment checkboxes and agreement",
    content: <Step5Content />,
  },
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    title: "Job Scheduled",
    subtitle: "Booked via CRM integration",
    content: <Step6Content />,
  },
];

interface DemoWalkthroughProps {
  onMusicToggle: () => void;
  isMusicPlaying: boolean;
}

export default function DemoWalkthrough({ onMusicToggle, isMusicPlaying }: DemoWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [stepKey, setStepKey] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
        setStepKey((k) => k + 1);
      } else {
        setIsAutoPlaying(false);
      }
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [currentStep, isAutoPlaying]);

  const goTo = useCallback((step: number) => {
    setCurrentStep(step);
    setStepKey((k) => k + 1);
    setIsAutoPlaying(false);
  }, []);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setStepKey((k) => k + 1);
    setIsAutoPlaying(true);
  }, []);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] no-select flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-[#1a1a1a]">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "#F5C518" }}
        >
          BidSnap
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={onMusicToggle}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-[#F5C518] hover:border-[#F5C518]/30 transition-colors"
            title={isMusicPlaying ? "Pause music" : "Play music"}
          >
            {isMusicPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-xs text-[#555]" style={{ fontFamily: "'Space Mono', monospace" }}>
            {currentStep + 1}/{STEPS.length}
          </span>
        </div>
      </header>

      <div className="h-0.5 bg-[#1a1a1a]">
        <motion.div
          className="h-full bg-[#F5C518]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="hidden lg:flex flex-col w-64 border-r border-[#1a1a1a] py-6 px-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#555] mb-4 px-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Product Walkthrough
          </p>
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all mb-1 ${
                i === currentStep
                  ? "bg-[#F5C518]/10 text-[#F5C518]"
                  : i < currentStep
                  ? "text-[#666] hover:text-[#999]"
                  : "text-[#444] hover:text-[#666]"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border ${
                  i === currentStep
                    ? "border-[#F5C518] bg-[#F5C518]/20 text-[#F5C518]"
                    : i < currentStep
                    ? "border-[#333] bg-[#222] text-[#666]"
                    : "border-[#222] bg-[#111] text-[#444]"
                }`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {i + 1}
              </div>
              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {s.title}
              </span>
            </button>
          ))}

          <div className="mt-auto pt-4">
            <button
              onClick={restart}
              className="flex items-center gap-2 text-xs text-[#555] hover:text-[#F5C518] transition-colors px-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restart Demo
            </button>
          </div>
        </aside>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepKey}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center text-[#F5C518]">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5C518]" style={{ fontFamily: "'Space Mono', monospace" }}>
                      Step {currentStep + 1}
                    </p>
                    <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#888] mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step.subtitle}
                </p>

                <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-xl p-5 shadow-2xl shadow-black/50">
                  {step.content}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => goTo(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-1 text-xs text-[#555] hover:text-[#F5C518] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-1.5 lg:hidden">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentStep ? "bg-[#F5C518] w-6" : "bg-[#333]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentStep < STEPS.length - 1) {
                    goTo(currentStep + 1);
                  } else {
                    restart();
                  }
                }}
                className="flex items-center gap-1 text-xs text-[#555] hover:text-[#F5C518] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {currentStep === STEPS.length - 1 ? "Restart" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
