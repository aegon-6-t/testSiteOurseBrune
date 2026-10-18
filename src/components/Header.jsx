import { useState, useEffect } from 'react'

export default function Header({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (id) => {
    setMenuOpen(false)
    if (onNavigate) {
      onNavigate(id)
    } else {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
          : 'bg-white/90 backdrop-blur-xs py-3 sm:py-4'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
        {/* Empty left balance block for perfect centering */}
        <div className="w-10 sm:w-12"></div>

        {/* Center Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <img
            src="/images/LOGO-OB-Art-ceramique-noir.png"
            alt="Ourse Brune — Art Céramique"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
          />
        </a>

        {/* Right Burger Button (as on the mockup: burgundy tab with 2 white bars) */}
        <div className="w-10 sm:w-12 flex justify-end">
          <button
            id="main-menu-btn"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu principal"
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#800e18] hover:bg-[#680b13] transition-all duration-200 flex flex-col items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-stone-900 text-white ${
          menuOpen ? 'max-h-80 border-b border-stone-800 shadow-xl opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto px-6 py-6 flex flex-col items-center gap-4 text-center">
          <button
            type="button"
            onClick={() => handleLinkClick('ourse-brune')}
            className="text-base sm:text-lg font-medium tracking-wider text-stone-200 hover:text-white hover:scale-105 transition-all py-1.5 cursor-pointer uppercase"
          >
            Ourse Brune ?
          </button>
          <div className="w-8 h-px bg-stone-700"></div>
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="text-base sm:text-lg font-medium tracking-wider text-amber-400 hover:text-amber-300 hover:scale-105 transition-all py-1.5 cursor-pointer uppercase"
          >
            Contact / Commande
          </button>
          <div className="w-8 h-px bg-stone-700"></div>
          <button
            type="button"
            onClick={() => handleLinkClick('actualites')}
            className="text-base sm:text-lg font-medium tracking-wider text-stone-200 hover:text-white hover:scale-105 transition-all py-1.5 cursor-pointer uppercase"
          >
            Actualités / Newsletter
          </button>
        </div>
      </div>
    </header>
  )
}
