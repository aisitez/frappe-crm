import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  {
    label: 'Services',
    href: '#services',
    children: [
      { label: 'Enterprise Job Scheduling', href: '#services' },
      { label: 'Dynamic Workload Automation', href: '#services' },
      { label: 'AI Cloud Automation', href: '#services' },
      { label: 'Big Data & Hadoop', href: '#services' },
      { label: 'Hybrid Cloud Transfers', href: '#services' },
      { label: 'AI Chatbots Creation', href: '#services' },
    ],
  },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md shadow-blue-100/50'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <div className="flex items-center gap-2">
              {/* Robot head SVG logo */}
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-teal to-[#2EC5C5] flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm0 2v1h0V4zm-3 5a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm4 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm-2 4h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <span className="text-[22px] font-bold">
                <span className="text-teal">sentimentzai</span>
                <span className="text-[#1a1a4e]">CRM</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-[#4a4a6a] hover:text-primary text-[14px] font-500 transition-colors duration-200 rounded-md hover:bg-blue-50"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === link.label ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  )}
                </a>

                {link.children && (
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl border border-blue-100 shadow-xl shadow-blue-100/40 py-2 z-50"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4a4a6a] hover:text-primary hover:bg-blue-50 transition-colors duration-150"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
                            {child.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="http://crm.localhost:8002/login"
              className="btn-teal text-sm py-2.5 px-6 rounded-md shadow-md"
            >
              Log In
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#4a4a6a] hover:text-primary hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-blue-100 overflow-hidden shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-[#4a4a6a] hover:text-primary hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-blue-100">
                <a
                  href="http://crm.localhost:8002/login"
                  className="btn-teal w-full justify-center rounded-md"
                >
                  Log In
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
