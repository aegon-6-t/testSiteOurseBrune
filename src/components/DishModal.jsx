import { useEffect, useState } from 'react'

export default function DishModal({ dish, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rassembler toutes les photos de détail :
  // En priorité la photo détail (fullImage), puis la galerie de photos supplémentaires (gallery).
  // Si aucune n'est renseignée, on affiche la photo principale (image).
  const detailImages = [
    dish?.fullImage,
    ...(dish?.gallery || []),
  ].filter(Boolean).filter((val, idx, arr) => arr.indexOf(val) === idx)

  const images = detailImages.length > 0 ? detailImages : (dish?.image ? [dish.image] : [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [dish])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, images.length])

  if (!dish || images.length === 0) return null

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* En-tête discret */}
      <div className="absolute top-5 sm:top-6 left-6 sm:left-10 z-20 flex flex-col pointer-events-none">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-white/90 uppercase font-sans">
          {dish.name}
        </span>
        <span className="text-[11px] text-white/50 tracking-wider">
          {images.length > 1 ? `Photos de détail (${currentIndex + 1}/${images.length})` : 'Photo de détail'}
        </span>
      </div>

      {/* Bouton Fermer */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
        aria-label="Fermer le carrousel"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Flèche Précédent */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Photo précédente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Flèche Suivant */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={nextImage}
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Photo suivante"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Conteneur principal de l'image plein écran */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 md:p-16"
        onClick={onClose}
      >
        <img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${dish.name} - détail ${currentIndex + 1}`}
          className="max-w-[92vw] max-h-[85vh] object-contain drop-shadow-2xl transition-all duration-300 select-none pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Indicateurs de pagination en bas si plusieurs images */}
      {images.length > 1 && (
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-xs border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Aller à la photo ${idx + 1}`}
              />
            ))}
            <span className="text-xs text-white/80 font-mono ml-2">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
