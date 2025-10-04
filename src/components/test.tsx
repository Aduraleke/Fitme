
      {/* Logo + Rings */}
      <div className="relative z-10 flex justify-center items-center px-6 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          whileHover={!reducedMotion ? "hover" : undefined}
          variants={anchorVariants}
          className="relative w-[min(68vw,680px)] h-[min(68vw,680px)] flex items-center justify-center rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-[6px] border border-white/30 shadow-2xl" />
          <div className="absolute -left-10 -top-8 w-[62%] h-[62%] rounded-[40%] bg-gradient-to-tr from-[#EBBAB9]/80 to-transparent blur-[28px] mix-blend-screen -rotate-6" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[54%] h-[54%] rounded-[48%] bg-gradient-to-br from-[#0A0080]/70 to-transparent blur-[42px] mix-blend-overlay rotate-12" />

          {/* Spinning Rings */}
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
      </div>

      {/* Mobile Nodes */}
      <motion.div
        className="flex flex-col gap-2 md:hidden mt-6 px-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {NODES.map((n, i) => (
          <motion.button
            key={n.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              goToIndex(i);
              if (n.type === "cta") router.push("/profile-setup");
            }}
            className={`flex justify-between items-center bg-white/90 border border-gray-200 rounded-xl px-4 py-3 shadow-md focus-visible:ring-2 focus-visible:ring-[#0A0080] transition ${
              index === i ? "border-[#0A0080] shadow-lg scale-[1.02]" : ""
            }`}
          >
            <span className="text-sm font-semibold text-[#0A0080]">{n.title}</span>
            <span className="text-xs text-gray-500">{n.hint}</span>
          </motion.button>
        ))}
      </motion.div>