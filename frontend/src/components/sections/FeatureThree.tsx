import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

/* ---------- Left illustration ---------- */
function BuildIllustration() {
  return (
    <div className="relative w-full h-105 flex items-center justify-center">
      {/* Bg circle */}
      <div className="absolute w-75 h-75 rounded-full bg-purple-50 opacity-70 animate-blob" />

      {/* Main interface card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 bg-white rounded-2xl shadow-xl p-5 w-60"
      >
        {/* Window controls */}
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {/* Code-like lines */}
        <div className="space-y-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '85%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-2.5 bg-blue-200 rounded-full"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '65%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="h-2.5 bg-purple-200 rounded-full"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '75%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="h-2.5 bg-teal-200 rounded-full"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '55%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="h-2.5 bg-orange-200 rounded-full"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">Build Progress</span>
          <span className="text-[11px] font-bold text-primary">92%</span>
        </div>
        <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '92%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg,#4361EE,#7B2FBE)' }}
          />
        </div>
      </motion.div>

      {/* Floating robot badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-8 right-4 z-20 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-[#7B2FBE] flex items-center justify-center">
          <svg viewBox="0 0 20 20" className="w-4 h-4 text-white" fill="currentColor">
            <rect x="3" y="5" width="14" height="11" rx="3.5" />
            <circle cx="7" cy="9" r="1.3" fill="white" fillOpacity="0.5" />
            <circle cx="13" cy="9" r="1.3" fill="white" fillOpacity="0.5" />
            <rect x="6.5" y="12" width="7" height="1.5" rx="0.75" fill="white" fillOpacity="0.5" />
            <rect x="9" y="2" width="2" height="3" rx="1" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#1a1a4e]">AI Ready</p>
          <p className="text-[9px] text-green-500">● Running</p>
        </div>
      </motion.div>

      {/* Floating device card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-6 left-4 z-20 bg-white rounded-xl shadow-lg px-4 py-3"
      >
        <p className="text-[10px] text-gray-400 mb-1">Device Support</p>
        <div className="flex gap-2">
          {['💻', '📱', '🖥️'].map((e) => (
            <span key={e} className="text-base">{e}</span>
          ))}
        </div>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute top-20 left-2 w-5 h-5 rounded-full bg-primary opacity-20 animate-pulse" />
      <div className="absolute bottom-28 right-2 w-4 h-4 rounded-full bg-teal opacity-30 animate-pulse" style={{ animationDelay: '0.8s' }} />
    </div>
  )
}

const features = [
  'Fully Responsive',
  'Clean & Modern Design',
  'Multi-Device Testing',
  'Grid User Experience',
  'Creative Layout',
  '100% Fully Responsive',
]

export default function FeatureThree() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <BuildIllustration />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <span className="section-label" style={{ textAlign: 'left' }}>Our Features</span>
            <h2 className="text-3xl sm:text-[38px] font-bold text-[#1a1a4e] mb-5 leading-tight mt-3">
              Build beautiful interface &amp; custom test framework in minutes.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We develop modern AI-powered platforms that combine intelligent automation,
              responsive design, and seamless integration to create efficient and scalable
              business solutions.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="check-item"
                >
                  <div className="check-icon">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[13px]">{f}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-primary-outline">
              Read More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
