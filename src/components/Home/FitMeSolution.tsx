"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Icon } from "@iconify/react";

const STEPS = [
  {
    id: "profile",
    title: "Create Your Size Profile",
    desc: "30s setup, input or upload your measurements to build your unique size profile.",
    icon: "solar:user-rounded-bold-duotone",
  },
  {
    id: "browse",
    title: "Explore 'Made in Your Size'",
    desc: "Instantly see pieces crafted to fit you, no more size guessing.",
    icon: "fluent:hat-graduation-24-filled",
  },
  {
    id: "customize",
    title: "Customize Every Detail",
    desc: "Adjust sleeve length, waistline, or neckline with one tap.",
    icon: "ph:scissors-duotone",
  },
  {
    id: "delivery",
    title: "Perfect-Fit Delivery",
    desc: "Tailored, shipped, and ready to wear — zero returns, pure confidence.",
    icon: "mdi:truck-delivery-outline",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  }),
};

export default function FitMeSolution() {
  return (
    <section
      id="solution"
      className="relative w-full bg-gradient-to-br from-[#fff] via-[#fafafa] to-[#fefefe] py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient Blurs */}
      <div className="absolute left-[-8%] top-[-10%] w-[460px] h-[460px] bg-[#EBBAB9]/25 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[-8%] w-[520px] h-[520px] bg-[#0A0080]/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0A0080] to-[#EBBAB9]">
            The FitMe Solution
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#0A0080]/80 max-w-2xl mx-auto leading-relaxed">
            FitMe redefines fashion fit, guiding you seamlessly from profile to perfection in just four steps.
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden md:block relative">
          {/* Animated subtle gradient line */}
          <motion.svg
            aria-hidden
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-48 pointer-events-none"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="movingGradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#0A0080">
                  <animate attributeName="offset" values="0;1;0" dur="6s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#EBBAB9">
                  <animate attributeName="offset" values="0.5;1;0.5" dur="6s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#0A0080">
                  <animate attributeName="offset" values="1;0;1" dur="6s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>

            {/* Main flow line */}
            <path
              d="M40 120 C300 -30 900 -30 1160 120"
              fill="none"
              stroke="url(#movingGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />

            {/* Very soft glow underneath */}
            <path
              d="M40 120 C300 -30 900 -30 1160 120"
              fill="none"
              stroke="#EBBAB9"
              strokeOpacity="0.05"
              strokeWidth="5"
            />
          </motion.svg>

          {/* Animated nodes */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 px-16 z-0">
            {STEPS.map((_, i) => (
              <motion.span
                key={i}
                className="w-3 h-3 rounded-full bg-[#EBBAB9]/50 shadow-[0_0_8px_#EBBAB9]/40"
                animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, delay: i * 0.6, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Step cards */}
          <div className="relative z-10 flex justify-between gap-6 px-8">
            {STEPS.map((s, i) => (
              <motion.article
                key={s.id}
                custom={i}
                initial="hidden"
                animate="show"
                variants={cardVariants}
                className="w-[22%] min-w-[230px] flex-shrink-0 text-center"
              >
                <div className="relative flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-white/95 backdrop-blur-lg border border-white/60 shadow-[0_12px_35px_rgba(10,0,128,0.07)]"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-[#0A0080]/15"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.3, 0.6] }}
                      transition={{ repeat: Infinity, duration: 3 + i }}
                    />
                    <Icon icon={s.icon} width="36" height="36" color="#0A0080" />
                  </motion.div>
                  <h3 className="mt-5 text-[16px] font-semibold text-[#0A0080] leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#0A0080]/75 leading-relaxed max-w-[220px] mx-auto">
                    {s.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden grid gap-8 mt-6">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.id}
              custom={i}
              initial="hidden"
              whileInView="show"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.5 }}
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/70 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#EBBAB9]/20 to-[#0A0080]/10 shadow-[0_6px_18px_rgba(10,0,128,0.05)]">
                  <Icon icon={s.icon} width="28" height="28" className="text-[#0A0080]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#0A0080]">{s.title}</h4>
                  <p className="mt-1 text-xs text-[#0A0080]/80">{s.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <motion.a
            href="/Profile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-tr from-[#EBBAB9] to-[#0A0080] text-white font-semibold shadow-lg"
          >
            Get Your Perfect Fit
            <Icon icon="mdi:arrow-right" width="20" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
