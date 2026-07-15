import { useState, useEffect } from 'react'

const NAV_LINKS = ['Services', 'Global Network', 'Our Story', 'Careers', 'Reach Us']

const LogoSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z"
      fill="white"
    />
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <LogoSVG />
          <span className="text-white text-xs tracking-widest font-bold uppercase select-none">
            United Carriers
          </span>
        </div>

        {/* Desktop center pill nav */}
        <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="text-white/70 text-sm font-medium px-4 py-1.5 rounded-full hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <button className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-medium cursor-pointer hover:bg-white/5 transition-colors duration-200">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Track Shipment
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden liquid-glass rounded-full px-3.5 py-3 flex-col items-center justify-center gap-[5px] cursor-pointer"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-5 h-[1.5px] bg-white rounded-full" />
          <span className="block w-3.5 h-[1.5px] bg-white rounded-full" />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[55] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          {/* Close button */}
          <button
            className="close-btn-animate absolute top-4 right-5 liquid-glass rounded-full w-11 h-11 flex items-center justify-center cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="block w-5 h-[1.5px] bg-white rounded-full absolute rotate-45" />
            <span className="block w-5 h-[1.5px] bg-white rounded-full absolute -rotate-45" />
          </button>

          {/* Nav items */}
          <div className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                className="menu-item-animate text-white/90 text-3xl sm:text-4xl font-medium cursor-pointer hover:text-white transition-colors duration-150"
                style={{ animationDelay: `${100 + i * 60}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <div
            className="menu-item-animate absolute bottom-12"
            style={{ animationDelay: `${100 + NAV_LINKS.length * 60}ms` }}
          >
            <button className="liquid-glass flex items-center gap-2 rounded-full px-5 py-2.5 text-white text-sm font-medium cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Track Shipment
            </button>
          </div>
        </div>
      )}
    </>
  )
}
