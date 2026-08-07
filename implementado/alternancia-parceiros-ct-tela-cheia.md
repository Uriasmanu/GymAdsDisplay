# Feature: Alternância entre Parceiros e Conteúdo CT + Tela Cheia

## Status
Implementado

## Data
07/08/2026

## Contexto

### Problemas Encontrados

#### [aberto] Imagens na pasta parceiros e images devem alternar aleatoriamente
**Comportamento atual:** Apenas imagens da pasta images/ são exibidas no carrossel.
**Comportamento esperado:** O carrossel deve alternar entre imagens da pasta parceiros/ (propagandas) e images/ (informações do CT) de forma aleatória.
**Escopo:** Frontend - carrossel de parceiros

#### [aberto] HTML deve abrir em tela cheia automaticamente
**Comportamento atual:** O HTML abre em janela normal, requerendo F11 manual.
**Comportamento esperado:** O HTML deve solicitar tela cheia automaticamente ao carregar.
**Escopo:** Frontend - inicialização

---

## 1. Contexto e Objetivo

- **O que é:** Sistema de carrossel que alterna entre propagandas de parceiros e informações do CT em tela cheia
- **Por que existe:** Display de publicidade precisa mostrar tanto anúncios de parceiros quanto informações da academia
- **Quem usa:** Visitantes e alunos do CT Império
- **Escopo:** Display de publicidade em monitor de 19"

---

## 2. Análise dos Documentos de Referência

- **Guia de spec:** Este documento
- **Documento de requisitos:** `docs/requisitos.md`
- **Código-fonte relevante:**
  - `server.js` - servidor com endpoints de imagens
  - `js/app.js` - inicialização do carrossel
  - `js/carousel.js` - lógica do carrossel

---

## 3. História do Usuário

```
Como administrador do CT Império,
quero que o display alterne entre parceiros e informações do CT,
para que visitantes vejam tanto anúncios quanto conteúdo institucional.
```

```
Como visitante do CT Império,
quero que o display abra em tela cheia,
para que a visualização seja imersiva sem distrações.
```

---

## 4. Requisitos Funcionais

- [x] RF-01: O carrossel busca imagens de ambas as pastas (parceiros/ e images/)
- [x] RF-02: Imagens são exibidas em ordem aleatória
- [x] RF-03: O carrossel alterna entre imagens de ambas as pastas
- [x] RF-04: O HTML solicita tela cheia automaticamente ao carregar
- [x] RF-05: Cada pasta mantém sua identidade visual (diferentes estilos)
- [x] RF-06: Funciona em qualquer browser moderno

---

## 5. Requisitos Não-Funcionais

- **Performance:** Carregamento em menos de 200ms
- **Compatibilidade:** Chrome, Firefox, Safari, Edge
- **Acessibilidade:** Tela cheia pode ser saída com ESC

### 5.1 UI/UX Responsivo

- [x] Layout funciona em tela cheia em qualquer resolução
- [x] Imagens escalam corretamente
- [x] Transições suaves entre slides

---

## 6. Análise da Aplicação

- **Arquitetura:** Frontend estático com servidor Node.js
- **Padrões:** JavaScript modular, CSS com variáveis
- **Fluxo de dados:** Servidor lista imagens de ambas as pastas

---

## 7. Arquivos Envolvidos

| Arquivo | Ação | Razão |
|---------|------|-------|
| `server.js` | Modificar | Adicionar endpoint para imagens de parceiros |
| `js/app.js` | Modificar | Buscar imagens de ambas as pastas e embaralhar |
| `index.html` | Modificar | Adicionar script de tela cheia |
| `js/fullscreen.js` | Criar | Lógica de tela cheia automática |

---

## 8. Problemas e Impedimentos

### 8.1 Problemas Técnicos
- Tela cheia requer interação do usuário em alguns browsers (política de segurança)
- Solução: Solicitar no primeiro evento de interação ou usar API com fallback

### 8.2 Ambiguidades nos Requisitos
- Nenhuma

### 8.3 Riscos
- Alguns browsers podem bloquear tela cheia automática

---

## 9. Critérios de Aceite

