import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SeriesSection from './components/SeriesSection'
import SurMesureSection from './components/SurMesureSection'
import OurseBruneSection from './components/OurseBruneSection'
import ContactSection from './components/ContactSection'
import NewsletterSection from './components/NewsletterSection'
import DishModal from './components/DishModal'
import Footer from './components/Footer'
import { SERIES_LIST } from './data/siteData'

function App() {
  const [selectedDish, setSelectedDish] = useState(null)
  const [contactSubject, setContactSubject] = useState("Commande d'une pièce")
  const [contactPiece, setContactPiece] = useState('')

  const handleExploreClick = () => {
    const el = document.getElementById('series-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleOrderPiece = (pieceName) => {
    setSelectedDish(null)
    setContactSubject("Commande d'une pièce")
    setContactPiece(pieceName)
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleContactClick = (subject) => {
    setContactSubject(subject || "Projet sur-mesure")
    setContactPiece('')
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNavigate = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col items-center">
      {/* HEADER NAVBAR */}
      <Header onNavigate={handleNavigate} />

      {/* MAIN CONTAINER (Centered column mimicking the mockup proportion) */}
      <main className="w-full flex flex-col items-center">
        {/* HERO */}
        <Hero onExploreClick={handleExploreClick} />

        {/* 6 SERIES ACCORDION */}
        <SeriesSection
          seriesList={SERIES_LIST}
          onSelectDish={setSelectedDish}
          onOrderDish={handleOrderPiece}
        />

        {/* LE SUR-MESURE */}
        <SurMesureSection onContactClick={handleContactClick} />

        {/* OURSE BRUNE ? (Burgundy banner) */}
        <OurseBruneSection />

        {/* CONTACT / COMMANDE (Yellow banner) */}
        <ContactSection
          initialSubject={contactSubject}
          initialPiece={contactPiece}
        />

        {/* ACTUALITÉS / NEWSLETTER (Black banner) */}
        <NewsletterSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* LIGHTBOX MODAL FOR ARTWORKS */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onOrder={handleOrderPiece}
        />
      )}
    </div>
  )
}

export default App
