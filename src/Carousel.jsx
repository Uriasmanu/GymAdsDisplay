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

const SLIDE_INTRO = { tipo: 'intro' }
const SLIDE_CONVITE = { tipo: 'convite' }

function buildSlides() {
  const middle = interleaveArrays(IMAGENS_CT, IMAGENS_PARCEIROS)
  return [SLIDE_INTRO, ...middle, SLIDE_CONVITE]
}

export default function Carousel() {
  const slides = useRef(buildSlides()).current
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
        {slide.tipo === 'intro' && (
          <div className="slide-intro">
            <img src="/images/android-icon-foreground.png" alt="" className="slide-intro__logo" />
            <span className="slide-intro__nome">CT IMPÉRIO</span>
          </div>
        )}

        {slide.tipo === 'convite' && (
          <div className="slide-convite">
            <div className="slide-convite__conteudo">
              <span className="slide-convite__icone">&#9733;</span>
              <h2 className="slide-convite__titulo">Anuncie sua marca</h2>
              <p className="slide-convite__texto">
                Divulgue sua empresa no display do CT Império
              </p>
              <p className="slide-convite__contato">Fale conosco na recepção</p>
            </div>
          </div>
        )}

        {slide.tipo !== 'intro' && slide.tipo !== 'convite' && (
          <img
            src={slide.src}
            alt=""
            className={`carousel__image ${
              'carousel__image--active'
            } ${isTransitioning ? 'carousel__image--fade-out' : ''}`}
          />
        )}
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
              {slide.tipo === 'ct' && 'CT Império'}
              {slide.tipo === 'parceiro' && 'Parceiro'}
              {slide.tipo === 'intro' && 'Bem-vindo'}
              {slide.tipo === 'convite' && 'Anuncie'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
