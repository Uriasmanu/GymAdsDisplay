class Carrossel {
  constructor(carrosselEl, barrasEl, relogioEl, parceiros, duracaoSlide) {
    this.carrosselEl = carrosselEl;
    this.barrasEl = barrasEl;
    this.relogioEl = relogioEl;
    this.parceiros = parceiros;
    this.duracaoSlide = duracaoSlide;
    this.atual = 0;
    this.slides = [];
    this.barras = [];
  }

  inicializar() {
    this.montarSlides();
    this.montarBarras();
    this.atualizarRelogio();
    this.iniciarAutomacao();
  }

  montarSlides() {
    this.parceiros.forEach((p, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i === 0 ? ' ativo' : '');
      slide.dataset.index = i;

      const img = document.createElement('img');
      img.src = p.img;
      img.alt = p.nome;

      const nome = document.createElement('div');
      nome.className = 'nome-parceiro';
      nome.textContent = p.nome;

      const categoria = document.createElement('div');
      categoria.className = 'categoria-parceiro';
      categoria.textContent = p.categoria;

      slide.appendChild(img);
      slide.appendChild(nome);
      slide.appendChild(categoria);
      this.carrosselEl.appendChild(slide);
      this.slides.push(slide);
    });
  }

  montarBarras() {
    this.parceiros.forEach((_, i) => {
      const barra = document.createElement('div');
      barra.className = 'barra' + (i === 0 ? ' ativa' : '');
      const preenchimento = document.createElement('div');
      preenchimento.className = 'preenchimento';
      barra.appendChild(preenchimento);
      this.barrasEl.appendChild(barra);
      this.barras.push(barra);
    });
  }

  atualizarRelogio() {
    this.relogioEl.textContent = `${this.atual + 1} / ${this.parceiros.length}`;
  }

  avancar() {
    this.slides[this.atual].classList.remove('ativo');
    this.barras[this.atual].classList.remove('ativa');
    this.barras[this.atual].classList.add('concluida');

    this.atual = (this.atual + 1) % this.parceiros.length;

    if (this.atual === 0) {
      this.barras.forEach(b => b.classList.remove('concluida'));
    }

    this.slides[this.atual].classList.add('ativo');
    this.barras[this.atual].classList.add('ativa');
    this.atualizarRelogio();
  }

  iniciarAutomacao() {
    setInterval(() => this.avancar(), this.duracaoSlide);
  }
}
