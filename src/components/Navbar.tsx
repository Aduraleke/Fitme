"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../public/newlogo.png";

const navItems = [
  { href: "/Explore", icon: "solar:compass-bold-duotone", label: "Explore" },
  { href: "/Shop", icon: "solar:bag-4-bold-duotone", label: "Shop" },
  { href: "/About", icon: "solar:info-circle-bold-duotone", label: "About Us" },
  { href: "/Profile", icon: "solar:user-bold-duotone", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center space-y-8 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-xl py-8 px-1 shadow-2xl rounded-3xl z-50 border border-white/30">
        {/* Logo Orb now links to Home */}
        <Link
          href="/"
          aria-label="Home"
          className="mb-6 relative flex flex-col items-center justify-center group"
        >
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
            {/* Frosted Base */}
            <div className="absolute inset-0 rounded-full bg-white/70 backdrop-blur-sm"></div>

            {/* Logo */}
            <Image
              src={logo}
              alt="Logo"
              className="w-28 h-28 object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />

            {/* Glows & Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0A0080]/50 to-[#EBBAB9]/50 blur-xl animate-pulse"></div>
            <div className="absolute inset-[-8px] rounded-full border-2 border-white/50 animate-spin-slow"></div>
          </div>
        </Link>

        {/* Nav Items */}
        {navItems.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`group relative flex justify-center items-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                active
                  ? "bg-gradient-to-tr from-[#0A0080] to-[#EBBAB9] text-white shadow-xl scale-110"
                  : "text-[#0A0080] hover:text-[#EBBAB9] hover:scale-105 hover:shadow-lg"
              }`}
            >
              <Icon
                icon={icon}
                className={`w-9 h-9 transition-transform ${
                  active ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              {/* Tooltip */}
              <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0A0080] text-white text-sm font-medium px-3 py-1 rounded-xl opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shadow-lg whitespace-nowrap">
                {label}
              </span>
              {/* Active Glow Bar */}
              {active && (
                <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-[#EBBAB9] shadow-md animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Bottom Navbar with Floating Orb */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[95%] lg:hidden flex justify-around items-center bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-2xl shadow-2xl py-3 px-6 rounded-3xl border border-white/40 z-50">
        {/* Left Nav Items */}
        {navItems.slice(0, 2).map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col justify-center items-center transition-all duration-300 ${
                active
                  ? "text-[#0A0080] scale-110 font-semibold drop-shadow-md"
                  : "text-[#EBBAB9] hover:text-[#0A0080] hover:scale-105"
              }`}
            >
              <Icon
                icon={icon}
                className={`w-6 h-6 mb-1 ${active ? "animate-bounce" : ""}`}
              />
              <span className="text-[0.7rem]">{label}</span>
              {active && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#0A0080] animate-ping" />
              )}
            </Link>
          );
        })}

        {/* Center Floating Logo Orb (already a link) */}
        <Link
          href="/"
          aria-label="Home"
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#0A0080] to-[#EBBAB9] shadow-xl shadow-[#0A0080]/40 flex items-center justify-center overflow-hidden -mt-10 transition-transform duration-500 hover:scale-110"
        >
          {/* Frosted Orb */}
          <div className="absolute inset-0 rounded-full bg-white/70 backdrop-blur-sm"></div>

          {/* Logo */}
          <Image
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-contain relative z-10 drop-shadow-xl"
          />

          {/* Halo Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0A0080]/40 to-[#EBBAB9]/40 blur-xl animate-pulse"></div>
        </Link>

        {/* Right Nav Items */}
        {navItems.slice(2).map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col justify-center items-center transition-all duration-300 ${
                active
                  ? "text-[#0A0080] scale-110 font-semibold drop-shadow-md"
                  : "text-[#EBBAB9] hover:text-[#0A0080] hover:scale-105"
              }`}
            >
              <Icon
                icon={icon}
                className={`w-6 h-6 mb-1 ${active ? "animate-bounce" : ""}`}
              />
              <span className="text-[0.7rem]">{label}</span>
              {active && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#0A0080] animate-ping" />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
