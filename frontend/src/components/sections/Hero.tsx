import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

/* ---------- Floating abstract "robot / dashboard" illustration ---------- */
function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-95 flex items-center justify-center">

      {/* Outer rotating ring */}
      <div
        className="absolute w-85 h-85 rounded-full border-2 border-dashed border-white/20 animate-rotate-slow"
        style={{ animationDuration: '28s' }}
      />

      {/* Central robot card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-5 w-52"
      >
        {/* Robot face */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-[#7B2FBE] flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 32 32" className="w-7 h-7 text-white" fill="currentColor">
              <rect x="6" y="8" width="20" height="16" rx="5" />
              <circle cx="12" cy="14" r="2" fill="#7B2FBE" />
              <circle cx="20" cy="14" r="2" fill="#7B2FBE" />
              <rect x="10" y="19" width="12" height="2" rx="1" fill="#7B2FBE" />
              <rect x="14" y="4" width="4" height="4" rx="2" />
              <rect x="2" y="13" width="4" height="6" rx="2" />
              <rect x="26" y="13" width="4" height="6" rx="2" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-700 text-[#1a1a4e]" style={{ fontWeight: 700 }}>AI Robot</p>
            <p className="text-[10px] text-green-500 font-600">● Online</p>
          </div>
        </div>
        {/* Mini stats bars */}
        <div className="space-y-1.5">
          {[80, 60, 90].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: i === 0 ? '#4361EE' : i === 1 ? '#3DDBDB' : '#7B2FBE',
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-400">{w}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating: Analytics card top-right */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-4 right-0 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 z-20"
      >
        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-700 text-[#1a1a4e]" style={{ fontWeight: 700 }}>+24.5%</p>
          <p className="text-[10px] text-gray-400">Growth Rate</p>
        </div>
      </motion.div>

      {/* Floating: Tasks card bottom-left */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute bottom-8 left-0 bg-white rounded-xl shadow-xl px-4 py-3 z-20"
      >
        <p className="text-[10px] text-gray-400 mb-1">Automation Tasks</p>
        <div className="flex items-center gap-2">
          {['#4361EE', '#3DDBDB', '#7B2FBE', '#F97316'].map((c, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border-2 border-white shadow"
              style={{ background: c, marginLeft: i > 0 ? '-6px' : '0' }}
            />
          ))}
          <span className="text-[11px] font-700 ml-1" style={{ fontWeight: 700 }}>+18</span>
        </div>
      </motion.div>

      {/* Floating: Cloud icon top-left */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute top-12 left-4 w-12 h-12 rounded-xl bg-linear-to-br from-primary to-[#7B2FBE] flex items-center justify-center shadow-lg z-20"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      </motion.div>

      {/* Floating: Gear icon bottom-right */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-12 right-4 w-10 h-10 rounded-xl bg-linear-to-br from-teal to-[#2EC5C5] flex items-center justify-center shadow-lg z-20"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </motion.div>

      {/* Large blurred bg blob */}
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-20 animate-blob"
        style={{
          background: 'radial-gradient(ellipse at center, #7B2FBE 0%, transparent 70%)',
          width: '300px',
          height: '300px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </div>
  )
}

/* ---------- Main Hero component ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-18 overflow-hidden min-h-screen flex items-center hero-gradient"
    >
      {/* Background shapes */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #3DDBDB 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* Decorative curved bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-16 sm:h-20"
          fill="white"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-white/90 text-sm font-medium">AI-Powered Solutions</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6"
            >
              Artificial Intelligence{' '}
              <span className="relative">
                Startup Agency
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-teal rounded-full opacity-70" />
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              We help startups and enterprises automate workflows, improve customer
              engagement, and accelerate growth using cutting-edge Artificial Intelligence
              technologies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <a href="#services" className="btn-teal flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-white-outline flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Contact Us
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-12 flex flex-wrap gap-8"
            >
              {[
                { value: '500+', label: 'Clients Served' },
                { value: '98%', label: 'Success Rate' },
                { value: '50+', label: 'AI Models' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/65 text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="hidden lg:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
