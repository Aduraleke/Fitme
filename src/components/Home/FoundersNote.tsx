"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FoundersNote() {
  const reduce = useReducedMotion();

  return (
    <section
      id="founders-note"
      className="relative w-full bg-gradient-to-b from-[#fdfdfd] via-[#fafaff] to-[#fdfdfd] py-24 md:py-32 overflow-hidden"
      aria-label="Founders note — FitMe"
    >
      {/* soft ambient glows */}
      <div className="absolute top-[-15%] left-[-20%] w-[480px] h-[480px] bg-[#EBBAB9]/25 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[540px] h-[540px] bg-[#0A0080]/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0A0080] to-[#EBBAB9]">
            The Founders Behind FitMe
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#0A0080]/75 max-w-2xl mx-auto leading-relaxed">
            Where <span className="font-semibold text-[#0A0080]">fashion</span> meets{" "}
            <span className="font-semibold text-[#EBBAB9]">technology</span> and every size,
            every silhouette, finds its perfect match.
          </p>
        </div>

        {/* founders grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative flex flex-col md:flex-row items-center md:items-stretch gap-14 md:gap-10"
        >
          {/* left card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            className="relative w-full md:w-1/2"
          >
            <div className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 md:p-10 shadow-[0_12px_60px_rgba(10,0,128,0.08)] hover:shadow-[0_20px_80px_rgba(10,0,128,0.12)] transition-all duration-500">
              <div className="flex items-center gap-5">
                <Image
                  src="/Pelumi.png"
                  alt="Oluwapelumi — Founder"
                  width={90}
                  height={90}
                  className="rounded-2xl object-cover border border-white/50"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#0A0080]">Oluwapelumi</h3>
                  <p className="text-sm text-[#0A0080]/70">Founder & Design Lead, FitMe</p>
                </div>
              </div>

              <blockquote className="mt-6 italic text-[#0A0080]/90 leading-relaxed border-l-4 border-[#EBBAB9]/60 pl-4">
                “Fashion is personal, it’s how you speak without words. FitMe is where that
                individuality meets precision.”
              </blockquote>

              <p className="mt-5 text-sm text-[#0A0080]/80 leading-relaxed">
                My dream has always been to create a world where clothes truly fit who you are. FitMe
                removes the stress, uncertainty, and disappointment of wrong sizes, giving everyone
                the joy of a perfect fit.
              </p>
            </div>
          </motion.div>

          {/* animated connecting pulse */}
          <div className="hidden md:flex items-center justify-center relative w-1/6">
            <motion.div
              className="absolute inset-0"
              animate={
                reduce
                  ? {}
                  : {
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.08, 1],
                    }
              }
              transition={
                reduce ? {} : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-[#0A0080]/30 via-[#EBBAB9]/50 to-[#0A0080]/30 rounded-full" />
            </motion.div>

            <div className="z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#EBBAB9]/90 to-[#0A0080]/80 flex items-center justify-center shadow-[0_8px_30px_rgba(10,0,128,0.2)]">
              <Icon icon="mdi:infinity" width="26" className="text-white opacity-90" />
            </div>
          </div>

          {/* right card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            className="relative w-full md:w-1/2"
          >
            <div className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 md:p-10 shadow-[0_12px_60px_rgba(10,0,128,0.08)] hover:shadow-[0_20px_80px_rgba(10,0,128,0.12)] transition-all duration-500">
              <div className="flex items-center gap-5">
                <Image
                  src="/aduraleke.png"
                  alt="Aduraleke Odesanmi — Co-Founder"
                  width={90}
                  height={90}
                  className="rounded-2xl object-cover border border-white/50"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#0A0080]">TechLeke</h3>
                  <p className="text-sm text-[#0A0080]/70">Co-Founder & Engineering Lead, FitMe</p>
                </div>
              </div>

              <blockquote className="mt-6 italic text-[#0A0080]/90 leading-relaxed border-l-4 border-[#0A0080]/40 pl-4">
                “Technology should feel human. FitMe is how we use data to restore comfort, joy, and
                confidence to fashion.”
              </blockquote>

              <p className="mt-5 text-sm text-[#0A0080]/80 leading-relaxed">
                We designed FitMe’s engine to learn your unique shape, adapt to designers, and make
                personalized fashion seamless from profile to perfect fit.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* mobile connection */}
        <div className="md:hidden mt-12 flex justify-center">
          <div className="w-20 h-[2px] bg-gradient-to-r from-[#0A0080]/30 via-[#EBBAB9]/50 to-[#0A0080]/30 rounded-full" />
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <motion.a
            href="/About"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-3 text-sm rounded-full bg-gradient-to-tr from-[#0A0080] to-[#EBBAB9] text-white font-semibold shadow-lg"
          >
            Learn More About FitMe
            <Icon icon="mdi:arrow-right" width="20" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
