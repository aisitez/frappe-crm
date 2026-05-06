import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Brands from './components/sections/Brands'
import Services from './components/sections/Services'
import FeatureOne from './components/sections/FeatureOne'
import FeatureTwo from './components/sections/FeatureTwo'
import FeatureThree from './components/sections/FeatureThree'
import CTA from './components/sections/CTA'
import FloatingSidebar from './components/ui/FloatingSidebar'

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main>
        <Hero />
        <Brands />
        <Services />
        <FeatureOne />
        <FeatureTwo />
        <FeatureThree />
        <CTA />
      </main>

      <Footer />
      <FloatingSidebar />
    </div>
  )
}
