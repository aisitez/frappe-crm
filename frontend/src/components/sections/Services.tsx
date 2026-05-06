import { motion } from 'framer-motion'
import {
  Calendar, Cpu, Cloud, Database, ArrowLeftRight, MessageSquare,
} from 'lucide-react'

const services = [
  {
    icon: <Calendar className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Enterprise Job Scheduling',
    desc: 'Automate and manage enterprise-level tasks with intelligent scheduling solutions that improve workflow efficiency, reduce manual effort, and ensure seamless business operations.',
  },
  {
    icon: <Cpu className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Dynamic Workload Automation',
    desc: 'Optimize system performance using AI-powered workload automation that intelligently balances tasks, improves productivity, and enhances operational efficiency.',
  },
  {
    icon: <Cloud className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'AI Cloud Automation',
    desc: 'Simplify cloud management with advanced AI automation solutions designed to monitor, optimize, and secure cloud infrastructure in real time.',
  },
  {
    icon: <Database className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Big Data and Hadoop Automation',
    desc: 'Leverage big data technologies and Hadoop automation tools to process large-scale data efficiently and generate valuable business insights faster.',
  },
  {
    icon: <ArrowLeftRight className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'Hybrid Cloud File Transfers',
    desc: 'Securely transfer and synchronize files across hybrid cloud environments with high-speed, reliable, and automated data management solutions.',
  },
  {
    icon: <MessageSquare className="w-7 h-7 icon-color" style={{ color: '#4361EE' }} />,
    title: 'AI Chatbots Creation',
    desc: 'Build intelligent AI chatbots that provide instant customer support, automate conversations, and deliver personalized user experiences 24/7.',
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
            Provide 24/7 customer support using intelligent AI chatbots that deliver
            instant responses and improve customer satisfaction.
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
              <div className="mt-5 flex items-center gap-1 text-primary text-sm font-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ fontWeight: 600 }}>
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
