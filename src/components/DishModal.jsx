import { useEffect } from 'react'

export default function DishModal({ dish, onClose, onOrder }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!dish) return null

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
        className={`inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full border ${textColor} ${borderColor} ${bgColor}`}
      >
        {status}
      </span>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100/90 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Visual column */}
        <div className="w-full md:w-1/2 bg-stone-100 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
          <div className="relative w-full max-w-[280px] aspect-square rounded-full p-2 bg-white shadow-md">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[11px] text-stone-400 mt-3 font-mono">
            Réf: {dish.id}
          </span>
        </div>

        {/* Info Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="mb-3">{getStatusBadge(dish.status, dish.statusColor)}</div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-wide mb-2 uppercase">
              {dish.name}
            </h3>
            <div className="space-y-1 text-xs sm:text-sm text-stone-600 mb-4 pb-4 border-b border-stone-200">
              <p className="font-semibold text-stone-800">{dish.type}</p>
              <p>Matière : <span className="text-stone-800">{dish.material}</span></p>
              <p>Tirage : <span className="text-stone-800">{dish.edition}</span></p>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
              {dish.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => onOrder(dish.name)}
              className="w-full py-3 rounded-xl bg-[#800e18] hover:bg-[#680b13] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Commander ou réserver cette œuvre &rarr;
            </button>
            <p className="text-[11px] text-stone-400 text-center italic">
              Fixation murale incluse • Emballage sécurisé anti-casse
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
