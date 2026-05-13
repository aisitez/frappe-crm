import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

/* ---------- Left illustration ---------- */
function AnalyticsIllustration() {
  return (
    <div className="relative w-full h-105 flex items-center justify-center">

      {/* Large circle bg */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-50 opacity-60" />

      {/* Central dashboard card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 bg-white rounded-2xl shadow-xl p-5 w-56"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#1a1a4e]">Analytics</span>
          <span className="text-xs text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full">+18%</span>
        </div>
        {/* Bar chart */}
        <div className="flex items-end gap-2 h-20 mb-3">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className="flex-1 rounded-t-sm"
              style={{
                background: i === 5
                  ? 'linear-gradient(180deg,#4361EE,#7B2FBE)'
                  : i % 2 === 0 ? '#e0e8ff' : '#ede9fe',
                minHeight: '4px',
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </motion.div>

      {/* Floating robot */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl p-4 z-20"
      >
        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-[#7B2FBE] flex items-center justify-center mb-2">
          <svg viewBox="0 0 32 32" className="w-7 h-7 text-white" fill="currentColor">
            <rect x="6" y="8" width="20" height="16" rx="5" />
            <circle cx="12" cy="14" r="2" fill="white" fillOpacity="0.5" />
            <circle cx="20" cy="14" r="2" fill="white" fillOpacity="0.5" />
            <rect x="10" y="19" width="12" height="2" rx="1" fill="white" fillOpacity="0.5" />
            <rect x="14" y="4" width="4" height="4" rx="2" />
          </svg>
        </div>
        <p className="text-[11px] text-center font-semibold text-[#1a1a4e]">AI Active</p>
        <div className="flex justify-center gap-0.5 mt-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 12, 4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              className="w-1 bg-teal rounded-full"
              style={{ height: 4 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating stat pill */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-10 right-4 bg-white rounded-xl shadow-lg px-4 py-2.5 z-20"
      >
        <p className="text-[10px] text-gray-400">Automation Rate</p>
        <p className="text-lg font-bold text-primary">94.7%</p>
      </motion.div>

      {/* Decorative circles */}
      <div className="absolute top-16 left-4 w-6 h-6 rounded-full bg-teal opacity-40 animate-pulse" />
      <div className="absolute bottom-20 right-6 w-4 h-4 rounded-full bg-orange opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-2 w-3 h-3 rounded-full bg-[#7B2FBE] opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}

export default function FeatureOne() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <AnalyticsIllustration />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <span className="section-label text-left" style={{ textAlign: 'left' }}>
              About Us
            </span>
            <h2 className="text-3xl sm:text-[38px] font-bold text-[#1a1a4e] mb-5 leading-tight mt-3">
              A Straight Forward Structure for Powerful Automation Results.
            </h2>
            <p className="text-gray-500 mb-5 leading-relaxed">
              We deliver intelligent AI-powered automation solutions that help businesses
              streamline operations, improve productivity, and accelerate digital transformation.
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Our advanced technologies are designed to simplify complex workflows and create
              smarter business experiences.
            </p>

            {/* Checkpoints */}
            <ul className="space-y-3 mb-8">
              {[
                'Advanced AI-driven workflow orchestration',
                'Seamless integration with existing systems',
                'Real-time monitoring and smart alerts',
              ].map((item) => (
                <li key={item} className="check-item">
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color: '#4361EE' }} />
                  {item}
                </li>
              ))}
            </ul>

            <a href="#services" className="btn-primary-outline">
              Read More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
