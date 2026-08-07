<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CT Império — Parceiros</title>
<style>
  /* =========================================================
     TOKENS
     Preto profundo + dourado royal + branco.
     O dourado usa dois tons: um "metal" mais quente para texto/
     bordas e um mais claro só para o brilho (glow), pra não
     virar amarelo-limão.
  ========================================================= */
  :root{
    --preto: #0a0a0a;
    --preto-2: #141210;
    --dourado: #c9a227;      /* dourado royal, base */
    --dourado-claro: #e8c96a; /* brilho / hover */
    --dourado-escuro: #7d6414;
    --branco: #f5f2ea;
    --branco-fosco: #cfcabf;

    --duracao-slide: 12s;     /* 10–15s por parceiro, ver notas no fim do arquivo */
    --duracao-transicao: 900ms;
  }

  *{ margin:0; padding:0; box-sizing:border-box; }

  html,body{
    width:100%; height:100%;
    background:var(--preto);
    overflow:hidden;
    font-family: 'Bebas Neue', 'Oswald', Arial Narrow, sans-serif;
  }

  @font-face{
    font-family:'DisplayFallback';
    src:local('Arial Narrow');
  }

  /* ---------------------------------------------------------
     PALCO — ocupa 100% do monitor (19" = normalmente
     1280x1024 4:3 ou 1440x900 / 1366x768 16:9).
     Tudo é feito em % e vw/vh, então se adapta a qualquer um
     desses três casos sem precisar trocar código.
  --------------------------------------------------------- */
  .palco{
    position:relative;
    width:100vw;
    height:100vh;
    background:
      radial-gradient(circle at 50% 0%, rgba(201,162,39,0.10), transparent 60%),
      linear-gradient(180deg, var(--preto-2) 0%, var(--preto) 100%);
    display:flex;
    flex-direction:column;
  }

  /* Corda de ringue como moldura — o "sinal gráfico" do design.
     Uma linha dourada fina correndo no topo e embaixo, com nós
     discretos, referenciando as cordas do ringue/tatame. */
  .corda{
    position:absolute;
    left:0; right:0;
    height:3px;
    background:linear-gradient(90deg, transparent, var(--dourado) 15%, var(--dourado) 85%, transparent);
    opacity:0.55;
  }
  .corda.topo{ top:14px; }
  .corda.base{ bottom:14px; }

  /* ---------------------------------------------------------
     CABEÇALHO
  --------------------------------------------------------- */
  header{
    flex:0 0 auto;
    padding:2.2vh 4vw 1.2vh;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .marca{
    display:flex;
    align-items:baseline;
    gap:0.6vw;
  }
  .marca .ct{
    font-size:2.4vw;
    letter-spacing:0.08em;
    color:var(--branco);
    font-weight:700;
  }
  .marca .imperio{
    font-size:2.4vw;
    letter-spacing:0.08em;
    color:var(--dourado);
    font-weight:700;
  }
  .selo{
    font-size:0.95vw;
    letter-spacing:0.25em;
    color:var(--branco-fosco);
    text-transform:uppercase;
    border:1px solid var(--dourado-escuro);
    padding:0.4vh 0.9vw;
    border-radius:2px;
  }

  /* ---------------------------------------------------------
     PALCO DO CARROSSEL
  --------------------------------------------------------- */
  .carrossel{
    position:relative;
    flex:1 1 auto;
    margin:0 4vw;
    border-radius:6px;
    overflow:hidden;
    background:#000;
    box-shadow:
      0 0 0 1px rgba(201,162,39,0.25),
      0 0 60px rgba(201,162,39,0.06) inset;
  }

  .slide{
    position:absolute;
    inset:0;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    opacity:0;
    transform:scale(1.02);
    transition: opacity var(--duracao-transicao) ease, transform calc(var(--duracao-transicao) * 4) ease;
    background:#050505;
  }
  .slide.ativo{
    opacity:1;
    transform:scale(1);
    z-index:2;
  }

  .slide img{
    max-width:88%;
    max-height:70%;
    object-fit:contain;
    filter:drop-shadow(0 6px 22px rgba(0,0,0,0.55));
  }

  .slide .nome-parceiro{
    margin-top:2.4vh;
    font-size:1.7vw;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--branco);
  }
  .slide .categoria-parceiro{
    margin-top:0.4vh;
    font-size:1vw;
    letter-spacing:0.2em;
    text-transform:uppercase;
    color:var(--dourado);
  }

  /* faixa "Parceiro Oficial" — repete um selo simples de contexto,
     sem números de sequência (não é um passo-a-passo, é um anúncio) */
  .flag-parceiro{
    position:absolute;
    top:1.6vh; left:1.6vw;
    font-size:0.85vw;
    letter-spacing:0.22em;
    text-transform:uppercase;
    color:var(--preto);
    background:var(--dourado);
    padding:0.5vh 1vw;
    border-radius:2px;
    z-index:3;
  }

  /* ---------------------------------------------------------
     RODAPÉ — barra de progresso "round clock"
     Cada bloco representa um parceiro no ciclo; o preenchimento
     avança durante a exibição dele, como um cronômetro de round.
  --------------------------------------------------------- */
  footer{
    flex:0 0 auto;
    padding:1.6vh 4vw 2.2vh;
    display:flex;
    align-items:center;
    gap:1.2vw;
  }
  .barras{
    flex:1;
    display:flex;
    gap:0.6vw;
  }
  .barra{
    flex:1;
    height:4px;
    background:rgba(245,242,234,0.14);
    border-radius:2px;
    overflow:hidden;
    position:relative;
  }
  .barra .preenchimento{
    position:absolute;
    inset:0;
    width:0%;
    background:var(--dourado);
  }
  .barra.concluida .preenchimento{ width:100%; background:var(--dourado-escuro); }
  .barra.ativa .preenchimento{
    animation:preencher var(--duracao-slide) linear forwards;
  }
  @keyframes preencher{ from{ width:0%; } to{ width:100%; } }

  .relogio{
    font-size:0.9vw;
    color:var(--branco-fosco);
    letter-spacing:0.1em;
    white-space:nowrap;
  }

  /* leve respiro para telas bem pequenas em teste no navegador */
  @media (max-width:700px){
    .marca .ct, .marca .imperio{ font-size:5vw; }
    .slide .nome-parceiro{ font-size:4vw; }
    .slide .categoria-parceiro{ font-size:2.6vw; }
  }
