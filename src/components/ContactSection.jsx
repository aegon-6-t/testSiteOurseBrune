import { useState, useEffect } from 'react'
import { CONTACT_POLICY } from '../data/siteData'

export default function ContactSection({ initialSubject, initialPiece }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject || "Commande d'une pièce",
    piece: initialPiece || '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialSubject || initialPiece) {
      setIsOpen(true)
      setFormData((prev) => ({
        ...prev,
        subject: initialSubject || prev.subject,
        piece: initialPiece || prev.piece,
      }))
    }
  }, [initialSubject, initialPiece])

  const toggle = () => setIsOpen(!isOpen)

  const collapse = () => {
    setIsOpen(false)
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated smooth submission
    setSubmitted(true)
  }

  return (
    <section id="contact" className="w-full bg-white flex flex-col items-center scroll-mt-20">
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        {/* BANNER HEADER (Yellow / Gold as in mockup) */}
        <button
          type="button"
          onClick={toggle}
          className="group relative w-full py-8 sm:py-10 bg-[#fba700] hover:bg-[#e69800] transition-colors duration-200 cursor-pointer flex items-center justify-center text-center px-6"
          aria-expanded={isOpen}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-white uppercase font-sans">
            CONTACT / COMMANDE
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
            {/* POLICY DETAILS FROM PDF */}
            <div className="w-full max-w-xl space-y-4 mb-10 text-xs sm:text-sm text-stone-700 leading-relaxed bg-amber-50/50 p-6 rounded-2xl border border-amber-200/50">
              <h3 className="text-base font-bold text-stone-900 tracking-wide mb-2">
                Modalités de commande &amp; fabrication
              </h3>
              {CONTACT_POLICY.details.map((point, idx) => (
                <p key={idx} className="flex gap-2.5">
                  <span className="text-amber-600 font-bold shrink-0">•</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>

            {/* INTERACTIVE FORM */}
            <div className="w-full max-w-xl">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    Merci pour votre message !
                  </h4>
                  <p className="text-sm text-emerald-700 mt-2 max-w-md">
                    Votre demande a bien été transmise à l'atelier Ourse Brune. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: "Commande d'une pièce",
                        piece: '',
                        message: '',
                      })
                    }}
                    className="mt-6 px-5 py-2 rounded-full text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nom &amp; Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Camille Dubois"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden transition-all text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="camille@exemple.fr"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden transition-all text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden transition-all text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Objet de la demande
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden transition-all text-sm bg-white cursor-pointer"
                      >
                        <option value="Commande d'une pièce">Commande d'une pièce</option>
                        <option value="Projet sur-mesure">Projet sur-mesure</option>
                        <option value="Galerie / Exposition">Galerie / Exposition</option>
                        <option value="Autre demande">Autre demande</option>
                      </select>
                    </div>
                  </div>

                  {formData.subject === "Commande d'une pièce" && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Pièce concernée
                      </label>
                      <input
                        type="text"
                        value={formData.piece}
                        onChange={(e) => setFormData({ ...formData, piece: e.target.value })}
                        placeholder="Ex: Tigre Oaxaca, Bête Sauvage, Diablo..."
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden transition-all text-sm bg-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Précisez votre demande, questions ou souhaits particuliers..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden transition-all text-sm bg-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#fba700] hover:bg-[#e69800] text-white font-bold tracking-wider uppercase text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-99"
                  >
                    Envoyer ma demande
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
