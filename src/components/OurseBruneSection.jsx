import { useState } from 'react'
import { OURSE_BRUNE_STORY } from '../data/siteData'

export default function OurseBruneSection() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const collapse = () => {
    setIsOpen(false)
    const el = document.getElementById('ourse-brune')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="ourse-brune" className="w-full bg-white flex flex-col items-center scroll-mt-20">
      <div className="w-full flex flex-col">
        {/* BANDEAU OURSE BRUNE ? (Bordeaux) — PLEINE LARGEUR */}
        <button
          type="button"
          onClick={toggle}
          className="group relative w-full py-10 sm:py-14 bg-[#800e18] hover:bg-[#6e0c14] transition-colors duration-200 cursor-pointer flex items-center justify-center text-center px-6 block leading-none"
          aria-expanded={isOpen}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest text-white uppercase font-sans">
            OURSE BRUNE ?
          </h2>

          <div className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-xs transition-transform duration-300 group-hover:bg-white/30">
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* CONTENU DÉPLIABLE DE L'HISTOIRE DE L'ATELIER */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full bg-white pt-12 sm:pt-16 pb-0 flex flex-col items-center text-black">
            {/* Texte de l'histoire Ourse Brune */}
            <div className="w-full max-w-3xl px-4 sm:px-8 space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-center font-sans">
              <p>{OURSE_BRUNE_STORY.p1}</p>
              <p>{OURSE_BRUNE_STORY.p2}</p>
              <p>{OURSE_BRUNE_STORY.p3}</p>
              <p>{OURSE_BRUNE_STORY.p4}</p>
              <p>{OURSE_BRUNE_STORY.p5}</p>
              <p>{OURSE_BRUNE_STORY.p6}</p>
              <p>{OURSE_BRUNE_STORY.p7}</p>
              <p>{OURSE_BRUNE_STORY.p8}</p>
            </div>

            {/* PHOTO HISTORIQUE : Jean Cocteau & Marie-Madeleine Jolly en dessous */}
            <div className="my-10 sm:my-12 flex flex-col items-center px-4 w-full">
              <div className="overflow-hidden rounded-2xl shadow-xl border border-stone-200 max-w-lg w-full bg-stone-100">
                <img
                  src="/images/COCTEAU-MALEINE.JPG"
                  alt="Jean Cocteau et Marie-Madeleine Jolly à l'atelier"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="p-3.5 bg-stone-900 text-stone-200 text-center text-xs sm:text-sm italic">
                  Jean Cocteau &amp; Marie-Madeleine Jolly à l'atelier — fin des années 1950.
                </div>
              </div>
            </div>

            {/* FLÈCHE NOIRE PLEINE LARGEUR COLLÉE AU BANDEAU SUIVANT SANS AUCUN VIDE */}
            <button
              type="button"
              onClick={collapse}
              className="w-full block border-0 p-0 m-0 bg-transparent cursor-pointer transition-opacity duration-200 hover:opacity-85 focus:outline-hidden leading-none select-none"
              title="Replier la section"
              aria-label="Replier la section"
            >
              <img
                src="/images/FLECHE-NOIRE.png"
                alt="Replier"
                className="w-full h-auto block select-none pointer-events-none"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
