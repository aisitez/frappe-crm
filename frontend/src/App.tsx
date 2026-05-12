import { useEffect } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { loginRequest } from './authConfig'
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

const CRM_URL = 'http://crm.localhost:8002'

export default function App() {
  const { instance, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  // useEffect(() => {
  //   if (isAuthenticated && inProgress === InteractionStatus.None) {
  //     loginToFrappe()
  //   }
  // }, [isAuthenticated, inProgress])

  const loginToFrappe = async () => {
    try {
      const account = instance.getActiveAccount()
      if (!account) return

      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      })

      // Navigate the browser directly to the Frappe login endpoint.
      // This is a first-party GET navigation so Frappe sets the session cookie
      // in the correct origin context — no cross-origin fetch / SameSite issues.
      window.location.href =
        `${CRM_URL}/api/method/crm.api.ms_auth.login_with_token_redirect` +
        `?id_token=${encodeURIComponent(tokenResponse.idToken)}`
    } catch (e) {
      console.error('Login to CRM failed:', e)
    }
  }

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
