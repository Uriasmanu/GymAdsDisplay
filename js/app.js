document.addEventListener('DOMContentLoaded', () => {
  const carrosselEl = document.getElementById('carrossel');
  const barrasEl = document.getElementById('barras');
  const relogioEl = document.getElementById('relogio');

  const carrossel = new Carrossel(
    carrosselEl,
    barrasEl,
    relogioEl,
    PARCEIROS,
    DURACAO_SLIDE_MS
  );

  carrossel.inicializar();
});
