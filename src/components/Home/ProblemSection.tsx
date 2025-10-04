"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Icon } from "@iconify/react";

export default function ProblemSection() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(340);

  const problems = useMemo(
    () => [
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
    ],
    []
  );

  // Handle orbit radius for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const w = Math.min(window.innerWidth, 1400);
      setOrbitRadius(Math.max(220, Math.round(Math.min(380, w * 0.25))));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous rotation using motion value
  const angle = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf: number;
    let last = performance.now();
    let a = angle.get();
    const speed = 0.008333; // rotation speed

    const loop = (now: number) => {
      if (!paused) {
        const dt = now - last;
        a = (a + dt * speed) % 360;
        angle.set(a);
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, prefersReducedMotion, angle]);

  // React state synced with angle motion value
  const [rotation, setRotation] = useState(0);
  useMotionValueEvent(angle, "change", (latest) => {
    setRotation(latest);
  });

  // Auto-rotate cards on mobile
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
      {/* Pattern & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,0,128,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-25 pointer-events-none" />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-16 left-[-80px] w-[360px] h-[360px] bg-[#0A0080]/25 blur-[120px] rounded-full mix-blend-multiply"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-10 right-[-100px] w-[420px] h-[420px] bg-[#EBBAB9]/25 blur-[150px] rounded-full mix-blend-multiply"
      />

      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-20 absolute md:top-1/2 md:-translate-y-1/2 top-[-50px] w-full"
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
            Every bad fit starts a ripple, confusion, returns, frustration.{" "}
            <br />
            <span className="font-semibold text-[#0A0080]">FitMe</span> stops
            the wave.
          </p>
        </motion.div>

        {/* Orbiting cards (Desktop) */}
        <div
          className="relative w-[650px] h-[650px] hidden md:block mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {problems.map((p, i) => {
            const a = rotation;
            const rad = ((a + p.offset) * Math.PI) / 180;
            const x = Math.cos(rad) * orbitRadius;
            const y = Math.sin(rad) * orbitRadius;
            const rotate = `${a + p.offset}deg`;

            return (
              <React.Fragment key={p.title}>
                <motion.div
                  className="absolute left-1/2 top-1/2 origin-top -translate-x-1/2"
                  style={{
                    rotate,
                    height: orbitRadius,
                    width: 2,
                    background: `linear-gradient(to bottom, #EBBAB9, transparent)`,
                    opacity: 0.6,
                  }}
                />
                <motion.div
                  style={{ x, y }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 3,
                      boxShadow: `0 0 40px ${p.color}60`,
                    }}
                    transition={{ type: "spring", stiffness: 180 }}
                    className="relative group w-32 h-32 flex flex-col items-center justify-center rounded-2xl bg-white/90 border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-lg"
                    style={{
                      boxShadow: `0 0 40px ${p.color}30`,
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
                  <p className="text-sm text-[#0A0080]/80 mt-1 max-w-[220px] mx-auto leading-snug text-justify">
                    {p.desc}
                  </p>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="md:hidden relative flex flex-col items-center justify-center mt-24 mb-16 w-full min-h-[50vh] rounded-xl overflow-hidden">
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
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center px-6 z-10"
            >
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
                className="w-24 h-24 flex items-center justify-center rounded-3xl bg-white/90 border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-lg"
              >
                <Icon
                  icon={problems[activeIndex].icon}
                  width="48"
                  height="48"
                  color={problems[activeIndex].color}
                />
              </motion.div>

              <motion.h3
                className="text-lg font-semibold text-[#0A0080] mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {problems[activeIndex].title}
              </motion.h3>
              <p className="text-sm text-[#0A0080] mt-4 max-w-[300px] leading-relaxed">
                {problems[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-14 z-20">
            {problems.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show ${p.title}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-[#0A0080] scale-110"
                    : "bg-gray-300 hover:bg-[#0A0080]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
