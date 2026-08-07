import { useState, useEffect } from 'react'
import Carousel from './Carousel.jsx'

function App() {
  useEffect(() => {
    const docEl = document.documentElement
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen()
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen()
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen()
    }
  }, [])

  return (
    <div className="palco">
      <div className="corda topo"></div>
      
      <header>
        <div className="marca">
          <span className="ct">CT</span>
          <span className="imperio">Império</span>
        </div>
        <div className="selo">Parceiros Oficiais</div>
      </header>

      <Carousel />

      <footer>
        <div className="relogio" id="relogio"></div>
      </footer>

      <div className="corda base"></div>
    </div>
  )
}

export default App
