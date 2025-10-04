"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Icon } from "@iconify/react";

export default function ProblemSection() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [angle, setAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAngle((a) => (a + 0.25) % 360), 30);
    return () => clearInterval(interval);
  }, []);

  const orbitRadius = 340;

  const problems = [
    {
      title: "Inconsistent Sizing",
      desc: "‘Medium’ means something different at every brand. Shopping online feels like guessing.",
      icon: "mdi:ruler",
      color: "#0A0080",
      ring: "#4A3EC7",
      offset: 0,
    },
    {
      title: "Frustrating Returns",
      desc: "Over 40% of returns come from poor fit, draining your confidence and time.",
      icon: "mdi:package-variant-remove",
      color: "#EBBAB9",
      ring: "#F3C7C6",
      offset: 120,
    },
    {
      title: "Wasted Time & Money",
      desc: "Reordering, repacking, measuring fashion shouldn’t feel like logistics.",
      icon: "mdi:clock-alert-outline",
      color: "#0A0080",
      ring: "#EBBAB9",
      offset: 240,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % problems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [problems.length]);

  return (
    <section
      id="problem"
      className="relative w-full min-h-[90vh] overflow-hidden flex justify-center items-center bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f8]"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,0,128,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-25 pointer-events-none" />

      {/* soft floating lights */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-16 left-[-80px] w-[360px] h-[360px] bg-[#0A0080]/25 blur-[140px] rounded-full mix-blend-multiply"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-10 right-[-100px] w-[420px] h-[420px] bg-[#EBBAB9]/30 blur-[180px] rounded-full mix-blend-multiply"
      />

      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-20 px-4 absolute md:top-1/2 md:-translate-y-1/2 top-[-50px] w-full"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-[#0A0080] via-[#5641a3] to-[#EBBAB9] bg-clip-text text-transparent drop-shadow-sm tracking-tight"
          >
            The Fit Problem
          </motion.h2>
          <p className="text-[#0A0080]/80 mt-4 text-sm md:text-lg max-w-md mx-auto leading-relaxed">
            Every bad fit starts a ripple — confusion, returns, frustration.{" "}
            <br />
            <span className="font-semibold text-[#0A0080]">FitMe</span> stops
            the wave.
          </p>
        </motion.div>

        {/* Orbiting (Desktop only) */}
        <div className="relative w-[650px] h-[650px] hidden md:block mt-16">
          {problems.map((p, i) => {
            const rad = ((angle + p.offset) * Math.PI) / 180;
            const x = Math.cos(rad) * orbitRadius;
            const y = Math.sin(rad) * orbitRadius;

            return (
              <motion.div
                key={p.title}
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.3, duration: 0.6 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              >
                {/* connecting beam */}
                <motion.div
                  className="absolute w-[2px] h-[120px] top-[50%] left-[50%] origin-top"
                  style={{
                    rotate: `${p.offset}deg`,
                    background: `linear-gradient(to bottom, ${p.color}80, transparent)`,
                  }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3.5 + i, repeat: Infinity }}
                />

                {/* orbit card */}
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: 3,
                    boxShadow: `0 0 40px ${p.color}60`,
                  }}
                  transition={{ type: "spring", stiffness: 180 }}
                  className="relative group w-32 h-32 flex flex-col items-center justify-center rounded-2xl bg-white/90 border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-lg"
                  style={{
                    boxShadow: `0 0 50px ${p.color}30`,
                    background: "linear-gradient(180deg, #ffffffdd, #f9f9ffcc)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl border"
                    style={{ borderColor: `${p.ring}40` }}
                    animate={{
                      scale: [1, 1.12, 1],
                      opacity: [0.6, 0.3, 0.6],
                    }}
                    transition={{ repeat: Infinity, duration: 4 + i }}
                  />
                  <Icon icon={p.icon} width="42" height="42" color={p.color} />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className="text-lg font-bold mt-4 text-[#0A0080]"
                >
                  {p.title}
                </motion.h3>
                <p
                  className="text-sm text-[#0A0080]/80 mt-1 max-w-[220px] mx-auto leading-snug text-justify"
                  style={{ textJustify: "inter-word", hyphens: "auto" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Section */}
        <div className="md:hidden relative flex flex-col items-center justify-center mt-24 mb-16 w-full min-h-[50vh] rounded-xl overflow-hidden">
          {/* Animated Gradient Backdrop */}
          <motion.div
            key={`bg-${activeIndex}`}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `linear-gradient(180deg, ${problems[activeIndex].color}15, white 85%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col items-center text-center px-6 z-10"
            >
              {/* Floating icon */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    `0 0 20px ${problems[activeIndex].color}40`,
                    `0 0 35px ${problems[activeIndex].color}60`,
                    `0 0 20px ${problems[activeIndex].color}40`,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.2,
                  ease: "easeInOut",
                }}
                className="w-32 h-32 flex items-center justify-center rounded-3xl bg-white/90 border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-lg"
              >
                <Icon
                  icon={problems[activeIndex].icon}
                  width="54"
                  height="54"
                  color={problems[activeIndex].color}
                />
              </motion.div>

              <motion.h3
                className="text-2xl font-semibold text-[#0A0080] mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {problems[activeIndex].title}
              </motion.h3>

              <p className="text-base text-gray-700 mt-4 max-w-[300px] leading-relaxed">
                {problems[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-14 z-20">
            {problems.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-[#0A0080] scale-125 shadow-[0_0_10px_#0A008090]"
                    : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
