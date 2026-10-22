import { useState } from 'react'

export default function SeriesSection({ seriesList, onSelectDish, onOrderDish }) {
  // MEXICO ! est ouvert par défaut comme sur la maquette
  const [openSeries, setOpenSeries] = useState({ mexico: true })

  const toggleSeries = (id) => {
    setOpenSeries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const collapseSeries = (id) => {
    setOpenSeries((prev) => ({
      ...prev,
      [id]: false,
    }))
    const banner = document.getElementById(`series-${id}`)
    if (banner) {
      banner.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const getStatusBadge = (status, color) => {
    let textColor = 'text-amber-600'
    let borderColor = 'border-amber-300'
    let bgColor = 'bg-amber-50'

    if (color === 'green') {
      textColor = 'text-emerald-700'
      borderColor = 'border-emerald-300'
      bgColor = 'bg-emerald-50'
    } else if (color === 'red') {
      textColor = 'text-rose-700'
      borderColor = 'border-rose-300'
      bgColor = 'bg-rose-50'
    }

    return (
      <span
        className={`inline-block px-3 py-0.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase rounded-full border ${textColor} ${borderColor} ${bgColor}`}
      >
        {status}
      </span>
    )
  }

  return (
    <section id="series-section" className="w-full bg-white flex flex-col items-center">
      {/* Conteneur pleine largeur */}
      <div className="w-full flex flex-col divide-y-0">
        {seriesList.map((serie) => {
          const hasItems = Boolean(serie.items && serie.items.length > 0)
          const isOpen = hasItems && !!openSeries[serie.id]

          return (
            <div key={serie.id} id={`series-${serie.id}`} className="w-full flex flex-col scroll-mt-20">
              {/* BANDEAU DE SÉRIE — PLEINE LARGEUR D'ÉCRAN */}
              <button
                type="button"
                onClick={() => hasItems && toggleSeries(serie.id)}
                className={`group relative w-full aspect-[1366/318] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] overflow-hidden bg-stone-900 text-left focus:outline-hidden block leading-none ${
                  hasItems ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-expanded={isOpen}
                aria-controls={hasItems ? `content-${serie.id}` : undefined}
                disabled={!hasItems}
              >
                <img
                  src={serie.bannerImg}
                  alt={serie.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 block ${
                    hasItems ? 'group-hover:scale-101' : ''
                  }`}
                />

                {/* Voile subtil au survol si la série a du contenu */}
                {hasItems && (
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-200"></div>
                )}

                {/* Indicateur déplier / replier si la série a du contenu */}
                {hasItems && (
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
                )}
              </button>

              {/* CONTENU DÉPLIABLE DE LA SÉRIE — AFFICHÉ UNIQUEMENT SI LA SÉRIE CONTIENT DES PIÈCES */}
              {hasItems && (
                <div
                  id={`content-${serie.id}`}
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[7000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="w-full bg-white pt-10 sm:pt-14 pb-0 flex flex-col items-center">
                    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
                      {/* Texte d'introduction de la collection */}
                      {serie.description ? (
                        <p className="text-center text-sm sm:text-base md:text-lg text-stone-700 font-medium max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed">
                          {serie.description}
                        </p>
                      ) : null}

                      {/* Grille des pièces si la série est active */}
                      <div className="w-full flex flex-col items-center">
                        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:gap-10 justify-items-center mb-8">
                          {serie.items.map((dish) => (
                            <div
                              key={dish.id}
                              onClick={() => onSelectDish(dish)}
                              className="group flex flex-col items-center text-center cursor-pointer max-w-[260px] w-full transition-all duration-300 hover:-translate-y-1.5"
                            >
                              {/* Photo de la céramique */}
                              <div className="relative w-48 sm:w-52 md:w-56 aspect-square mb-4 rounded-full p-2 bg-stone-50 transition-all duration-300 group-hover:shadow-2xl">
                                <img
                                  src={dish.image}
                                  alt={dish.name}
                                  className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                              </div>

                              {/* Détails de la pièce */}
                              <h3 className="text-sm sm:text-base font-extrabold tracking-wider text-stone-900 uppercase mb-1">
                                {dish.name}
                              </h3>
                              <p className="text-xs text-stone-600 font-medium mb-0.5">
                                {dish.type}{dish.material ? `, ${dish.material}` : ''}
                              </p>
                              <p className="text-xs text-stone-500 mb-2">
                                {dish.edition}
                              </p>

                              {/* Badge de disponibilité */}
                              <div>{getStatusBadge(dish.status, dish.statusColor)}</div>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-stone-400 italic mb-6 text-center">
                          Cliquez sur une pièce pour afficher les photos de détail
                        </p>
                      </div>
                    </div>

                    {/* FLÈCHE NOIRE — PLEINE LARGEUR BORD À BORD, COLLÉE DIRECTEMENT AU BANDEAU SUIVANT SANS AUCUN VIDE */}
                    <button
                      type="button"
                      onClick={() => collapseSeries(serie.id)}
                      className="w-full block border-0 p-0 m-0 mt-2 sm:mt-4 bg-transparent cursor-pointer transition-opacity duration-200 hover:opacity-85 focus:outline-hidden leading-none select-none"
                      title="Replier la série"
                      aria-label="Replier la série"
                    >
                      <img
                        src="/images/FLECHE-NOIRE.png"
                        alt="Replier la série"
                        className="w-full h-auto block select-none pointer-events-none"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
