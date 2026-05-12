import { motion } from 'framer-motion'

const brands = [
  {
    name: 'Walmart',
    svg: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="#0071CE">
        <text x="0" y="30" fontSize="26" fontWeight="bold" fontFamily="sans-serif">Walmart</text>
        <text x="106" y="16" fontSize="22" fill="#FFC220">✦</text>
      </svg>
    ),
  },
  {
    name: 'Airbnb',
    svg: (
      <svg viewBox="0 0 100 40" className="h-7 w-auto" fill="#FF5A5F">
        <text x="22" y="30" fontSize="24" fontWeight="bold" fontFamily="sans-serif">airbnb</text>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    svg: (
      <svg viewBox="0 0 110 40" className="h-7 w-auto" fill="#1877F2">
        <text x="0" y="30" fontSize="24" fontWeight="bold" fontFamily="sans-serif">facebook</text>
      </svg>
    ),
  },
  {
    name: 'Atlassian',
    svg: (
      <svg viewBox="0 0 130 40" className="h-7 w-auto" fill="#0052CC">
        <text x="18" y="30" fontSize="22" fontWeight="bold" fontFamily="sans-serif">ATLASSIAN</text>
      </svg>
    ),
  },
  {
    name: 'Intuit',
    svg: (
      <svg viewBox="0 0 80 40" className="h-7 w-auto" fill="#236EAD">
        <text x="0" y="30" fontSize="26" fontWeight="bold" fontFamily="sans-serif">intuit</text>
      </svg>
    ),
  },
  {
    name: 'Zillow',
    svg: (
      <svg viewBox="0 0 80 40" className="h-7 w-auto" fill="#1277E1">
        <text x="0" y="30" fontSize="26" fontWeight="bold" fontFamily="sans-serif">zillow</text>
      </svg>
    ),
  },
]

export default function Brands() {
  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-gray-400 font-medium uppercase tracking-widest mb-10"
        >
          Trusted by Leading Companies
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.08 }}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 transition-all cursor-default"
              title={brand.name}
            >
              {brand.svg}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
