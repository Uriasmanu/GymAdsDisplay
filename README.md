# CT Império — Display de Parceiros

Sistema de carrossel automático para exibição de parceiros em monitores de 19".

## Funcionalidades

- Carrossel automático com transições suaves
- **Auto-detecção de imagens** - pastas `images/` e `parceiros/`
- Alternância aleatória entre imagens do CT e parceiros
- Tela cheia automática
- Barra de progresso visual
- Design responsivo

## Como Usar

### 1. Adicionar/Remover Parceiros

Basta adicionar ou remover imagens nas pastas:

- `images/` — informações do CT (academia)
- `parceiros/` — propagandas de parceiros

### 2. Atualizar o Manifest

Após adicionar/remover imagens, regenere o `images.json`:

```bash
npm run build
```

Ou manualmente:

```bash
node scripts/generate-manifest.js
```

### 3. Formatos Suportados

- JPG/JPEG
- PNG
- GIF
- SVG

### 4. Iniciar o Servidor

```bash
npm start
```

Acesse: http://localhost:3000

### 5. Deploy no Vercel

O projeto está configurado para deploy automático no Vercel:

1. Conecte o repositório ao Vercel
2. O `buildCommand` (`node scripts/generate-manifest.js`) roda automaticamente
3. Os arquivos estáticos são servidos diretamente

## Estrutura do Projeto

```
GymAdsDisplay/
├── index.html              # Página principal
├── images.json             # Manifest de imagens (gerado pelo build)
├── server.js               # Servidor local (dev)
├── vercel.json             # Configuração Vercel
├── css/
│   ├── variables.css       # Tokens de design
│   └── styles.css          # Estilos
├── js/
│   ├── data.js             # Constantes
│   ├── carousel.js         # Classe Carrossel
│   ├── fullscreen.js       # Tela cheia automática
│   └── app.js              # Inicialização
├── scripts/
│   └── generate-manifest.js # Gera images.json
├── images/                 # Imagens do CT
├── parceiros/              # Imagens de parceiros
├── implementado/           # Documentação de features
└── docs/                   # Documentação do projeto
```

## Configurações

### Duração dos Slides

1. Edite `css/variables.css`:
   ```css
   --duracao-slide: 12s;
   ```

2. Edite `js/data.js`:
   ```javascript
   const DURACAO_SLIDE_MS = 12000;
   ```

## Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Resoluções Suportadas

- 19" 4:3 → 1280 x 1024 px
- 19" 16:9 → 1366 x 768 px
- 19" 16:10 → 1440 x 900 px
