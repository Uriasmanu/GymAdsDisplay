# CT Império — Display de Parceiros

Sistema de carrossel automático para exibição de parceiros em monitores de 19".

## Funcionalidades

- Carrossel automático com transições suaves
- **Auto-detecção de imagens** - adiciona/remove imagens automaticamente
- Barra de progresso visual
- Design responsivo para diferentes tamanhos de tela

## Como Usar

### 1. Adicionar/Remover Parceiros

Basta adicionar ou remover imagens da pasta `images/`:

```bash
# Adicionar nova imagem
cp nova-imagem.jpg images/

# Remover imagem
rm images/imagem-antiga.jpg
```

O carrossel atualiza automaticamente ao recarregar a página.

### 2. Formatos Suportados

- JPG/JPEG
- PNG
- GIF
- SVG

### 3. Iniciar o Servidor

```bash
# Instalar dependências (opcional, usa apenas módulos nativos)
npm install

# Iniciar servidor
npm start

# Ou diretamente
node server.js
```

Acesse: http://localhost:3000

### 4. API de Imagens

Endpoint para listar imagens disponíveis:

```
GET http://localhost:3000/api/images
```

Resposta:
```json
{
  "images": [
    {
      "filename": "boxe.jpeg",
      "name": "boxe",
      "path": "images/boxe.jpeg"
    }
  ]
}
```

## Estrutura do Projeto

```
GymAdsDisplay/
├── index.html          # Página principal
├── server.js           # Servidor Node.js
├── css/
│   ├── variables.css   # Variáveis de design
│   └── styles.css      # Estilos
├── js/
│   ├── data.js         # Constantes
│   ├── carousel.js     # Classe Carrossel
│   └── app.js          # Inicialização
├── images/             # Imagens dos parceiros
├── implementado/       # Documentação de features
└── docs/               # Documentação do projeto
```

## Configurações

### Duração dos Slides

Para alterar o tempo de exibição de cada slide:

1. Edite `css/variables.css`:
   ```css
   --duracao-slide: 12s; /* altere o valor */
   ```

2. Edite `js/data.js`:
   ```javascript
   const DURACAO_SLIDE_MS = 12000; /* altere para o mesmo valor em ms */
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
