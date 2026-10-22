import { useState, useEffect } from 'react'
import Header from './components/Header'
import SeriesSection from './components/SeriesSection'
import SurMesureSection from './components/SurMesureSection'
import OurseBruneSection from './components/OurseBruneSection'
import ContactSection from './components/ContactSection'
import NewsletterSection from './components/NewsletterSection'
import DishModal from './components/DishModal'
import Footer from './components/Footer'
import { SERIES_LIST } from './data/siteData'
import { sanityClient, urlFor } from './lib/sanity'

function formatSanityDish(p) {
  let statusColor = 'orange'
  let statusText = 'SUR COMMANDE'
  if (p.status === 'disponible') {
    statusColor = 'green'
    statusText = 'DISPONIBLE'
  } else if (p.status === 'epuise') {
    statusColor = 'red'
    statusText = 'ÉPUISÉ'
  }

  const mainImageUrl = p.mainImage ? urlFor(p.mainImage).width(700).url() : ''
  const fullImageUrl = p.fullImage ? urlFor(p.fullImage).width(1600).url() : ''
  const galleryUrls = p.gallery && Array.isArray(p.gallery)
    ? p.gallery.map((img) => urlFor(img).width(1600).url())
    : []

  return {
    id: p._id,
    name: p.title,
    type: p.dimensions || '',
    material: p.material || '',
    edition: p.exemplaires || '',
    status: statusText,
    statusColor,
    image: mainImageUrl,
    fullImage: fullImageUrl,
    gallery: galleryUrls,
    serie: p.serieSlug || p.serie,
    order: p.order ?? 99,
  }
}

function App() {
  const [seriesList, setSeriesList] = useState(SERIES_LIST)
  const [selectedDish, setSelectedDish] = useState(null)
  const [contactSubject, setContactSubject] = useState("Commande d'une pièce")
  const [contactPiece, setContactPiece] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [sanitySeries, sanityPieces] = await Promise.all([
          sanityClient.fetch(`*[_type == "serie"] | order(order asc, _createdAt asc)`),
          sanityClient.fetch(
            `*[_type == "piece"] | order(order asc, _createdAt desc) {
              ...,
              "serieSlug": coalesce(serie->slug.current, serie),
              "serieRef": serie._ref
            }`
          ),
        ])

        if (sanitySeries && sanitySeries.length > 0) {
          const dynamicSeries = sanitySeries.map((s) => {
            const bannerUrl = s.bannerImage ? urlFor(s.bannerImage).width(1600).url() : ''
            const serieSlug = s.slug?.current || s._id.replace('serie-', '')

            const matchedPieces = sanityPieces
              ? sanityPieces
                  .filter((p) => (p.serieSlug || p.serie) === serieSlug || p.serieRef === s._id)
                  .map(formatSanityDish)
              : []

            return {
              id: serieSlug,
              title: s.title,
              bannerImg: bannerUrl,
              order: s.order ?? 99,
              description: s.description || '',
              items: matchedPieces,
              isReady: matchedPieces.length > 0,
            }
          })
          setSeriesList(dynamicSeries)
        } else if (sanityPieces && sanityPieces.length > 0) {
          setSeriesList((prevSeries) => {
            return prevSeries.map((serie) => {
              const matchedPieces = sanityPieces
                .filter((p) => (p.serieSlug || p.serie) === serie.id || p.serieRef === `serie-${serie.id}`)
                .map(formatSanityDish)

              if (matchedPieces.length > 0) {
                return {
                  ...serie,
                  items: matchedPieces,
                  isReady: true,
                }
              }
              return serie
            })
          })
        }
      } catch (err) {
        console.warn('Erreur lors du chargement des données Sanity, données locales conservées :', err)
      }
    }

    loadData()
  }, [])

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
      {/* HEADER HERO (Ours pleine largeur avec logo et menu hamburger 2 barres) */}
      <Header onNavigate={handleNavigate} />

      {/* MAIN CONTAINER */}
      <main className="w-full flex flex-col items-center">
        {/* 6 SERIES ACCORDION */}
        <SeriesSection
          seriesList={seriesList}
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
