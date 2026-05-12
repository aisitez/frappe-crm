import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

const privacyLinks = [
  'Privacy Policy',
  'Terms of Service',
  'Cookie Policy',
  'GDPR Compliance',
  'Disclaimer',
]

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
]

/* Inline SVG social icons (brand icons removed from lucide-react v0.400+) */
const socials = [
  {
    color: '#1877F2',
    href: '#',
    label: 'Facebook',
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    color: '#1DA1F2',
    href: '#',
    label: 'Twitter / X',
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
        <path d="M4 4l4.5 6L4 20h2l3.75-5.25L14 20h4l-4.75-6.5L22 4h-2l-3.5 4.75L10 4H4z" />
      </svg>
    ),
  },
  {
    color: '#E4405F',
    href: '#',
    label: 'Instagram',
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
      </svg>
    ),
  },
  {
    color: '#0077B5',
    href: '#',
    label: 'LinkedIn',
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    color: '#FF0000',
    href: '#',
    label: 'YouTube',
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
        <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <a href="#home" className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-teal to-[#2EC5C5] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-teal">sentimentzai</span>
                <span className="text-white">CRM</span>
              </span>
            </a>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              We deliver innovative AI-powered technologies that help businesses automate
              operations, improve customer engagement, and accelerate digital transformation
              with smart and scalable solutions.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 shadow-md"
                  style={{ background: s.color }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Privacy & TOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white mb-5 text-[15px]" style={{ fontWeight: 700 }}>
              Privacy &amp; TOS
            </h4>
            <ul className="space-y-2.5">
              {privacyLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/55 text-sm hover:text-teal transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-teal transition-colors shrink-0" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white mb-5 text-[15px]" style={{ fontWeight: 700 }}>
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/55 text-sm hover:text-teal transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-teal transition-colors shrink-0" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white mb-5 text-[15px]" style={{ fontWeight: 700 }}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="text-white/55 text-sm flex gap-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 mt-0.5 text-teal shrink-0" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9zM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" clipRule="evenodd" />
                </svg>
                <span>3456 Melrose Ave, Suite 200<br />New York, NY 10001 USA</span>
              </li>
              <li>
                <a href="https://wa.me/12345678900" target="_blank" rel="noopener noreferrer" className="text-white/55 text-sm hover:text-white transition-colors flex gap-2 items-center">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 text-teal shrink-0" fill="currentColor">
                    <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +1 (234) 567-8900
                </a>
              </li>
              <li>
                <a href="mailto:hello@sentimentzaicrm.ai" target="_blank" rel="noopener noreferrer" className="text-white/55 text-sm hover:text-white transition-colors flex gap-2 items-center">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 text-teal shrink-0" fill="currentColor">
                    <path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z" />
                    <path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z" />
                  </svg>
                  hello@sentimentzaicrm.ai
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} sentimentzaiCRM. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Designed with ❤️ for AI innovation
          </p>
        </div>
      </div>
    </footer>
  )
}
