import { motion } from 'framer-motion'
import {
  Calendar, Cpu, Cloud, Database, ArrowLeftRight, MessageSquare,
} from 'lucide-react'

const services = [
  {
    icon: <Calendar className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Enterprise Job Scheduling',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus quam neque voluptatem doloribus quam, maximus ab accusam.',
  },
  {
    icon: <Cpu className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Dynamic Workload Automation',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus quam neque voluptatem doloribus quam, maximus ab accusam.',
  },
  {
    icon: <Cloud className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'AI Cloud Automation',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus quam neque voluptatem doloribus quam, maximus ab accusam.',
  },
  {
    icon: <Database className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Big Data and Hadoop Automation',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus quam neque voluptatem doloribus quam, maximus ab accusam.',
  },
  {
    icon: <ArrowLeftRight className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Hybrid Cloud File Transfers',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus quam neque voluptatem doloribus quam, maximus ab accusam.',
  },
  {
    icon: <MessageSquare className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'AI Chatbots Creation',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus quam neque voluptatem doloribus quam, maximus ab accusam.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle dot pattern bg */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a4e] mt-3 mb-4 leading-tight">
            We Offer A Wide Range Of Services And Provide
            <br className="hidden sm:block" /> Complete Client Satisfaction
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ut accusam
            nisi ut labore congue irure henderit commodo.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="service-card group"
            >
              <div className="hex-icon">{s.icon}</div>
              <h3 className="text-[17px] font-700 text-[#1a1a4e] mb-3" style={{ fontWeight: 700 }}>
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>

              {/* Hover arrow */}
              <div className="mt-5 flex items-center gap-1 text-[#4361EE] text-sm font-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ fontWeight: 600 }}>
                Learn More
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
