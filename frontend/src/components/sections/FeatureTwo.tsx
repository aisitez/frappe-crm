import { motion } from 'framer-motion'

/* ---------- Right: Orbit integration icons ---------- */
function IntegrationOrbit() {
  const orbitIcons = [
    { bg: '#FF6B6B', label: 'Shopify', symbol: 'S' },
    { bg: '#4A154B', label: 'Slack', symbol: '⚡' },
    { bg: '#25D366', label: 'WhatsApp', symbol: 'W' },
    { bg: '#0078D4', label: 'Teams', symbol: 'T' },
    { bg: '#FF9900', label: 'AWS', symbol: '☁' },
    { bg: '#4285F4', label: 'Google', symbol: 'G' },
  ]

  return (
    <div className="relative w-full h-95 flex items-center justify-center">
      {/* Outer orbit ring */}
      <div className="absolute w-70 h-70 rounded-full border border-white/20 animate-rotate-slow" />
      {/* Middle orbit ring */}
      <div className="absolute w-47.5 h-47.5 rounded-full border border-white/15"
        style={{ animation: 'rotate-slow 18s linear infinite reverse' }} />

      {/* Central chat bubble */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="13" y2="14" />
        </svg>
      </motion.div>

      {/* Orbiting icons */}
      {orbitIcons.map((icon, i) => {
        const angle = (i / orbitIcons.length) * 360
        const rad = (angle * Math.PI) / 180
        const r = 130
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        return (
          <motion.div
            key={icon.label}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px - 22px)`,
              top: `calc(50% + ${y}px - 22px)`,
            }}
            className="z-10"
          >
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.2 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer"
              style={{ background: icon.bg }}
              title={icon.label}
            >
              {icon.symbol}
            </motion.div>
          </motion.div>
        )
      })}

      {/* Pulsing rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
          className="absolute w-20 h-20 rounded-full border border-white/40"
        />
      ))}
    </div>
  )
}

export default function FeatureTwo() {
  return (
    <section className="py-20 lg:py-28 section-gradient relative overflow-hidden">
      {/* Bg blobs */}
      <div
        className="absolute top-0 right-0 w-125 h-125 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
          transform: 'translate(30%,-30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #3DDBDB 0%, transparent 70%)',
          transform: 'translate(-30%,30%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-white mb-6 leading-tight">
              Message your customers, they'll love you for it. Monitor and chat with the visitors
              on your website using AI Chatbot
            </h2>
            <p className="text-white/70 mb-4 leading-relaxed">
              Our AI-powered chatbot systems help businesses improve customer satisfaction,
              increase response efficiency, and deliver 24/7 support with seamless automation
              and real-time interactions.
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              Engage your website visitors instantly, resolve queries automatically, and
              build stronger customer relationships with intelligent conversational AI.
            </p>
            <a href="#contact" className="btn-orange">
              Read More
            </a>
          </motion.div>

          {/* Right: Orbit */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center"
          >
            <IntegrationOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
