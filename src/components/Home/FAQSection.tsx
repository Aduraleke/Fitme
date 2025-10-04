"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Icon } from "@iconify/react";

const FAQS = [
  {
    question: "How do I measure myself?",
    answer:
      "Simply follow our guided measurement flow no tailor required. Enter your measurements manually or use our intuitive visual guide to get accurate results in minutes.",
  },
  {
    question: "Do I need a tailor?",
    answer:
      "Nope! FitMe’s smart Fitting Room Assistant adapts every design to your profile automatically, so you can skip the tailor completely.",
  },
  {
    question: "How long is delivery?",
    answer:
      "Once your order is placed, we produce it on demand. And it's depending on your location and customizations.",
  },
  {
    question: "Can I tweak a design after browsing?",
    answer:
      "Absolutely. FitMe allows you to adjust sleeve length, waist, neckline, or any simple alteration before placing your order.",
  },
  {
    question: "Can I upload a design I like?",
    answer:
      "Yes! Upload an inspiration design and our trusted designers will recreate it tailored to your exact size profile.",
  },
  {
    question: "Is FitMe suitable for all body types?",
    answer:
      "Yes, our algorithm and measurement system account for every shape, making personalized fashion accessible to everyone.",
  },
  {
    question: "What if I make a mistake in my size profile?",
    answer:
      "You can always edit your size profile before confirming an order. FitMe ensures your updates reflect in real-time for accurate tailoring.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Absolutely. All measurements and personal information are encrypted and never shared with third parties.",
  },
  {
    question: "Can I return or exchange?",
    answer:
      "Because every piece is custom-made, returns are limited. But if there’s a sizing issue or defect, our customer support will work with you for a solution.",
  },
];

const accordionVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#fefefe] py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient blur shapes */}
      <div className="absolute -left-20 -top-16 w-[480px] h-[480px] bg-[#EBBAB9]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -right-32 -bottom-16 w-[520px] h-[520px] bg-[#0A0080]/12 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-md font-semibold text-[#0A0080]/60">Frequently Asked Questions</p>
          <h2 className="mt-2 text-xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0A0080] to-[#EBBAB9]">
            Got Questions? We’ve Got Answers
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              variants={accordionVariants}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(10,0,128,0.05)] overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-[#0A0080] font-semibold text-[12px] md:text-sm hover:text-[#EBBAB9] transition-colors"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon icon="mdi:plus" width="20" className="text-[#0A0080]" />
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="px-6 pb-4 text-xs md:text-[12px] text-[#0A0080]/85 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="/contact"
            className="inline-flex text-sm md:text-md items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-tr from-[#EBBAB9] to-[#0A0080] text-white font-semibold shadow-lg"
          >
            Still Have Questions?
            <Icon icon="mdi:arrow-right" width="18" />
          </a>
        </div>
      </div>
    </section>
  );
}