</style>
</head>
<body>

<div class="palco">
  <div class="corda topo"></div>

  <header>
    <div class="marca">
      <span class="ct">CT</span><span class="imperio">Império</span>
    </div>
    <div class="selo">Parceiros Oficiais</div>
  </header>

  <div class="carrossel" id="carrossel">
    <span class="flag-parceiro">Parceiro Oficial</span>
    <!-- Slides inseridos via JS a partir da lista PARCEIROS abaixo -->
  </div>

  <footer>
    <div class="barras" id="barras"></div>
    <div class="relogio" id="relogio">1 / 1</div>
  </footer>

  <div class="corda base"></div>
</div>

<script>
/* =============================================================
   LISTA DE PARCEIROS
   Troque "img" pelo caminho real do arquivo de cada parceiro.
   Os placeholders abaixo só existem pra visualização do layout.
   Ver notas de tamanho de imagem no comentário no final do arquivo.
============================================================= */
const PARCEIROS = [
  { nome:"Suplementos Alfa",  categoria:"Nutrição Esportiva", img:"https://placehold.co/1280x720/0a0a0a/c9a227?text=LOGO+PARCEIRO+1&font=oswald" },
  { nome:"Fisio & Cia",       categoria:"Fisioterapia Esportiva", img:"https://placehold.co/1280x720/0a0a0a/c9a227?text=LOGO+PARCEIRO+2&font=oswald" },
  { nome:"Fight Wear",        categoria:"Equipamentos de Luta", img:"https://placehold.co/1280x720/0a0a0a/c9a227?text=LOGO+PARCEIRO+3&font=oswald" },
  { nome:"Studio Corpo Ativo",categoria:"Estética e Bem-estar", img:"https://placehold.co/1280x720/0a0a0a/c9a227?text=LOGO+PARCEIRO+4&font=oswald" },
];

const DURACAO_SLIDE_MS = 12000; // igual à variável --duracao-slide no CSS

const carrossel = document.getElementById('carrossel');
const barrasEl = document.getElementById('barras');
const relogioEl = document.getElementById('relogio');

