import { useState } from 'react'

export default function SeriesSection({ seriesList, onSelectDish, onOrderDish }) {
  // MEXICO ! is open by default as in the mockup
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
      <div className="w-full max-w-2xl mx-auto flex flex-col divide-y-0">
        {seriesList.map((serie) => {
          const isOpen = !!openSeries[serie.id]

          return (
            <div key={serie.id} id={`series-${serie.id}`} className="w-full flex flex-col scroll-mt-20">
              {/* BANNER HEADER */}
              <button
                type="button"
                onClick={() => toggleSeries(serie.id)}
                className="group relative w-full aspect-1366/318 overflow-hidden bg-stone-900 cursor-pointer text-left focus:outline-hidden"
                aria-expanded={isOpen}
                aria-controls={`content-${serie.id}`}
              >
                <img
                  src={serie.bannerImg}
                  alt={serie.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                />

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-200"></div>

                {/* Toggle icon hint */}
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

              {/* EXPANDABLE ACCORDION CONTENT */}
              <div
                id={`content-${serie.id}`}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-white px-4 sm:px-8 py-8 flex flex-col items-center">
                  {/* Introductory note */}
                  <p className="text-center text-xs sm:text-sm md:text-base text-stone-700 font-medium max-w-xl mb-8 leading-relaxed">
                    {serie.description}
                  </p>

                  {/* If this is MEXICO ! (ready with dishes) */}
                  {serie.isReady && serie.items && (
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 md:gap-8 justify-items-center mb-8">
                        {serie.items.map((dish) => (
                          <div
                            key={dish.id}
                            onClick={() => onSelectDish(dish)}
                            className="group flex flex-col items-center text-center cursor-pointer max-w-[240px] transition-all duration-300 hover:-translate-y-1"
                          >
                            {/* Plate Image */}
                            <div className="relative w-44 sm:w-48 md:w-52 aspect-square mb-4 rounded-full p-1 bg-stone-50 transition-shadow duration-300 group-hover:shadow-xl">
                              <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                            </div>

                            {/* Plate Details */}
                            <h3 className="text-sm sm:text-base font-extrabold tracking-wider text-stone-900 uppercase mb-1">
                              {dish.name}
                            </h3>
                            <p className="text-xs text-stone-600 font-medium mb-0.5">
                              {dish.type}, {dish.material}
                            </p>
                            <p className="text-xs text-stone-500 mb-2">
                              {dish.edition}
                            </p>

                            {/* Availability status */}
                            <div>{getStatusBadge(dish.status, dish.statusColor)}</div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] sm:text-xs text-stone-400 italic mb-6 text-center">
                        Cliquez sur une pièce pour afficher les détails et faire une demande
                      </p>
                    </div>
                  )}

                  {/* If not ready yet */}
                  {!serie.isReady && (
                    <div className="w-full max-w-md my-4 p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-stone-800 tracking-wide">
                        {serie.subtitle || 'Série en cours de réalisation'}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Les photographies et pièces de cette série sont actuellement en cours de préparation à l'atelier.
                      </p>
                      <button
                        type="button"
                        onClick={() => onOrderDish && onOrderDish(serie.title)}
                        className="mt-2 text-xs font-semibold text-[#800e18] hover:text-[#5e0a11] hover:underline cursor-pointer"
                      >
                        Se renseigner sur cette série &rarr;
                      </button>
                    </div>
                  )}

                  {/* CHEVRON COLLAPSE BUTTON (FLECHE-NOIRE.png as in mockup) */}
                  <div className="w-full flex flex-col items-center mt-4">
                    <button
                      type="button"
                      onClick={() => collapseSeries(serie.id)}
                      className="group relative w-full max-w-md py-3 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-101"
                      title="Replier la série"
                      aria-label="Replier la série"
                    >
                      <img
                        src="/images/FLECHE-NOIRE.png"
                        alt="Replier la série"
                        className="w-full h-auto max-h-12 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mt-1 group-hover:text-stone-800 transition-colors">
                        Replier
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
