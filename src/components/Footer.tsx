"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/newlogo.png";

const BRAND = "#0A0080";
const ACCENT = "#EBBAB9";

const SECTIONS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Explore", href: "/explore" },
    { label: "Shop", href: "/shop" },
    { label: "Careers", href: "/careers" },
  ],
  Resources: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" },
  ],
  Community: [
    { label: "Events", href: "/events" },
    { label: "Forum", href: "/forum" },
    { label: "Partners", href: "/partners" },
  ],
  Contact: [
    { label: "info@fitme.com", href: "mailto:info@fitme.com", icon: "mdi:email" },
    { label: "+1 (234) 567-89", href: "tel:+123456789", icon: "mdi:phone" },
    { label: "Lagos, Nigeria", href: "/contact", icon: "mdi:map-marker" },
  ],
};

const SOCIAL = [
  { icon: "mdi:twitter", href: "https://twitter.com" },
  { icon: "mdi:instagram", href: "https://instagram.com" },
  { icon: "mdi:linkedin", href: "https://linkedin.com" },
];

export default function CompactFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.includes("@")) {
        setStatus("error");
        return;
      }
      setStatus("loading");
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    },
    [email]
  );

  return (
    <footer className="relative bg-gradient-to-b from-[#fdfcff] to-[#f8faff] border-t border-white/30 pt-10 pb-6 overflow-hidden mb-16 md:mb-0">
      {/* Decorative orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-20 left-0 w-56 h-56 bg-[rgba(10,0,128,0.1)] rounded-full blur-3xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 right-0 w-52 h-52 bg-[rgba(235,186,185,0.12)] rounded-full blur-3xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Logo + Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-[rgba(10,0,128,0.1)]">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <motion.div
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-[rgba(10,0,128,0.15)] to-[rgba(235,186,185,0.22)] flex items-center justify-center shadow-md border border-white/30"
              whileHover={{ scale: 1.05 }}
            >
              <Image src={logo} alt="FitMe logo" width={60} height={60} priority />
            </motion.div>
            <p className="text-xs text-[rgba(10,0,128,0.7)] max-w-xs leading-snug">
              Smart sizing & personalized style for every body.
            </p>
          </div>

         {/* Newsletter */}
<motion.form
  onSubmit={handleSubscribe}
  className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 bg-white/60 backdrop-blur-xl px-4 py-3 sm:py-2.5 rounded-2xl shadow-sm border border-white/40 hover:shadow-md transition-all"
  whileHover={{ scale: 1.01 }}
>
  {/* Input + Button container */}
  <div className="flex w-full flex-col sm:flex-row items-center gap-2">
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full sm:w-64 bg-transparent outline-none text-sm px-3 py-2 rounded-full border border-[rgba(10,0,128,0.2)] placeholder:text-[rgba(10,0,128,0.5)] focus:ring-1 focus:ring-[rgba(10,0,128,0.4)] transition-all"
      required
    />

    <button
      type="submit"
      disabled={status === 'loading'}
      className="w-full sm:w-auto bg-[rgba(10,0,128,1)] text-white text-sm px-5 py-2 rounded-full hover:bg-[rgba(10,0,128,0.9)] hover:shadow-md transition-all disabled:opacity-70"
    >
      {status === 'loading' ? '...' : 'Subscribe'}
    </button>
  </div>

  {/* Feedback messages */}
  <div className="flex justify-center sm:justify-start w-full mt-1">
    {status === 'success' && (
      <motion.span
        className="text-[rgba(10,0,128,0.9)] text-xs flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ✅ Subscribed!
      </motion.span>
    )}
    {status === 'error' && (
      <motion.span
        className="text-red-500 text-xs flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ⚠️ Invalid email
      </motion.span>
    )}
  </div>
</motion.form>

        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 text-center sm:text-left">
          {Object.entries(SECTIONS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-2 tracking-wide" style={{ color: BRAND }}>
                {title}
              </h4>
              <ul className="space-y-1 text-xs text-[rgba(10,0,128,0.8)]">
                {items.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      className="relative group inline-flex items-center justify-center sm:justify-start gap-1 transition-all"
                    >
                      {"icon" in link && link.icon && (
                        <Icon icon={link.icon} className="text-sm opacity-75" />
                      )}
                      <span className="group-hover:text-[rgba(10,0,128,1)] transition-colors">
                        {link.label}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[rgba(235,186,185,1)] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(10,0,128,0.1)] pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[rgba(10,0,128,0.7)]">
          <p>© {new Date().getFullYear()} FitMe — All rights reserved.</p>
          <div className="flex gap-4">
            {SOCIAL.map((s) => (
              <motion.a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10, color: ACCENT }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-base"
              >
                <Icon icon={s.icon} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
