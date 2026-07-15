import { useEffect, useRef } from 'react'

const BG_IMAGE_1 =
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80'
const FRONT_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-in-the-ocean-from-above-41774-large.mp4'
const OVERLAY_IMAGE =
  'https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png'

const SPOTLIGHT_RADIUS = 260

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealDivRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const targetX = useRef(0)
  const targetY = useRef(0)
  const smoothX = useRef(-9999)
  const smoothY = useRef(-9999)
  const rafId = useRef<number>(0)

  const gridTargetX = useRef(0)
  const gridTargetY = useRef(0)
  const gridSmoothX = useRef(0)
  const gridSmoothY = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const revealDiv = revealDivRef.current
    const grid = gridRef.current
    if (!section || !canvas || !revealDiv || !grid) return

    const ctx = canvas.getContext('2d')!

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      targetX.current = e.clientX - rect.left
      targetY.current = e.clientY - rect.top

      const cx = rect.width / 2
      const cy = rect.height / 2
      gridTargetX.current = ((e.clientX - rect.left - cx) / rect.width) * 16
      gridTargetY.current = ((e.clientY - rect.top - cy) / rect.height) * 16
    }

    section.addEventListener('mousemove', handleMouseMove)

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      const lerpFactor = 0.1
      smoothX.current += (targetX.current - smoothX.current) * lerpFactor
      smoothY.current += (targetY.current - smoothY.current) * lerpFactor

      gridSmoothX.current += (gridTargetX.current - gridSmoothX.current) * 0.06
      gridSmoothY.current += (gridTargetY.current - gridSmoothY.current) * 0.06

      grid.style.transform = `translate(${gridSmoothX.current}px, ${gridSmoothY.current}px)`

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const cx = smoothX.current
      const cy = smoothY.current
      const r = SPOTLIGHT_RADIUS

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.4, 'rgba(255,255,255,1)')
      grad.addColorStop(0.6, 'rgba(255,255,255,0.75)')
      grad.addColorStop(0.75, 'rgba(255,255,255,0.4)')
      grad.addColorStop(0.88, 'rgba(255,255,255,0.12)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      const dataURL = canvas.toDataURL()
      revealDiv.style.webkitMaskImage = `url(${dataURL})`
      revealDiv.style.maskImage = `url(${dataURL})`

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="font-helvetica-neue relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Layer 1 — SVG Grid (z-0) */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        style={{ opacity: 0.1 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Layer 2 — Background image (z-10) */}
      <div
        className="absolute inset-0 z-10 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url(${BG_IMAGE_1})`,
        }}
      />

      {/* Layer 3 — Hero heading (z-20) */}
      <div
        className="absolute left-0 right-0 z-20 flex flex-col items-center px-4 top-20 sm:top-28 md:top-32"
      >
        <h1
          className="
            text-[3.5rem] xs:text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]
            leading-[0.9] text-white text-center uppercase select-none
          "
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          every{' '}
          <em className="not-italic" style={{ fontStyle: 'italic', fontFamily: "'Instrument Serif', serif" }}>
            leg
          </em>
          {' '}of the{' '}
          <em style={{ fontFamily: "'Instrument Serif', serif" }}>
            journey
          </em>
        </h1>
      </div>

      {/* Layer 4 — Overlay PNG (z-25) */}
      <img
        src={OVERLAY_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-[25] w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Layer 5 — Spotlight reveal (z-30) */}
      <div
        ref={revealDivRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      >
        <video
          src={FRONT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: 'inset(40% 0 0 0)' }}
        />
      </div>

      {/* Hidden canvas for mask generation */}
      <canvas ref={canvasRef} className="hidden" />
    </section>
  )
}
