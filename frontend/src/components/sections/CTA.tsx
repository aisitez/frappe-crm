import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-gradient py-20 lg:py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
          transform: 'translate(-30%,-30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #3DDBDB 0%, transparent 70%)',
          transform: 'translate(30%,30%)',
        }}
      />

<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-lg font-medium mb-2">So What is Next?</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Are You Ready?{' '}
              <span className="text-teal">Let's Work!</span>
            </h2>
          </motion.div>

          {/* Right: Button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="#contact" className="btn-orange flex items-center gap-2 text-base px-8 py-4">
              Read More
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
