import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeatureGrid from '@/components/FeatureGrid'
import PortfolioSection from '@/components/PortfolioSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <PortfolioSection />
      <Footer />
    </main>
  )
}