let atual = 0;

function montarSlides(){
  PARCEIROS.forEach((p, i) => {
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
    carrossel.appendChild(slide);
  });
}

function montarBarras(){
  PARCEIROS.forEach((_, i) => {
    const barra = document.createElement('div');
    barra.className = 'barra' + (i === 0 ? ' ativa' : '');
    const preenchimento = document.createElement('div');
    preenchimento.className = 'preenchimento';
    barra.appendChild(preenchimento);
    barrasEl.appendChild(barra);
  });
}

function atualizarRelogio(){
  relogioEl.textContent = `${atual + 1} / ${PARCEIROS.length}`;
}

function avancar(){
  const slidesAntigos = document.querySelectorAll('.slide');
  const barrasEls = document.querySelectorAll('.barra');

  slidesAntigos[atual].classList.remove('ativo');
  barrasEls[atual].classList.remove('ativa');
  barrasEls[atual].classList.add('concluida');

  atual = (atual + 1) % PARCEIROS.length;

  if (atual === 0){
    // reinicia o ciclo: limpa o estado "concluída" de todas as barras
    barrasEls.forEach(b => b.classList.remove('concluida'));
  }

  slidesAntigos[atual].classList.add('ativo');
  barrasEls[atual].classList.add('ativa');
  atualizarRelogio();
}

montarSlides();
montarBarras();
atualizarRelogio();
setInterval(avancar, DURACAO_SLIDE_MS);
</script>

</body>
</html>

<!--
=====================================================================
NOTAS TÉCNICAS — tamanho de imagem para monitor de 19"
=====================================================================

Monitores de 19" comuns e suas resoluções nativas:
  - 19" 4:3  -> 1280 x 1024 px  (o mais comum em monitores antigos/quadrados)
  - 19" 16:9 -> 1366 x 768  px  (widescreen "slim")
  - 19" 16:10-> 1440 x 900  px  (mais raro)

Recomendação prática para as imagens/logos dos parceiros:

  1. Envie sempre em 16:9, 1600 x 900 px (ou 1920 x 1080 px se quiser
     margem de segurança para monitores maiores no futuro).
     O CSS usa "object-fit: contain", então uma imagem 16:9 nunca
     é cortada, só é reduzida/ampliada conforme o monitor real.

  2. Resolução: 72–96 DPI é suficiente (é tela, não impressão).
     Não é necessário exportar em altíssima resolução; isso só
     deixa o arquivo pesado sem ganho visual.

  3. Formato: PNG com fundo transparente para logos (fica mais
     integrado ao fundo preto do carrossel) ou JPG de boa qualidade
     para banners/fotos com fundo já resolvido.

  4. Peso do arquivo: mantenha cada imagem abaixo de ~500 KB.
     Em loop contínuo o dia todo, arquivos pesados aumentam o
     risco de engasgo/travamento no carregamento.

  5. Área de segurança: o logo/conteúdo principal do parceiro deve
     ocupar o miolo central da imagem, com uma margem de ~8-10%
     livre nas bordas — o layout já reserva espaço ao redor
     (max-width: 88%, max-height: 70%), mas isso evita que o
     conteúdo fique colado na borda em telas menores.

  6. Contraste: como o fundo do palco é preto, logos com fundo
     branco sólido funcionam bem, mas logos com fundo transparente
     (PNG) se integram melhor ao tema.

=====================================================================
NOTAS SOBRE O TEMPO DE EXIBIÇÃO (baseado no que você descreveu)
=====================================================================

  - Cada parceiro fica em tela por --duracao-slide (12s por padrão,
    dentro da faixa de 10–15s que você definiu). Para ajustar,
    troque os dois lugares: a variável CSS "--duracao-slide" e a
    constante JS "DURACAO_SLIDE_MS" (precisam bater).

  - Este arquivo cobre só o bloco de "publicidade dos parceiros"
    (os 40% do ciclo). Os 60% de conteúdo útil (dicas de treino,
    previsão do tempo, avisos) podem virar um segundo carrossel
    com a mesma estrutura visual, alternando com este via um
    player/playlist externo (ex.: um app de sinalização digital
    que troca entre as duas páginas HTML).
-->