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
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        {/* BANNER HEADER (Burgundy / Dark Red as in mockup) */}
        <button
          type="button"
          onClick={toggle}
          className="group relative w-full py-8 sm:py-10 bg-[#800e18] hover:bg-[#6e0c14] transition-colors duration-200 cursor-pointer flex items-center justify-center text-center px-6"
          aria-expanded={isOpen}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-white uppercase font-sans">
            OURSE BRUNE ?
          </h2>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-xs transition-transform duration-300 group-hover:bg-white/30">
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* EXPANDED CONTENT */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white px-6 sm:px-12 py-10 flex flex-col items-center text-stone-800">
            <div className="w-full max-w-xl space-y-5 text-sm sm:text-base leading-relaxed text-justify">
              <p>{OURSE_BRUNE_STORY.p1}</p>
              <p>{OURSE_BRUNE_STORY.p2}</p>

              {/* HISTORICAL PHOTO: Jean Cocteau & Marie-Madeleine Jolly */}
              <div className="my-8 flex flex-col items-center">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-stone-200 max-w-md w-full bg-stone-100">
                  <img
                    src="/images/COCTEAU-MALEINE.JPG"
                    alt="Jean Cocteau et Marie-Madeleine Jolly à l'atelier"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="p-3 bg-stone-900 text-stone-200 text-center text-xs italic">
                    Jean Cocteau &amp; Marie-Madeleine Jolly à l'atelier — fin des années 1950.
                  </div>
                </div>
              </div>

              <p>{OURSE_BRUNE_STORY.p3}</p>
              <p>{OURSE_BRUNE_STORY.p4}</p>

              {/* COCTEAU QUOTE */}
              <blockquote className="my-8 p-6 sm:p-8 rounded-2xl bg-stone-50 border-l-4 border-[#800e18] shadow-xs">
                <p className="text-base sm:text-lg italic text-stone-800 font-serif leading-relaxed">
                  {OURSE_BRUNE_STORY.quote}
                </p>
                <cite className="block mt-3 text-right text-xs sm:text-sm font-semibold tracking-wider text-[#800e18] uppercase not-italic">
                  — {OURSE_BRUNE_STORY.quoteAuthor}
                </cite>
              </blockquote>

              <p>{OURSE_BRUNE_STORY.p5}</p>
              <p>{OURSE_BRUNE_STORY.p6}</p>
              <p className="font-medium text-stone-900 bg-stone-100 p-4 rounded-xl border border-stone-200">
                {OURSE_BRUNE_STORY.p7}
              </p>
            </div>

            {/* VIDEO/PHOTO WORKSHOP PREVIEW (as in PDF: "Photo et/ou vidéo (avec bouton play gros au centre) de moi à l’atelier (à venir)") */}
            <div className="w-full max-w-xl my-8">
              <div className="relative aspect-16/9 rounded-3xl bg-linear-to-br from-stone-900 to-stone-800 text-white flex flex-col items-center justify-center p-6 text-center shadow-xl overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent opacity-60"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#800e18] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 mb-4 cursor-pointer">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold tracking-wide">
                    L'Atelier Ourse Brune
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">
                    Vidéo immersive au cœur de l'atelier dans la Drôme (bientôt disponible)
                  </p>
                </div>
              </div>
            </div>

            {/* Collapse button */}
            <button
              type="button"
              onClick={collapse}
              className="mt-6 group w-full max-w-md flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-101"
              title="Replier la section"
            >
              <img
                src="/images/FLECHE-NOIRE.png"
                alt="Replier"
                className="w-full h-auto max-h-12 object-contain opacity-90 group-hover:opacity-100"
              />
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
                Replier
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
