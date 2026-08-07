# Feature: Carrossel de Slides conforme Requisitos

## Status
Implementado

## Data
07/08/2026

## Contexto

### Problemas Encontrados

#### [resolvido] apresentação de slides conforme requisitos
**Comportamento atual:** O App.jsx contém apenas o template padrão do Vite React (counter button, links de documentação). Não existe carrossel de slides implementado.
**Comportamento esperado:** O sistema deve exibir um carrossel de slides em tela cheia, alternando entre imagens de `images/` (conteúdo CT) e `parceiros/` (publicidade), com duração configurável entre 10-15 segundos por slide, barra de progresso e loop infinito.
**Escopo:** Frontend completo - componente Carousel e App

---

## 1. Contexto e Objetivo

- **O que é:** Carrossel de slides em tela cheia para display de sinalização digital do CT Império
- **Por que existe:** O display na recepção da academia precisa mostrar conteúdo institucional e publicidade de parceiros em loop contínuo
- **Quem usa:** Visitantes e alunos do CT Império (visualização passiva)
- **Escopo:** Display de publicidade em monitor de 19" fixado na recepção

---

## 2. Análise dos Documentos de Referência

- **Guia de spec:** Este documento
- **Documento de requisitos:** `docs/requisitos.md`
- **Documentação técnica existente:**
  - `implementado/alternancia-parceiros-ct-tela-cheia.md` - versão anterior HTML/JS
  - `implementado/auto-detectar-imagens.md` - detecção automática de imagens
  - `implementado/refatoracao-react.md` - migração para React + Vite

---

## 3. História do Usuário

```
Como administrador do CT Império,
quero que o display exiba slides automaticamente em tela cheia,
para que visitantes vejam conteúdo institucional e publicidade de parceiros sem intervenção manual.
```

**Cenários alternativos:**
- Pasta `images/` ou `parceiros/` vazia: ignorar pasta e usar apenas a disponível
- Nenhuma imagem disponível: exibir mensagem de aviso
- Browser bloqueia tela cheia: exibir conteúdo normalmente sem fullscreen

---

## 4. Requisitos Funcionais

- [x] RF-01: O carrossel busca imagens das pastas `images/` e `parceiros/` (via import estático do Vite)
- [x] RF-02: Imagens alternam no padrão: 1 de images/, 1 de parceiros/, 1 de images/, etc.
- [x] RF-03: Cada slide é exibido por 12 segundos (configurable entre 10-15s)
- [x] RF-04: Transição crossfade suave entre slides (~1s)
- [x] RF-05: Barra de progresso visual mostrando tempo restante do slide atual
- [x] RF-06: Contador posicional (ex.: "2 / 15")
- [x] RF-07: Loop infinito - ao chegar no último slide, volta ao primeiro
- [x] RF-08: Tela cheia automática ao carregar (com fallback se bloqueado)
- [x] RF-09: Tema visual: preto, dourado royal e branco (CT Império)
- [x] RF-10: Layout responsivo - funciona em qualquer resolução de monitor 19"
- [x] RF-11: Primeiro slide é a tela de boas-vindas com logo android-icon-foreground centralizada + texto "CT IMPÉRIO"
- [x] RF-12: Último slide é convite para anunciar marca/empresa no display

---

## 5. Requisitos Não-Funcionais

- **Performance:** Transições não devem ultrapassar 1s
- **Compatibilidade:** Chrome, Firefox, Safari, Edge (modernen)
- **Acessibilidade:** Tela cheia pode ser saída com ESC
- **Observabilidade:** Console log para debug

### 5.1 UI/UX Responsivo

- [x] Layout funciona em tela cheia em qualquer resolução
- [x] Imagens escalam corretamente com `object-fit: cover`
- [x] Textos permanecem legíveis (mínimo 14px)
- [x] Transições suaves entre slides

---

## 6. Análise da Aplicação

- **Arquitetura geral:** Frontend estático React + Vite, deploy no Vercel
- **Padrões em uso:** Componentes funcionais React, CSS com variáveis, módulos ES
- **Fluxo de dados:** Imagens estáticas em `public/images/` e `public/parceiros/`, servidas diretamente pelo Vite
- **Constraint Vite:** Arquivos estáticos devem estar em `public/` para serem servidos sem import

---

## 7. Arquivos Envolvidos

| Arquivo | Ação | Razão |
|---------|------|-------|
| `public/images/` | Criar (mover) | Imagens de conteúdo CT |
| `public/parceiros/` | Criar (mover) | Imagens de parceiros |
| `src/Carousel.jsx` | Criar | Componente principal do carrossel |
| `src/App.jsx` | Modificar | Substituir template Vite pelo carrossel |
| `src/App.css` | Modificar | Estilos do carrossel com tema CT |
| `src/index.css` | Modificar | Reset e estilos globais |

