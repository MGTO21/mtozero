import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
// No icon imports needed for current Hero design

export function Hero() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section ref={containerRef} className="relative flex flex-col items-center justify-center min-h-screen px-4 w-full overflow-hidden bg-background pt-20">
      
      {/* --- PREMIUM ATMOSPHERE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Orbs */}
        <motion.div 
          style={{ y: y1 }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-mtozero-cyan/10 blur-[120px] dark:bg-mtozero-cyan/20"
        />
        <motion.div 
          style={{ y: y2 }}
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-mtozero-purple/10 blur-[150px] dark:bg-mtozero-purple/20"
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10 px-6">
        
        {/* --- LEFT CONTENT: BESPOKE TYPOGRAPHY --- */}
        <div className="flex-1 text-center lg:text-start relative">
          {/* Moved & Scaled Pulse Wave Behind Text */}
          <div className="absolute -top-20 -left-20 w-[140%] h-[140%] pointer-events-none z-0 hidden lg:block opacity-40">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_80px_rgba(0,240,255,0.1)]">
              <motion.path
                d="M 50 200 Q 150 100 200 200 T 350 200"
                fill="none"
                stroke="url(#heroWaveGrad)"
                strokeWidth="0.8"
                animate={{ 
                  d: [
                    "M 50 200 Q 150 100 200 200 T 350 200",
                    "M 50 200 Q 150 300 200 200 T 350 200",
                    "M 50 200 Q 150 100 200 200 T 350 200"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <span className="inline-flex items-center gap-3 py-2.5 px-6 mb-10 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-mtozero-cyan text-[10px] md:text-[11px] rounded-full font-black uppercase tracking-[0.4em] shadow-xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mtozero-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mtozero-cyan"></span>
              </span>
              {t("badge") ?? "Architecting the Future"}
            </span>

            <h1 className={`text-5xl md:text-7xl lg:text-[6.2rem] font-black tracking-[-0.04em] ${isRtl ? 'leading-[1.5]' : 'leading-[0.98]'} mb-12`}>
              <span className="block text-foreground dark:text-white filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] mb-4">
                {t("title_main")}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-mtozero-cyan via-[#8b5cf6] to-mtozero-purple bg-[length:200%_auto] animate-gradient-x py-2 pb-6">
                {t("title_highlight")}
              </span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-foreground/50 dark:text-white/40 max-w-xl lg:mx-0 mx-auto leading-relaxed mb-14 tracking-tight px-4 sm:px-0">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 px-6 sm:px-0">
              {/* LIQUID SHIMMER PRIMARY BUTTON */}
              <Link href={`/${locale}/services`} className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-mtozero-cyan to-mtozero-purple rounded-full blur-xl opacity-20 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative overflow-hidden px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-foreground dark:bg-white text-background dark:text-black font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all duration-300 group-hover:scale-[1.05] active:scale-95 group-hover:shadow-[0_20px_40px_rgba(0,240,255,0.3)] border border-white/10">
                  <span className="relative z-10">{t("cta_primary") ?? "Explore Solutions"}</span>
                  <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/20 via-transparent to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              </Link>
              
              {/* GHOST GLOW SECONDARY BUTTON */}
              <Link href={`/${locale}/portfolio`} className="group relative w-full sm:w-auto">
                <div className="relative overflow-hidden px-10 sm:px-14 py-4 sm:py-5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.03] text-foreground dark:text-white font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all duration-300 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/40 hover:bg-black/[0.08] dark:hover:bg-white/[0.08] active:scale-95">
                  <span className="relative z-10">{t("cta_secondary") ?? "View Portfolio"}</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-mtozero-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT CONTENT: DIGITAL HEARTBEAT (Bespoke Visual) --- */}
        <div className="flex-1 relative w-full flex items-center justify-center lg:justify-end mt-16 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[70vw] sm:max-w-md lg:max-w-lg aspect-square"
          >
            {/* Custom SVG Pulse Waves */}
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_80px_rgba(0,240,255,0.15)] dark:drop-shadow-[0_0_80px_rgba(0,240,255,0.2)]">
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              
              {/* Concentric Rotating Rings (Non-template visual) */}
              {[...Array(4)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="200"
                  cy="200"
                  r={50 + i * 25}
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="0.5"
                  strokeDasharray={i % 2 === 0 ? "10 20" : "5 15"}
                  animate={{ 
                    rotate: i % 2 === 0 ? 360 : -360,
                    opacity: [0.05, 0.2, 0.05]
                  }}
                  transition={{ 
                    rotate: { duration: 25 + i * 10, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i }
                  }}
                />
              ))}

              {/* Central Core */}
              <motion.path
                d="M 170 200 Q 190 150 200 200 T 230 200"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeLinecap="round"
                animate={{ 
                  d: [
                    "M 170 200 Q 190 150 200 200 T 230 200",
                    "M 170 200 Q 190 250 200 200 T 230 200",
                    "M 170 200 Q 190 150 200 200 T 230 200"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>

            {/* Floating Vision Cards */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] left-[-5%] sm:left-[0%] p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/40 dark:bg-black/60 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-xl ring-1 ring-black/5 dark:ring-white/10 max-w-[120px] sm:max-w-[180px]"
            >
              <h5 className="text-[7px] sm:text-[9px] font-black text-mtozero-cyan uppercase tracking-widest mb-1 sm:mb-2">{t("vision_label")}</h5>
              <p className="text-xs sm:text-lg font-black text-foreground dark:text-white leading-tight">{t("vision_title")}</p>
              <div className="mt-3 sm:mt-4 flex gap-0.5 sm:gap-1">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [3, 8, 3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-0.5 sm:w-1 bg-mtozero-cyan/40 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[8%] right-[-5%] sm:right-[0%] p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/40 dark:bg-black/60 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-xl ring-1 ring-black/5 dark:ring-white/10 space-y-1.5 sm:space-y-2"
            >
              {[t("vision_stat_1"), t("vision_stat_2"), t("vision_stat_3")].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mtozero-purple shadow-[0_0_10px_#8b5cf6]" />
                  <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest text-foreground/60 dark:text-white/60">{stat}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* --- REFINED SCROLL INDICATOR --- */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase font-black tracking-[0.6em] text-white/20">{isRtl ? "اكتشف المزيد" : "The Future Awaits"}</span>
        <motion.div 
          animate={{ height: [20, 40, 20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1.5px] bg-gradient-to-b from-mtozero-cyan to-transparent rounded-full"
        />
      </motion.div>

    </section>
  );
}
