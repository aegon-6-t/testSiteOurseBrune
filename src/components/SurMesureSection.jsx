import { useState } from 'react'
import { SUR_MESURE_TEXT } from '../data/siteData'

export default function SurMesureSection({ onContactClick }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const collapse = () => {
    setIsOpen(false)
    const el = document.getElementById('section-sur-mesure')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="section-sur-mesure" className="w-full bg-white flex flex-col items-center scroll-mt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        {/* BANNER HEADER */}
        <button
          type="button"
          onClick={toggle}
          className="group relative w-full aspect-1366/318 overflow-hidden bg-stone-900 cursor-pointer text-left focus:outline-hidden"
          aria-expanded={isOpen}
        >
          <img
            src="/images/bandeau-le-sur-mesure.jpg"
            alt="Le Sur-Mesure"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-200"></div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white/90 flex items-center justify-center backdrop-blur-xs transition-transform duration-300 group-hover:bg-black/70">
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
            isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white px-6 sm:px-12 py-10 flex flex-col items-center text-stone-800">
            <div className="w-full max-w-xl space-y-5 text-sm sm:text-base leading-relaxed text-justify">
              <p>{SUR_MESURE_TEXT.p1}</p>
              <p className="font-medium text-stone-900 bg-amber-50/80 p-4 rounded-xl border border-amber-200/60">
                {SUR_MESURE_TEXT.p2}
              </p>
              <p>{SUR_MESURE_TEXT.p3}</p>
              <p>{SUR_MESURE_TEXT.p4}</p>
            </div>

            {/* Fresque photo placeholder as in PDF: "Photo de fresque à venir." */}
            <div className="w-full max-w-xl my-8 p-8 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center mb-3 shadow-inner">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-stone-800">
                Fresques murales & Projets d'exception
              </h4>
              <p className="text-xs text-stone-500 mt-1 italic">
                Photographies de réalisations in-situ à venir très prochainement.
              </p>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => onContactClick && onContactClick('Projet sur-mesure')}
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Échanger autour d'un projet sur-mesure &rarr;
            </button>

            {/* Collapse button */}
            <button
              type="button"
              onClick={collapse}
              className="mt-10 group w-full max-w-md flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-101"
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
