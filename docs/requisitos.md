# Requisitos — Painel de Sinalização Digital (Carrossel de Parceiros)
## CT Império

**Versão:** 2.0
**Tecnologia:** React + Vite
**Ambiente de exibição:** monitor LG 19" (1280×1024, 5:4) fixado na recepção/área comum da academia

---

## 1. Objetivo

Exibir, em loop contínuo durante o horário de funcionamento da academia, um ciclo de slides que combina slide de boas-vindas, conteúdo institucional, publicidade paga dos parceiros e convite para anunciantes.

---

## 2. Regras de negócio do ciclo

| Regra | Valor |
|---|---|
| Duração por slide | 12 segundos (configurável entre 10–15s) |
| Transição entre slides | 1s (crossfade) |
| Loop | Infinito, sem intervenção humana |
| Ordem dos slides | Boas-vindas → CT/Parceiros alternados (1:1) → Convite → repetir |

---

## 3. Estrutura implementada

Aplicação React + Vite com as seguintes funcionalidades:

- **Slide de boas-vindas:** Logo notification-icon.png centralizado em fundo preto
- **Carrossel dinâmico:** Imagens detectadas automaticamente via `import.meta.glob` (adicionar/remover imagem = próxima build atualiza)
- **Alternância 1:1:** 1 imagem de `images/`, 1 de `parceiros/`, intercaladas
- **Slide de convite:** "Anuncie sua marca" para potenciais anunciantes
- **Barra de progresso:** Visualiza tempo restante do slide atual
- **Contador posicional:** Ex.: "3 / 25"
- **Badges:** Labels por tipo (CT Império, Parceiro, Bem-vindo, Anuncie)
- **Tela cheia:** Tentativa automática + fallback no primeiro clique
- **Tema visual:** Preto, dourado royal e branco (CT Império)
- **Tratamento de erros:** Imagens corrompidas são puladas automaticamente
- **Preload:** Próxima imagem é carregada antes da transição
- **Pausa visibilidade:** Barra de progresso pausa quando aba fica oculta

---

## 4. Requisitos funcionais

### 4.1 Geral
- [x] RF01 — O carrossel exibe slides automaticamente em loop infinito
- [x] RF02 — Cada slide é exibido por 12 segundos (configurável entre 10–15s)
- [x] RF03 — Transição crossfade suave entre slides (~1s)
- [x] RF04 — Tela cheia automática ao carregar (com fallback)
- [x] RF05 — Tema visual: preto, dourado royal e branco (CT Império)

### 4.2 Slides especiais
- [x] RF06 — Primeiro slide: boas-vindas com logo notification-icon.png centralizado
- [x] RF07 — Último slide: convite para anunciar marca/empresa

### 4.3 Carrossel de imagens
- [x] RF08 — Imagens detectadas dinamicamente de `public/images/` e `public/parceiros/`
- [x] RF09 — Alternância 1:1 entre imagens CT e parceiros
- [x] RF10 — Adicionar/remover imagem atualiza automaticamente no próximo build
- [x] RF11 — Imagens corrompidas são puladas sem quebrar o carrossel

### 4.4 Interface
- [x] RF12 — Barra de progresso visual mostrando tempo restante
- [x] RF13 — Contador posicional (ex.: "3 / 25")
- [x] RF14 — Badges identificando tipo do slide
- [x] RF15 — Logo "CT IMPÉRIO" na barra superior

---

## 5. Requisitos não funcionais

- [x] RNF01 — Resolução nativa: 1280×1024 px (5:4, monitor LG 19")
- [x] RNF02 — Peso máximo por imagem: ~500 KB
- [x] RNF03 — Formato: JPG ou PNG
- [x] RNF04 — Estabilidade: funciona 12h/dia sem reload manual
- [x] RNF05 — Performance: transições ≤ 1s
- [x] RNF06 — Compatibilidade: Chrome, Firefox, Safari, Edge
- [x] RNF07 — Fullscreen: funciona em modo kiosk/TV
- [x] RNF08 — Pausa automática quando aba fica oculta

---

## 6. Especificação de mídia

| Item | Especificação |
|---|---|
| Proporção | 5:4 (monitor LG 19" antigo) |
| Dimensão máxima | 1280 × 1024 px |
| Dimensão mínima | 800 × 600 px |
| DPI | 72–96 |
| Formato | PNG (logo, fundo transparente) ou JPG (banner/foto) |
| Peso máximo | ~500 KB |

---

## 7. Arquitetura

| Arquivo | Função |
|---|---|
| `src/Carousel.jsx` | Componente principal do carrossel |
| `src/App.jsx` | Wrapper do Carousel |
| `src/App.css` | Estilos do carrossel e slides especiais |
| `src/index.css` | Reset global e variáveis CSS |
| `public/images/` | Imagens de conteúdo CT |
| `public/parceiros/` | Imagens de parceiros |
| `index.html` | Template com favicon notification-icon.png |

---

## 8. Itens em aberto / próximos passos

1. Definir bloco de conteúdo útil (dicas de treino, notícias, previsão do tempo) — ocupando 60% do ciclo
2. Definir mecanismo de alternância 60/40 entre conteúdo útil e publicidade
3. Definir fonte de dados para "previsão do tempo" e "avisos da academia"
4. Definir processo de atualização de imagens/dados em produção

---

## 9. Critérios de aceite

- [x] Primeiro slide exibe logo notification-icon.png centralizado
- [x] Último slide exibe convite para anunciantes
- [x] Imagens alternam no padrão 1:1 (CT/Parceiro)
- [x] Adicionar imagem à pasta aparece no carrossel após build
- [x] Remover imagem da pasta some do carrossel após build
- [x] Tela cheia funciona em modo kiosk
- [x] Barra de progresso preenche de 0% a 100% em 12s
- [x] Loop infinito sem intervenção manual