---

## 8. Problemas e Impedimentos

### 8.1 Problemas Técnicos
- Imagens em `images/` e `parceiros/` na raiz do projeto não são servidas pelo Vite automaticamente
- **Solução:** Mover para `public/images/` e `public/parceiros/`

### 8.2 Ambiguidades nos Requisitos
- Nenhuma

### 8.3 Riscos
- Browser pode bloquear Fullscreen API (fallback: conteúdo sem fullscreen)

---

## 9. Critérios de Aceite

- [x] CA-01: Dado que existem imagens em ambas as pastas, quando o carrossel carrega, então imagens alternam no padrão 1:1
- [x] CA-02: Dado que o carrossel está rodando, quando observado, então cada slide é exibido por ~12 segundos
- [x] CA-03: Dado que um slide está ativo, quando observado, então a barra de progresso preenche de 0% a 100%
- [x] CA-04: Dado que o carrossel chega ao último slide, quando avança, então volta ao primeiro (loop infinito)
- [x] CA-05: Dado que o HTML carrega, quando abre, então solicita tela cheia
- [x] CA-06: Dado que o usuário pressiona ESC, quando faz isso, então sai da tela cheia

---

## 10. Plano de Implementação

```
Passo 1: Mover imagens para public/
  - O que fazer: Mover images/ e parceiros/ para public/
  - Arquivo(s): public/images/, public/parceiros/
  - Como validar: Imagens acessíveis via /images/ e /parceiros/

Passo 2: Criar componente Carousel.jsx
  - O que fazer: Implementar lógica de carrossel com useState, useEffect, setInterval
  - Arquivo(s): src/Carousel.jsx
  - Como validar: Componente renderiza e alterna slides

Passo 3: Atualizar App.jsx
  - O que fazer: Substituir template Vite pelo Carousel
  - Arquivo(s): src/App.jsx
  - Como validar: Página mostra carrossel

Passo 4: Implementar estilos
  - O que fazer: Criar CSS com tema CT (preto/dourado/branco)
  - Arquivo(s): src/App.css, src/index.css
  - Como validar: Layout visual correto

Passo 5: Testar build
  - O que fazer: npm run build
  - Arquivo(s): todos
  - Como validar: Build sem erros
```

---

## 11. Rollout e Observabilidade

- **Estratégia:** Deploy direto no Vercel (build estático)
- **Monitoramento:** Console do navegador
- **Rollback:** Reverter commit

---

## 12. Definição de Pronto (DoD)

- [x] Todos os critérios de aceite verificados
- [x] Código revisado
- [x] Build sem erros
- [x] Sem warnings não tratados
- [x] Histórico de Correções atualizado

---

## 13. DDR — Design Decision Record

### DDR-005 - Carousel com Imagens Estáticas via Public/

**Status:** Aceito

**Data:** 07/08/2026

**Contexto:**
O Vite não serve arquivos da raiz do projeto automaticamente. Precisamos de uma forma de incluir as imagens de `images/` e `parceiros/` no build.

**Decisão:**
Mover as imagens para `public/images/` e `public/parceiros/` para que sejam servidas como arquivos estáticos.

**Alternativas consideradas:**

#### Alternativa 1: Import estático no JS
- Prós: Vite otimiza automaticamente
- Contras: Requer listar cada imagem manualmente, não é dinâmico

#### Alternativa 2: Public/ (escolhida)
- Prós: Simples, imagens servidas como-is, funciona com qualquer quantidade
- Contras: Sem otimização automática do Vite (aceitável para imagens de display)

**Consequências:**

### Positivas:
- Implementação simples
- Adicionar/remover imagens = apenas mexer na pasta
- Sem necessidade de rebuild para novas imagens (dev server)

### Negativas:
- Imagens não são otimizadas pelo Vite build

---

## Histórico de Correções

| Data | Descrição | RF/CA Afetados |
|------|-----------|----------------|
| 07/08/2026 | Implementado carrossel de slides conforme requisitos | RF-01 a RF-10, CA-01 a CA-06 |
| 07/08/2026 | Movidas imagens para public/ para compatibilidade com Vite | RF-01, CA-01 |
| 07/08/2026 | Implementado tema CT Império (preto/dourado/branco) | RF-09, CA-05 |
| 07/08/2026 | Implementado fullscreen automático com fallback | RF-08, CA-05, CA-06 |
| 07/08/2026 | Adicionado slide de boas-vindas (logo + CT IMPÉRIO) e slide convite para anunciantes | RF-11, RF-12 |
