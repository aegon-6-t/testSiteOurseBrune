import { useState } from 'react'

export default function SurMesureSection() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const collapse = () => {
    setIsOpen(false)
    const el = document.getElementById('section-sur-mesure')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="section-sur-mesure" className="w-full bg-white flex flex-col items-center scroll-mt-20">
      <div className="w-full flex flex-col">
        {/* BANDEAU LE SUR-MESURE — PLEINE LARGEUR */}
        <button
          type="button"
          onClick={toggle}
          className="group relative w-full aspect-[1366/318] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] overflow-hidden bg-stone-900 cursor-pointer text-left focus:outline-hidden block leading-none"
          aria-expanded={isOpen}
        >
          <img
            src="/images/bandeau-le-sur-mesure.jpg"
            alt="Le Sur-Mesure"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-101 block"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-200"></div>

          <div className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 text-white/90 flex items-center justify-center backdrop-blur-xs transition-transform duration-300 group-hover:bg-black/70">
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

        {/* CONTENU DÉPLIABLE DU SUR-MESURE */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full bg-white pt-12 sm:pt-16 pb-0 flex flex-col items-center">
            {/* Texte noir sur blanc, sans fioritures, centré */}
            <div className="w-full max-w-3xl px-4 sm:px-8 space-y-6 text-black text-center text-sm sm:text-base md:text-lg leading-relaxed font-sans mb-8 sm:mb-12">
              <p>
                La céramique permet de proposer des œuvres murales aux formats très divers et robustes dans le temps dedans comme dehors, quand on maîtrise le choix des terres et des émaux. Elle sont adaptés aux intempéries et ne subissent pas ou peu de dégradations évitant ainsi des rénovations futures.
              </p>
              <p>
                Ainsi, je permets à mes clients d’investir dans une décoration exceptionnellement durable.
              </p>
              <p>
                J'apprécie de sortir de mon atelier pour travailler en équipe, avec des entreprises comme des restaurants, hôtels, magasins et autres ou pour le compte d’architectes d’intérieurs. Pour ces derniers, je m'adapte aux cahiers des charges techniques et à la direction artistique des projets dans leur ensemble.
              </p>
              <p>
                Ce matériau noble permet aussi une décoration harmonieuse entre l’intérieur et l’extérieur, puisse qu’elle est assurée par la même artiste.
              </p>
              <p className="pt-2 font-medium">
                Photo de fresque à venir.
              </p>
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
