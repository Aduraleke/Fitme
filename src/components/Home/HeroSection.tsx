"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../public/newlogo.png";

// ---------- CONSTANTS ---------- //
type Node = {
  id: string;
  title: string;
  type: "cta" | "action" | "info" | "proof";
  hint: string;
};

const NODES: Node[] = [
  { id: "cta", title: "Create Size Profile", type: "cta", hint: "30s setup" },
  { id: "upload", title: "Upload Design", type: "action", hint: "We recreate it" },
  { id: "why", title: "Why FitMe?", type: "info", hint: "Perfect fit, fewer returns" },
  { id: "trust", title: "Trusted Designers", type: "proof", hint: "In-house & vetted" },
  { id: "eco", title: "Sustainable", type: "info", hint: "Made on demand" },
];

const anchorVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -6 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] },
  },
  hover: { scale: 1.03, transition: { duration: 0.25 } },
} as const;

const nodeIn = { opacity: 0, y: 18 };
const nodeShow = (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.5 } });

// ---------- COMPONENT ---------- //
export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // ---- Carousel Navigation ---- //
  const nextIndex = useCallback(() => setIndex((s) => (s + 1) % NODES.length), []);
  const prevIndex = useCallback(() => setIndex((s) => (s - 1 + NODES.length) % NODES.length), []);
  const goToIndex = (i: number) => setIndex(i);

  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) return;
    autoRotateRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % NODES.length);
    }, 4000);
  }, []);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, [startAutoRotate, stopAutoRotate]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    if (info.offset.x < -40) nextIndex();
    else if (info.offset.x > 40) prevIndex();
  };

  return (
    <section
      aria-label="FitMe hero — the future of personal fit"
      className="relative min-h-screen w-full bg-gradient-to-br from-[#fff] to-[#fdfdfd] overflow-hidden"
    >
      {/* Background Gradients */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_40%_at_20%_20%,_rgba(235,186,185,0.12),_transparent),radial-gradient(60%_40%_at_85%_85%,_rgba(10,0,128,0.08),_transparent)]"
      />

      {/* Logo + Rings */}
      <div className="relative z-10 flex justify-center items-center px-6 py-12">
        <motion.div
          initial="hidden"
          animate="show"
          whileHover={!reducedMotion ? "hover" : undefined}
          variants={anchorVariants}
          className="relative w-[min(52vw,680px)] h-[min(52vw,680px)] flex items-center justify-center rounded-full"
        >
          {/* Subtle gradient glows */}
          <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-[6px] border border-white/30 shadow-2xl" />
          <div className="absolute -left-10 -top-8 w-[62%] h-[62%] rounded-[40%] bg-gradient-to-tr from-[#EBBAB9]/80 to-transparent blur-[28px] mix-blend-screen -rotate-6" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[54%] h-[54%] rounded-[48%] bg-gradient-to-br from-[#0A0080]/70 to-transparent blur-[42px] mix-blend-overlay rotate-12" />

          {/* Spinning Rings */}
          <div className="relative w-[66%] h-[66%] flex items-center justify-center rounded-full">
            <div className="absolute inset-0 rounded-full border-2 border-[#EBBAB9]/30 animate-spin-slow" />
            <div className="absolute inset-6 rounded-full border-4 border-dashed border-[#0A0080]/18" />
            <div className="relative w-28 h-28 sm:w-40 md:w-72 sm:h-40 md:h-72 flex items-center justify-center rounded-full bg-white/90 shadow-xl">
              <Image src={logo} alt="FitMe" className="w-20 sm:w-24 md:w-60 h-20 sm:h-24 md:h-60 object-contain" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Orbiting Nodes */}
      <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
        {NODES.map((n, i) => {
          const positions = [
            { left: "10%", top: "18%" },
            { right: "16%", top: "22%" },
            { left: "6%", bottom: "26%" },
            { right: "14%", bottom: "26%" },
            { left: "45%", top: "6%" },
          ];
          return (
            <motion.button
              key={n.id}
              initial={nodeIn}
              animate={nodeShow(i)}
              whileHover={{ scale: 1.04 }}
              whileFocus={{ scale: 1.04 }}
              onClick={() => n.type === "cta" && router.push("/profile-setup")}
              className="absolute pointer-events-auto group focus:outline-none"
              style={positions[i] as React.CSSProperties}
              aria-label={n.title}
            >
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-lg focus-visible:ring-4 focus-visible:ring-[#0A0080]/20">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ background: n.type === "cta" ? "#0A0080" : "#EBBAB9" }}
                />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-[#0A0080]">{n.title}</span>
                  <span className="text-xs text-gray-500">{n.hint}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Mobile Nodes */}
      <div className="flex flex-col gap-2 md:hidden mt-6 px-6">
        {NODES.map((n,) => (
          <button
            key={n.id}
            onClick={() => n.type === "cta" && router.push("/profile-setup")}
            className="flex justify-between items-center bg-white/90 border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-visible:ring-2 focus-visible:ring-[#0A0080]"
          >
            <span className="text-sm font-semibold text-[#0A0080]">{n.title}</span>
            <span className="text-xs text-gray-500">{n.hint}</span>
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div
        className="relative md:absolute left-0 right-0 bottom-6 z-30 px-6 md:px-0 flex justify-center mt-16 md:mt-0"
        onMouseEnter={stopAutoRotate}
        onMouseLeave={startAutoRotate}
      >
        <div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              onDragEnd={handleDragEnd}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto w-full bg-white/95 backdrop-blur-md border border-white/40 rounded-3xl px-4 py-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold text-[#0A0080]">{NODES[index].title}</div>
                <div className="text-xs text-gray-500">{NODES[index].hint}</div>
              </div>
              <div>
                {NODES[index].type === "cta" ? (
                  <Link
                    href="/profile-setup"
                    className="inline-block px-5 py-3 rounded-full bg-gradient-to-tr from-[#EBBAB9] to-[#0A0080] text-white font-medium text-sm"
                  >
                    Get Started
                  </Link>
                ) : (
                  <button
                    onClick={() => console.log("Open action for", NODES[index].id)}
                    className="px-5 py-3 rounded-full bg-[#0A0080]/10 text-[#0A0080] font-medium text-sm"
                  >
                    Open
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="mt-4 flex justify-center gap-3">
            {NODES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className={`h-3 w-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0A0080] ${
                  i === index ? "bg-[#0A0080]" : "bg-gray-300"
                }`}
                aria-label={`Go to ${NODES[i].title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="sr-only">
        Use tab to navigate nodes. Press Enter to open. Swipe cards on mobile.
      </div>

      {/* Spin Keyframes */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
