import { useState, useEffect, useCallback } from 'react'

const DURACAO_SLIDE = 12000

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function interleave(images, parceiros) {
  const shuffledImages = shuffle(images)
  const shuffledParceiros = shuffle(parceiros)
  const all = []
  let useImages = true

  while (shuffledImages.length > 0 || shuffledParceiros.length > 0) {
    if (useImages && shuffledImages.length > 0) {
      all.push(shuffledImages.shift())
    } else if (!useImages && shuffledParceiros.length > 0) {
      all.push(shuffledParceiros.shift())
    } else if (shuffledImages.length > 0) {
      all.push(shuffledImages.shift())
    } else if (shuffledParceiros.length > 0) {
      all.push(shuffledParceiros.shift())
    }
    useImages = !useImages
  }

  return all
}

function Carousel() {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/images.json')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          const images = data.images.filter(img => img.source === 'images')
          const parceiros = data.images.filter(img => img.source === 'parceiros')
          const interleaved = interleave(images, parceiros)
          setSlides(interleaved)
        }
        setLoading(false)
      })
      .catch(err => {
        setError('Erro ao carregar imagens')
        setLoading(false)
      })
  }, [])

  const avancar = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length === 0) return
    const interval = setInterval(avancar, DURACAO_SLIDE)
    return () => clearInterval(interval)
  }, [slides.length, avancar])

  if (loading) {
    return (
      <div className="carrossel">
        <div className="loading">Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="carrossel">
        <div className="error">{error}</div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="carrossel">
        <div className="empty">Nenhuma imagem encontrada</div>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="carrossel">
      <span className="flag-parceiro">
        {currentSlide.source === 'parceiros' ? 'Parceiro Oficial' : 'CT Império'}
      </span>
      
      <div className="slide ativo">
        <img src={currentSlide.path} alt={currentSlide.name} />
        <div className="nome-parceiro">{currentSlide.name}</div>
        <div className="categoria-parceiro">
          {currentSlide.source === 'parceiros' ? 'Parceiro' : 'Informação CT'}
        </div>
      </div>

      <div className="barras">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`barra ${i === currentIndex ? 'ativa' : i < currentIndex ? 'concluida' : ''}`}
          >
            <div className="preenchimento"></div>
          </div>
        ))}
      </div>

      <div className="relogio">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  )
}

export default Carousel
