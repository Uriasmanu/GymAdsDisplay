document.addEventListener('DOMContentLoaded', async () => {
  const carrosselEl = document.getElementById('carrossel');
  const barrasEl = document.getElementById('barras');
  const relogioEl = document.getElementById('relogio');

  try {
    const response = await fetch('/images.json');
    const data = await response.json();
    
    if (data.images && data.images.length > 0) {
      const parceiros = data.images.map(img => ({
        nome: img.name,
        categoria: img.source === 'parceiros' ? 'Parceiro' : 'CT Império',
        img: img.path
      }));

      console.log(`${parceiros.length} imagens detectadas:`, parceiros.map(p => `${p.nome} [${p.categoria}]`));

      const carrossel = new Carrossel(
        carrosselEl,
        barrasEl,
        relogioEl,
        parceiros,
        DURACAO_SLIDE_MS
      );

      carrossel.inicializar();
    } else {
      carrosselEl.innerHTML = '<div style="color: #c9a227; text-align: center; padding: 20px;">Nenhuma imagem encontrada</div>';
    }
  } catch (error) {
    console.error('Erro ao carregar imagens:', error);
    carrosselEl.innerHTML = '<div style="color: #c9a227; text-align: center; padding: 20px;">Erro ao carregar imagens</div>';
  }
});
