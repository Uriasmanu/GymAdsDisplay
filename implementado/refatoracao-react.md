# Feature: Refatoração Completa para React

## Status
Implementado

## Data
07/08/2026

## Contexto

### Problemas Encontrados

#### [aberto] Refazer toda a aplicação em React
**Comportamento atual:** Aplicação em HTML/CSS/JS puro com problemas de deploy no Vercel.
**Comportamento esperado:** Aplicação em React que funcione perfeitamente no Vercel, com carrossel alternando entre images/ e parceiros/.
**Escopo:** Frontend completo - reescrita da aplicação

---

## 1. Contexto e Objetivo

- **O que é:** Reescrita completa da aplicação usando React + Vite
- **Por que existe:** Simplificar deploy no Vercel e manutenção do código
- **Quem usa:** Administradores do CT Império
- **Escopo:** Display de parceiros em tela cheia

---

## 2. Requisitos Funcionais

- [x] RF-01: Carrossel alterna entre imagens de images/ e parceiros/
- [x] RF-02: Padrão: 1 imagem de images/, 1 de parceiros/, 1 de images/, etc.
- [x] RF-03: Tela cheia automática
- [x] RF-04: Transições suaves entre slides
- [x] RF-05: Barra de progresso visual
- [x] RF-06: Totalmente dinâmico - adicionar/remover imagens atualiza o carrossel

---

## 3. Critérios de Aceite

- [x] CA-01: Dado que existem imagens em ambas as pastas, quando o carrossel carrega, então imagens alternam corretamente
- [x] CA-02: Dado que uma imagem é adicionada, quando o build roda, então ela aparece no carrossel
- [x] CA-03: Dado que o HTML carrega, quando abre, então solicita tela cheia
- [x] CA-04: Dado que o deploy é feito no Vercel, quando acessado, então funciona corretamente

---

## 4. Arquivos Envolvidos

| Arquivo | Ação | Razão |
|---------|------|-------|
| `package.json` | Criar | Configuração do projeto React |
| `vite.config.js` | Criar | Configuração do Vite |
| `src/App.jsx` | Criar | Componente principal |
| `src/Carousel.jsx` | Criar | Componente do carrossel |
| `src/index.css` | Criar | Estilos |
| `src/main.jsx` | Criar | Ponto de entrada |
| `index.html` | Modificar | Template HTML |
| `vercel.json` | Modificar | Configuração Vercel |
| `scripts/generate-manifest.js` | Manter | Gera images.json |

---

## 5. Plano de Implementação

```
Passo 1: Criar estrutura React com Vite
  - O que fazer: Configurar package.json, vite.config.js
  - Arquivo(s): package.json, vite.config.js
  - Como validar: npm install && npm run dev funciona

Passo 2: Implementar componente Carousel
  - O que fazer: Criar lógica de carrossel com alternância
  - Arquivo(s): src/Carousel.jsx
  - Como validar: Carrossel alterna entre images/ e parceiros/

Passo 3: Implementar estilos
  - O que fazer: Criar CSS com design dourado/preto
  - Arquivo(s): src/index.css
  - Como validar: Layout visual correto

Passo 4: Configurar Vercel
  - O que fazer: Configurar build e output
  - Arquivo(s): vercel.json
  - Como validar: Deploy funciona no Vercel
```

---

## 6. DDR — Design Decision Record

### DDR-004 - Migração para React + Vite

**Status:** Aceito

**Data:** 07/08/2026

**Contexto:**
A aplicação HTML/CSS/JS puro apresenta problemas de deploy no Vercel e dificuldade de manutenção.

**Decisão:**
Migrar para React + Vite para simplificar deploy e manutenção.

**Alternativas consideradas:**

#### Alternativa 1: Next.js
- Prós: SSR, otimizações
- Contras: Complexo demais para página única

#### Alternativa 2: React + Vite (escolhida)
- Prós: Simples, build rápido, leve
- Contras: Sem SSR (não necessário)

**Consequências:**

### Positivas:
- Deploy simplificado no Vercel
- Código mais organizado e reutilizável
- Build otimizado

### Negativas:
- Necessita de build step

---

## Histórico de Correções

| Data | Descrição | RF/CA Afetados |
|------|-----------|----------------|
| 07/08/2026 | Implementada auto-detecção de imagens na pasta images/ | RF-01 a RF-06, CA-01 a CA-04 |
| 07/08/2026 | Implementada alternância entre parceiros/ e images/ | RF-01 a RF-06, CA-01 a CA-04 |
| 07/08/2026 | Implementada tela cheia automática | RF-04, CA-03, CA-04 |
| 07/08/2026 | Corrigido deploy Vercel | Todos |
| 07/08/2026 | Corrigida lógica de alternância 1:1 | RF-01 a RF-06, CA-01 a CA-04 |
| 07/08/2026 | Refatoração completa para React + Vite | Todos |
