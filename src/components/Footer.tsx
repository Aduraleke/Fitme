"use client";

import React, { JSX } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/newlogo.png";

type NavItem = { label: string; href: string };

const COMPANY: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Explore", href: "/explore" },
  { label: "Shop", href: "/shop" },
  { label: "Careers", href: "/careers" },
];

const RESOURCES: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
];

const CONTACT: NavItem[] = [
  { label: "Email: info@fitme.com", href: "mailto:info@fitme.com" },
  { label: "Phone: +1 (234) 567-89", href: "tel:+123456789" },
  { label: "Lagos, Nigeria", href: "/contact" },
];

function Card({
  title,
  items,
  rotation = 0,
  lift = -6,
  className = "",
}: {
  title: string;
  items: NavItem[];
  rotation?: number;
  lift?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
      initial={reduce ? undefined : { y: 0, scale: 1 }}
      whileHover={reduce ? undefined : { y: lift, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={
        "rounded-2xl bg-white/70 backdrop-blur-md border border-white/30 shadow-lg p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0080]/30 " +
        className
      }
      tabIndex={0}
    >
      <h4
        id={title.replace(/\s+/g, "-").toLowerCase()}
        className="text-md font-semibold mb-3 text-[#0A0080]"
      >
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-[#0A0080]/80">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className="hover:text-[#EBBAB9] block transition-colors duration-150 focus:outline-none focus-visible:underline"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

export default function CoutureFooter(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <footer className="relative bg-gradient-to-b from-white to-[#f8faff] overflow-hidden pt-10 pb-6 px-6 sm:px-8">
      {/* Decorative blur shapes */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#EBBAB9]/18 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-[#0A0080]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Layout wrapper */}
        <div className="grid grid-cols-1 gap-6 md:gap-4 c-footer-grid">
          {/* Brand + Orb + Resources */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10 items-start">
            
            {/* Brand */}
            <div className="flex justify-center md:justify-end mt-4 md:mt-8">
              <Card
                title="Brand"
                items={COMPANY}
                rotation={-3}
                lift={-8}
                className="w-full max-w-sm sm:w-64 lg:w-72"
              />
            </div>

            {/* Orb + CTA */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={reduce ? undefined : { scale: 0.95, opacity: 0 }}
                whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-20"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-[#0A0080]/18 to-[#EBBAB9]/22 flex items-center justify-center shadow-2xl border border-white/40">
                  <Image src={logo} alt="FitMe" width={60} height={60} />
                </div>
                {/* stitch accent */}
                <svg
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-52 h-6 opacity-70"
                  viewBox="0 0 200 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10 C50 0,150 20,200 10"
                    stroke="#0A0080"
                    strokeWidth="0.7"
                    strokeDasharray="3 4"
                  />
                </svg>
              </motion.div>

              {/* CTA under orb */}
              <div className="mt-3 w-full sm:w-[280px] md:w-[320px] -translate-y-2">
                <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/30 shadow-lg p-5 text-center">
                  <h3 className="text-base font-semibold mb-2 text-[#0A0080]">
                    Find Your Fit
                  </h3>
                  <p className="text-sm text-[#0A0080]/70 mb-3">
                    Smart size suggestions from your measurements & community
                    feedback.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Link
                      href="/fit"
                      className="inline-block px-4 py-2 rounded-full bg-[#0A0080] text-white text-sm shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0080]/30"
                    >
                      Try Size Finder
                    </Link>
                    <Link
                      href="/explore"
                      className="inline-block px-4 py-2 rounded-full border border-[#0A0080]/12 text-sm text-[#0A0080] hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0080]/20"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="flex justify-center md:justify-start mt-4 md:mt-8">
              <Card
                title="Resources"
                items={RESOURCES}
                rotation={3}
                lift={-6}
                className="w-full max-w-sm sm:w-64 lg:w-72"
              />
            </div>
          </div>

          {/* Community + Contact (always visible, stacked on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-6 justify-items-center mt-4">
            <Card
              title="Community"
              items={[
                { label: "Events", href: "/events" },
                { label: "Forum", href: "/forum" },
                { label: "Partners", href: "/partners" },
              ]}
              rotation={-5}
              lift={-8}
              className="w-full max-w-sm sm:w-64 lg:w-72 justify-self-center sm:justify-self-end"
            />
            <Card
              title="Contact"
              items={CONTACT}
              rotation={4}
              lift={-6}
              className="w-full max-w-sm sm:w-64 lg:w-72 justify-self-center sm:justify-self-start"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-[#0A0080]/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#0A0080]/70">
          <div className="flex items-center gap-4 flex-wrap text-center md:text-left justify-center md:justify-start">
            <span>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-[#0A0080]">FitMe</span>. All
              rights reserved.
            </span>
            <nav className="hidden md:flex gap-4">
              <Link href="/sitemap" className="hover:text-[#EBBAB9]">
                Sitemap
              </Link>
              <Link href="/press" className="hover:text-[#EBBAB9]">
                Press
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#0A0080]/40" />
              <span>Community</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#EBBAB9]/40" />
              <span>Design</span>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <Icon
                icon="mdi:twitter"
                className="text-lg hover:text-[#EBBAB9]"
              />
              <Icon
                icon="mdi:instagram"
                className="text-lg hover:text-[#EBBAB9]"
              />
              <Icon
                icon="mdi:linkedin"
                className="text-lg hover:text-[#EBBAB9]"
              />
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
      <style jsx>{`
        @media (max-width: 1023px) {
          .responsive-footer {
            margin-bottom: 8rem; /* mb-12 */
          }
        }
      `}</style>
