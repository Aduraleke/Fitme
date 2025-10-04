"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants, easeInOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../public/newlogo.png";

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

const anchorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -6 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.1,
      ease: easeInOut, 
    },
  },
  hover: {
    scale: 1.04,
    transition: { duration: 0.25 },
  },
};


const nodeIn = { opacity: 0, y: 18 };
const nodeShow = (i: number) => ({
  opacity: 1,
  y: 0,
  transition: { delay: 0.25 + i * 0.06, duration: 0.5 },
});

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) nextIndex();
    else if (info.offset.x > 40) prevIndex();
  };

  const mobileBg = [
    "radial-gradient(circle at 30% 20%, rgba(235,186,185,0.3), rgba(10,0,128,0.08))",
    "radial-gradient(circle at 70% 30%, rgba(10,0,128,0.25), rgba(235,186,185,0.1))",
    "radial-gradient(circle at 50% 60%, rgba(186,222,220,0.3), rgba(255,255,255,0))",
    "radial-gradient(circle at 40% 80%, rgba(10,0,128,0.25), rgba(235,186,185,0.08))",
    "radial-gradient(circle at 50% 20%, rgba(235,186,185,0.2), rgba(10,0,128,0.05))",
  ];

  return (
    <section
      aria-label="FitMe hero — the future of personal fit"
      className="relative min-h-screen w-full bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#fdfdfd] overflow-hidden"
    >
      {/* Dynamic Background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: mobileBg[index] }}
      />

      {/* Main Center Logo + Orbit */}
      <div className="relative z-10 flex flex-col justify-center items-center px-6 py-16 space-y-6">
        <motion.div
          initial="hidden"
          animate="show"
          whileHover={!reducedMotion ? "hover" : undefined}
          variants={anchorVariants}
          className="relative w-[min(68vw,680px)] h-[min(68vw,680px)] flex items-center justify-center rounded-full"
        >
          {/* Glassy Glow Rings */}
          <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-[6px] border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.08)]" />
          <div className="absolute -left-10 -top-8 w-[62%] h-[62%] rounded-[40%] bg-gradient-to-tr from-[#EBBAB9]/70 to-transparent blur-[30px] mix-blend-screen -rotate-6" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[54%] h-[54%] rounded-[48%] bg-gradient-to-br from-[#0A0080]/70 to-transparent blur-[42px] mix-blend-overlay rotate-12" />

         <div className="relative w-[66%] h-[66%] flex items-center justify-center rounded-full">
            <div className="absolute inset-0 rounded-full border-2 border-[#EBBAB9]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border-4 border-dashed border-[#0A0080]/18" />
            <div className="relative w-28 h-28 sm:w-40 md:w-72 sm:h-40 md:h-72 flex items-center justify-center rounded-full bg-white/90 shadow-xl">
              <Image
                src={logo}
                alt="FitMe"
                className="w-20 sm:w-24 md:w-60 h-20 sm:h-24 md:h-60 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 text-center md:hidden px-6 mt-4 md:mt-0"
        >
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-snug tracking-tight bg-gradient-to-r from-[#0A0080] to-[#EBBAB9] bg-clip-text text-transparent drop-shadow-sm">
            Your Style. Your Fit.
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#0A0080]/80 max-w-md mx-auto">
            Experience clothing that truly fits you personalized, precise, and planet-friendly.
          </p>
        </motion.div>
      </div>

      {/* Orbiting Nodes for Desktop */}
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
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
              onClick={() => n.type === "cta" && router.push("/profile-setup")}
              className="absolute pointer-events-auto group focus:outline-none"
              style={positions[i] as React.CSSProperties}
              aria-label={n.title}
            >
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-white/50 rounded-2xl px-4 py-2 shadow-lg hover:shadow-[#0A0080]/20 transition">
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

      {/* Mobile Node List */}
      <motion.div
        className="flex flex-col gap-3 md:hidden px-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {NODES.map((n, i) => (
          <motion.button
            key={n.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              goToIndex(i);
              if (n.type === "cta") router.push("/profile-setup");
            }}
            className={`flex justify-between items-center bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl px-5 py-4 shadow-lg transition-all ${
              index === i
                ? "border-[#0A0080] shadow-[#0A0080]/25 scale-[1.04]"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex flex-col text-left">
              <span className="text-base font-semibold text-[#0A0080]">{n.title}</span>
              <span className="text-xs text-gray-500">{n.hint}</span>
            </div>
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                n.type === "cta" ? "bg-[#0A0080]" : "bg-[#EBBAB9]"
              }`}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Mobile CTA */}
      <Link
        href="/profile-setup"
        className="block md:hidden mx-auto mt-8 w-[85%] max-w-xs text-center px-5 py-3 rounded-full bg-gradient-to-tr from-[#EBBAB9] to-[#0A0080] text-white font-semibold shadow-lg hover:opacity-90 transition"
      >
        Get Started
      </Link>

      {/* Bottom Carousel */}
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
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto w-full bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md border border-white/40 rounded-3xl px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold text-[#0A0080]">
                  {NODES[index].title}
                </div>
                <div className="text-xs text-gray-500">{NODES[index].hint}</div>
              </div>
              <div>
                {NODES[index].type === "cta" ? (
                  <Link
                    href="/profile-setup"
                    className="inline-block px-4 py-2 rounded-full bg-gradient-to-tr from-[#EBBAB9] to-[#0A0080] text-white font-medium text-sm"
                  >
                    Get Started
                  </Link>
                ) : (
                  <button
                    onClick={() => console.log("Open action for", NODES[index].id)}
                    className="px-4 py-2 rounded-full bg-[#0A0080]/10 text-[#0A0080] font-medium text-sm"
                  >
                    Open
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
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

      {/* Animations */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.85;
          }
        }
      `}</style>
    </section>
  );
}
