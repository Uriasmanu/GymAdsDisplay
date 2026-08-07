import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

const DURACAO_SLIDE_MS = 12000
const DURACAO_TRANSICAO_MS = 1000

const imagensCT = import.meta.glob('/public/images/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' })
const imagensParceiros = import.meta.glob('/public/parceiros/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' })

function extractPaths(modules) {
  return Object.values(modules).sort()
}

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
  const ctPaths = extractPaths(imagensCT)
  const parceirosPaths = extractPaths(imagensParceiros)
  const middle = interleaveArrays(ctPaths, parceirosPaths)
  return [SLIDE_INTRO, ...middle, SLIDE_CONVITE]
}

function getBadgeLabel(tipo) {
  switch (tipo) {
    case 'ct': return 'CT Império'
    case 'parceiro': return 'Parceiro'
    case 'intro': return 'Bem-vindo'
    case 'convite': return 'Anuncie'
    default: return ''
  }
}

export default function Carousel() {
  const slides = useMemo(buildSlides, [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [brokenSrcs, setBrokenSrcs] = useState(() => new Set())

  const timerRef = useRef(null)
  const rafRef = useRef(null)
  const isVisibleRef = useRef(true)

  // Pula slides cuja imagem falhou ao carregar (ex: arquivo corrompido no build)
  const resolveIndex = useCallback((index) => {
    let idx = index
    let attempts = 0
    while (attempts < slides.length) {
      const s = slides[idx]
      if (s.tipo === 'intro' || s.tipo === 'convite' || !brokenSrcs.has(s.src)) {
        return idx
      }
      idx = (idx + 1) % slides.length
      attempts++
    }
    return index
  }, [slides, brokenSrcs])

  const goToNext = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => resolveIndex((prev + 1) % slides.length))
      setProgress(0)
      setIsTransitioning(false)
    }, DURACAO_TRANSICAO_MS)
  }, [slides.length, resolveIndex])

  const handleImageError = useCallback((src) => {
    setBrokenSrcs((prev) => {
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }, [])

  // Timer do slide + barra de progresso via requestAnimationFrame
  useEffect(() => {
    const startTime = Date.now()

    const tick = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / DURACAO_SLIDE_MS) * 100, 100))
      if (elapsed < DURACAO_SLIDE_MS) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    timerRef.current = setTimeout(goToNext, DURACAO_SLIDE_MS)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [currentIndex, goToNext])

  // Pausa a barra de progresso quando a aba fica oculta
  useEffect(() => {
    const onVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  // Fullscreen na primeira interação
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

  // Pré-carrega a próxima imagem para evitar flicker na troca
  const nextIndex = resolveIndex((currentIndex + 1) % slides.length)
  useEffect(() => {
    const nextSlide = slides[nextIndex]
    if (nextSlide && nextSlide.src) {
      const img = new Image()
      img.src = nextSlide.src
    }
  }, [nextIndex, slides])

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
            key={slide.src}
            src={slide.src}
            alt=""
            onError={() => handleImageError(slide.src)}
            className={`carousel__image carousel__image--active ${
              isTransitioning ? 'carousel__image--fade-out' : ''
            }`}
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
              {getBadgeLabel(slide.tipo)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}