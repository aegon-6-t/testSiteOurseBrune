import { useState } from 'react'
import { EVENTS_LIST } from '../data/siteData'

export default function NewsletterSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const collapse = () => {
    setIsOpen(false)
    const el = document.getElementById('actualites')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <section id="actualites" className="w-full bg-white flex flex-col items-center scroll-mt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        {/* BANNER HEADER (Pure Black as in mockup) */}
        <button
          type="button"
          onClick={toggle}
          className="group relative w-full py-8 sm:py-10 bg-black hover:bg-stone-900 transition-colors duration-200 cursor-pointer flex items-center justify-center text-center px-6"
          aria-expanded={isOpen}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest text-white uppercase font-sans">
            ACTUALITÉS / NEWSLETTER
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
          <div className="bg-stone-900 px-6 sm:px-12 py-12 flex flex-col items-center text-stone-200">
            {/* EVENTS SECTION */}
            <div className="w-full max-w-xl mb-12">
              <h3 className="text-sm font-bold tracking-widest uppercase text-stone-400 mb-6 text-center">
                Agenda des expositions &amp; événements
              </h3>

              <div className="space-y-4">
                {EVENTS_LIST.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 hover:border-stone-600"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[11px] font-semibold tracking-wider text-amber-400 uppercase">
                        {ev.date}
                      </span>
                      <h4 className="text-base font-bold text-white">{ev.title}</h4>
                      <p className="text-xs text-stone-400">{ev.place}</p>
                      <p className="text-xs text-stone-300 pt-1 leading-relaxed">{ev.desc}</p>
                    </div>

                    <a
                      href={ev.linkUrl}
                      onClick={(e) => {
                        e.preventDefault()
                        alert(`Détails de l'événement : ${ev.title}\nLieu : ${ev.place}`)
                      }}
                      className="shrink-0 px-4 py-2 rounded-xl bg-stone-700 hover:bg-stone-600 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      {ev.linkText}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* ARTIST VALUES & NEWSLETTER BOX */}
            <div className="w-full max-w-xl p-8 rounded-3xl bg-linear-to-b from-stone-800 to-stone-850 border border-stone-750 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-stone-700/80 text-amber-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* PDF TEXT ABOUT VALUES & SOCIAL MEDIA */}
              <p className="text-sm sm:text-base font-medium text-stone-200 mb-2 leading-relaxed">
                Vous ne trouverez pas Ourse Brune sur les réseaux sociaux, incompatibles avec mes valeurs.
              </p>
              <p className="text-xs sm:text-sm text-stone-400 mb-6">
                Mais vous pouvez vous abonner à la Newsletter <span className="text-amber-400 font-semibold">(maximum 2 par an)</span> pour rester informé(e) des nouvelles collections et vernissages.
              </p>

              {subscribed ? (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-medium w-full">
                  Votre inscription a bien été enregistrée. Merci de votre confiance et à bientôt !
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="flex-1 px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 text-sm focus:border-amber-400 focus:outline-hidden transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold tracking-wider text-xs uppercase shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    M'inscrire
                  </button>
                </form>
              )}
            </div>

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
                className="w-full h-auto max-h-12 object-contain filter invert opacity-90 group-hover:opacity-100"
              />
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mt-1">
                Replier
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
