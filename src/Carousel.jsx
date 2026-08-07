import { useState, useEffect, useCallback, useRef } from 'react'

const DURACAO_SLIDE_MS = 12000
const DURACAO_TRANSICAO_MS = 1000

const IMAGENS_CT = [
  '/images/banner.jpeg',
  '/images/boxe.jpeg',
  '/images/graduacaoJiu.jpeg',
  '/images/graduacaoThai.jpeg',
  '/images/jiu-baby.jpeg',
  '/images/jiu-feminino.jpeg',
  '/images/jiu-infantil.jpeg',
  '/images/jiu-mirim.jpeg',
  '/images/jiu-misto.jpeg',
  '/images/Muay.jpeg',
  '/images/muay-kids.jpeg',
  '/images/no-gi.jpeg',
  '/images/pascoakids.jpg',
]

const IMAGENS_PARCEIROS = [
  '/parceiros/images.jpg',
  '/parceiros/images.png',
  '/parceiros/images (1).jpg',
  '/parceiros/images (2).jpg',
  '/parceiros/images (3).jpg',
  '/parceiros/images (4).jpg',
  '/parceiros/images (5).jpg',
  '/parceiros/images (6).jpg',
  '/parceiros/images (7).jpg',
  '/parceiros/images (8).jpg',
  '/parceiros/images (9).jpg',
  '/parceiros/images (10).jpg',
]

function interleaveArrays(a, b) {
  const result = []
  const maxLen = Math.max(a.length, b.length)
  for (let i = 0; i < maxLen; i++) {
    if (i < a.length) result.push({ src: a[i], tipo: 'ct' })
    if (i < b.length) result.push({ src: b[i], tipo: 'parceiro' })
  }
  return result
}

export default function Carousel() {
  const slides = interleaveArrays(IMAGENS_CT, IMAGENS_PARCEIROS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  const goToNext = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
      setProgress(0)
      setIsTransitioning(false)
    }, DURACAO_TRANSICAO_MS)
  }, [slides.length])

  useEffect(() => {
    timerRef.current = setTimeout(goToNext, DURACAO_SLIDE_MS)

    const startTime = Date.now()
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / DURACAO_SLIDE_MS) * 100, 100))
    }, 50)

    return () => {
      clearTimeout(timerRef.current)
      clearInterval(progressRef.current)
    }
  }, [currentIndex, goToNext])

  useEffect(() => {
    const requestFS = () => {
      const el = document.documentElement
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {})
      }
    }

    if (document.fullscreenElement) return
    document.addEventListener('click', requestFS, { once: true })
    document.addEventListener('keydown', requestFS, { once: true })

    return () => {
      document.removeEventListener('click', requestFS)
      document.removeEventListener('keydown', requestFS)
    }
  }, [])

  const slide = slides[currentIndex]

  return (
    <div className="carousel">
      <div className="carousel__slide-container">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            className={`carousel__image ${
              i === currentIndex ? 'carousel__image--active' : ''
            } ${isTransitioning && i === currentIndex ? 'carousel__image--fade-out' : ''}`}
          />
        ))}
      </div>

      <div className="carousel__overlay">
        <div className="carousel__top-bar">
          <span className="carousel__logo">CT IMPÉRIO</span>
        </div>

        <div className="carousel__bottom-bar">
          <div className="carousel__progress-container">
            <div
              className="carousel__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="carousel__info">
            <span className="carousel__counter">
              {currentIndex + 1} / {slides.length}
            </span>
            <span className={`carousel__badge carousel__badge--${slide.tipo}`}>
              {slide.tipo === 'ct' ? 'CT Império' : 'Parceiro'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
