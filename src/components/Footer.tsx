"use client";

import React, { JSX, memo, useCallback, useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import logo from "../../public/newlogo.png";

/* --------------------- Types & Data --------------------- */

type NavItem = { label: string; href: string; icon?: string };

const COMPANY: NavItem[] = [
  { label: "About Us", href: "/about" },
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
  { label: "Email: info@fitme.com", href: "mailto:info@fitme.com", icon: "mdi:email" },
  { label: "Phone: +1 (234) 567-89", href: "tel:+123456789", icon: "mdi:phone" },
  { label: "Lagos, Nigeria", href: "/contact", icon: "mdi:map-marker" },
];

const SOCIAL = [
  { icon: "mdi:twitter", href: "https://twitter.com" },
  { icon: "mdi:instagram", href: "https://instagram.com" },
  { icon: "mdi:linkedin", href: "https://linkedin.com" },
];

/* Brand tokens so they're easy to swap or theme later */
const BRAND = "#0A0080";
const ACCENT = "#EBBAB9";

/* small utility checks */
const isExternalHttp = (href?: string) => !!href && /^(https?:)\/\//.test(href);
const isInternal = (href?: string) => !!href && href.startsWith("/");

/* --------------------- FooterCard (memoized, accessible) --------------------- */

function FooterCardInner({
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
  const id = useId();

  return (
    <motion.aside
      aria-labelledby={`${id}-${title.replace(/\s+/g, "-").toLowerCase()}`}
      initial={reduce ? undefined : { y: 0, scale: 1 }}
      whileHover={reduce ? undefined : { y: lift, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/20 shadow-md p-6 transition-shadow duration-300 ${className}`}
      tabIndex={0}
      role="region"
    >
      <h4 id={`${id}-${title.replace(/\s+/g, "-").toLowerCase()}`} className="text-lg font-semibold mb-3" style={{ color: BRAND }}>
        {title}
      </h4>

      <ul className="space-y-2 text-sm" aria-hidden={false}>
        {items.map((it, idx) => {
          const key = `${it.href || it.label}-${idx}`;
          const content = (
            <>
              {it.icon ? <Icon icon={it.icon} className="text-base shrink-0" aria-hidden /> : null}
              <span className="truncate">{it.label}</span>
            </>
          );

          if (isInternal(it.href)) {
            return (
              <li key={key}>
                <Link href={it.href!} className="flex items-center gap-2 hover:text-[var(--accent)] focus:outline-none focus-visible:underline" aria-label={it.label}>
                  {content}
                </Link>
              </li>
            );
          }

          // external or protocol links (mailto, tel)
          return (
            <li key={key}>
              <a
                href={it.href}
                className="flex items-center gap-2 hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(10,0,128,0.12)] rounded-md px-1"
                {...(isExternalHttp(it.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {content}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
}

const FooterCard = memo(FooterCardInner);
FooterCard.displayName = "FooterCard";

/* --------------------- Main Footer --------------------- */

export default function ModernCoutureFooter({ onSubscribe } : { onSubscribe?: (email: string) => Promise<void> }): JSX.Element {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* email validation - basic but effective (can be swapped to a lib) */
  const validateEmail = useCallback((value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }, []);

  const fakeApiSubscribe = useCallback(() => {
    return new Promise<void>((resolve) => setTimeout(resolve, 800));
  }, []);

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting) return;
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setError(null);
      setSubmitting(true);

      try {
        if (onSubscribe) {
          await onSubscribe(email);
        } else {
          await fakeApiSubscribe();
        }

        setSubscribed(true);
        setEmail("");
        // analytics hook: window.dataLayer?.push({ event: 'newsletter_subscribed', email });
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [email, submitting, onSubscribe, validateEmail, fakeApiSubscribe]
  );

  const orbVariants = useMemo(() => ({ idle: { rotate: 0 }, spin: { rotate: 360 } }), []);

  return (
    <motion.footer
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Site Footer"
      className="relative bg-gradient-to-b from-white to-[#f8faff] overflow-hidden pt-12 pb-8 px-6 sm:px-8"
      style={{ ['--accent' as string]: ACCENT }}
    >
      {/* Decorative shapes (respect prefers-reduced-motion) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          aria-hidden
          variants={orbVariants}
          animate={reduce ? undefined : "spin"}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-28 w-96 h-96 rounded-full bg-gradient-to-tr from-[rgba(10,0,128,0.08)] to-[rgba(235,186,185,0.12)] blur-3xl"
        />
        <div className="absolute -bottom-24 -right-6 w-80 h-80 bg-[rgba(10,0,128,0.06)] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Left: Brand card */}
            <div className="flex justify-center md:justify-end mt-2 md:mt-6">
              <FooterCard title="Brand" items={COMPANY} rotation={-1.5} lift={-6} className="w-full max-w-sm sm:w-64 lg:w-72" />
            </div>

            {/* Center: Orb + CTA + Newsletter */}
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={reduce ? undefined : { scale: 0.98, opacity: 0 }}
                whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="relative z-20"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-[rgba(10,0,128,0.18)] to-[rgba(235,186,185,0.22)] flex items-center justify-center shadow-2xl border border-white/40">
                  <Image src={logo} alt="FitMe logo" width={68} height={68} priority />
                </div>

                <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-36 sm:w-44 md:w-56 h-6 opacity-60" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10 C50 0,150 20,200 10" stroke={BRAND} strokeWidth="0.6" strokeDasharray="3 4" />
                </svg>
              </motion.div>

              <div className="mt-3 w-full sm:w-[320px] md:w-[360px] -translate-y-1">
                <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-white/30 shadow-lg p-5">
                  <h3 className="text-base font-semibold mb-1" style={{ color: BRAND }}>Find Your Fit</h3>
                  <p className="text-sm text-[rgba(10,0,128,0.7)] mb-3">Smart size suggestions from your measurements & community feedback.</p>
                  <div className="flex justify-center gap-3 mb-3">
                    <Link href="/fit" className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-[rgba(10,0,128,1)] to-[#4A47A3] text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,0,128,0.2)]">Try Size Finder</Link>
                    <Link href="/explore" className="inline-block px-4 py-2 rounded-full border border-[rgba(10,0,128,0.12)] text-sm text-[rgba(10,0,128,1)] hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,0,128,0.12)]">Explore</Link>
                  </div>

                  {/* Newsletter (accessible + extensible) */}
                  <form onSubmit={handleSubscribe} className="mt-2 flex flex-col items-center gap-3" aria-labelledby="newsletter-heading">
                    <h4 id="newsletter-heading" className="sr-only">Newsletter signup</h4>

                    <div className="flex w-full max-w-xs items-center gap-2">
                      <label htmlFor="footer-email" className="sr-only">Email address</label>
                      <input
                        id="footer-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 rounded-full px-3 py-2 text-sm border border-[rgba(10,0,128,0.12)] focus:ring-1 focus:ring-[rgba(10,0,128,0.2)]"
                        aria-label="Email address"
                        aria-invalid={!!error}
                        aria-describedby={error ? "footer-email-error" : undefined}
                        required
                      />

                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-3 py-2 rounded-full bg-[rgba(10,0,128,1)] text-white text-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,0,128,0.3)]"
                      >
                        {submitting ? "Sending..." : "Subscribe"}
                      </button>
                    </div>

                    <div className="min-h-[1.25rem]">
                      {error ? (
                        <p id="footer-email-error" className="text-xs text-[rgba(220,38,38,1)]" role="alert">{error}</p>
                      ) : subscribed ? (
                        <p className="text-xs text-[rgba(10,0,128,0.65)]" role="status" aria-live="polite">Thanks — you’re on the list!</p>
                      ) : null}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right: Resources */}
            <div className="flex justify-center md:justify-start mt-2 md:mt-6">
              <FooterCard title="Resources" items={RESOURCES} rotation={1.5} lift={-6} className="w-full max-w-sm sm:w-64 lg:w-72" />
            </div>
          </div>

          {/* Community + Contact row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center mt-2">
            <FooterCard title="Community" items={[{ label: "Events", href: "/events" }, { label: "Forum", href: "/forum" }, { label: "Partners", href: "/partners" }]} rotation={-1.5} lift={-6} className="w-full max-w-sm sm:w-64 lg:w-72 justify-self-center sm:justify-self-end" />
            <FooterCard title="Contact" items={CONTACT} rotation={1.5} lift={-6} className="w-full max-w-sm sm:w-64 lg:w-72 justify-self-center sm:justify-self-start" />
          </div>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-[rgba(10,0,128,0.1)] pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[rgba(10,0,128,0.7)]">
            <div className="flex items-center gap-4 flex-wrap text-center md:text-left justify-center md:justify-start">
              <span>
                © {new Date().getFullYear()} <span className="font-semibold" style={{ color: BRAND }}>FitMe</span>. All rights reserved.
              </span>
              <nav aria-label="Footer secondary" className="hidden md:flex gap-4">
                <Link href="/sitemap" className="hover:text-[var(--accent)]">Sitemap</Link>
                <Link href="/press" className="hover:text-[var(--accent)]">Press</Link>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[rgba(10,0,128,0.4)]" />
                <span>Community</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[rgba(235,186,185,0.4)]" />
                <span>Design</span>
              </div>

              <div className="flex items-center gap-3 ml-2">
                {SOCIAL.map((s) => (
                  <a key={s.icon} href={s.href} aria-label={s.icon} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[var(--accent)] transition-colors">
                    <Icon icon={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          :global(footer) {
            margin-bottom: 4.5rem;
          }
        }
      `}</style>
    </motion.footer>
  );
}