- [x] CA-01: Dado que existem imagens em parceiros/ e images/, quando o carrossel carrega, então imagens de ambas as pastas são exibidas
- [x] CA-02: Dado que o carrossel está rodando, quando observado, então a ordem das imagens é aleatória
- [x] CA-03: Dado que o HTML foi aberto, quando carrega, então solicita tela cheia
- [x] CA-04: Dado que o usuário pressiona ESC, quando faz isso, então sai da tela cheia normalmente

---

## 10. Plano de Implementação

```
Passo 1: Atualizar servidor para servir imagens de parceiros
  - O que fazer: Adicionar endpoint /api/parceiros
  - Arquivo(s): server.js
  - Como validar: GET /api/parceiros retorna lista de imagens

Passo 2: Modificar app.js para buscar de ambas as pastas
  - O que fazer: Buscar de /api/images e /api/parceiros, combinar e embaralhar
  - Arquivo(s): js/app.js
  - Como validar: Console mostra imagens de ambas as pastas

Passo 3: Criar script de tela cheia
  - O que fazer: Criar js/fullscreen.js com API Fullscreen
  - Arquivo(s): js/fullscreen.js
  - Como validar: Página solicita tela cheia ao carregar

Passo 4: Atualizar index.html
  - O que fazer: Adicionar script de tela cheia
  - Arquivo(s): index.html
  - Como validar: Página abre em tela cheia automaticamente
```

---

## 11. Rollout e Observabilidade

- **Estratégia:** Deploy direto
- **Monitoramento:** Console do navegador
- **Rollback:** Reverter para versão anterior

---

## 12. Definição de Pronto (DoD)

- [x] Todos os critérios de aceite verificados
- [x] Código revisado
- [x] Sem erros no console
- [x] Histórico de Correções atualizado

---

## 13. DDR — Design Decision Record

### DDR-002 - Estratégia de Alternância entre Pastas

**Status:** Aceito

**Data:** 07/08/2026

**Contexto:**
O display precisa mostrar tanto propagandas de parceiros quanto informações do CT. Existem duas pastas com imagens: parceiros/ e images/.

**Decisão:**
Buscar imagens de ambas as pastas via API, combinar em um único array e embaralhar para exibição aleatória.

**Alternativas consideradas:**

#### Alternativa 1: Dois carrosseis separados
- Prós: Controle independente
- Contras: Mais complexo, requer lógica de alternância

#### Alternativa 2: Array único embaralhado (escolhida)
- Prós: Simples, aleatório, visualmente fluido
- Contras: Sem controle de proporção entre tipos

**Consequências:**

### Positivas:
- Implementação simples
- Experiência visual fluida
- Fácil manutenção

### Negativas:
- Não controla proporção exata entre parceiros e CT

---

### DDR-003 - Tela Cheia Automática

**Status:** Aceito

**Data:** 07/08/2026

**Contexto:**
O display deve funcionar como TV digital, sem barras de navegação do browser.

**Decisão:**
Usar Fullscreen API para solicitar tela cheia no carregamento da página.

**Alternativas consideradas:**

#### Alternativa 1: Instruções manuais (F11)
- Prós: Sem necessidade de código
- Contras: Requer ação manual, esquecimento frequente

#### Alternativa 2: Fullscreen API (escolhida)
- Prós: Automático, experiência imersiva
- Contras: Pode ser bloqueado por alguns browsers

**Consequências:**

### Positivas:
- Experiência imersiva automática
- Sem barras de navegação

### Negativas:
- Usuário pode não perceber como sair (solução: instruir sobre ESC)

---

## Histórico de Correções

| Data | Descrição | RF/CA Afetados |
|------|-----------|----------------|
| 07/08/2026 | Implementada auto-detecção de imagens na pasta images/ | RF-01 a RF-06, CA-01 a CA-04 |
| 07/08/2026 | Implementada alternância entre parceiros/ e images/ com aleatoriedade | RF-01 a RF-06, CA-01 a CA-04 |
| 07/08/2026 | Implementada tela cheia automática | RF-04, CA-03, CA-04 |
