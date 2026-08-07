# Feature: Auto-detectar imagens da pasta images

## Status
Implementado

## Data
07/08/2026

## Contexto

### Problemas Encontrados

#### [aberto] O código sempre tem que usar as imagens que estão dentro da pasta
**Comportamento atual:** As imagens do carrossel estão hardcoded no arquivo `js/data.js`, requiring alteração manual no código sempre que uma imagem é adicionada ou removida.
**Comportamento esperado:** O sistema deve detectar automaticamente todas as imagens na pasta `images/` e usá-las no carrossel, atualizando-se dinamicamente.
**Escopo:** Frontend - carrossel de parceiros

---

## 1. Contexto e Objetivo

- **O que é:** Sistema de auto-detecção de imagens para o carrossel de parceiros
- **Por que existe:** Eliminar a necessidade de editar código manualmente ao adicionar/remover imagens
- **Quem usa:** Administradores do CT Império que gerenciam as imagens dos parceiros
- **Escopo:** Apenas o carrossel de parceiros no display de publicidade

---

## 2. Análise dos Documentos de Referência

- **Guia de spec:**Este documento
- **Documento de requisitos:** `docs/requisitos.md`
- **Código-fonte relevante:**
  - `index.html` - estrutura principal
  - `js/data.js` - dados dos parceiros (hardcoded)
  - `js/carousel.js` - lógica do carrossel
  - `js/app.js` - inicialização

---

## 3. História do Usuário

```
Como administrador do CT Império,
quero adicionar ou remover imagens da pasta images/,
para que o carrossel atualize automaticamente sem edição de código.
```

**Cenários alternativos:**
- Pasta images/ vazia: exibir mensagem de aviso
- Imagem corrompida: pular e continuar com as válidas
- Formato não suportado: ignorar arquivo

---

## 4. Requisitos Funcionais

- [x] RF-01: O sistema detecta automaticamente todas as imagens na pasta `images/`
- [x] RF-02: Imagens com extensões .jpg, .jpeg, .png são incluídas no carrossel
- [x] RF-03: Nomes das imagens são usados como nomes dos parceiros
- [x] RF-04: Imagens são exibidas em ordem alfabética
- [x] RF-05: O carrossel funciona sem necessidade de edição de código
- [x] RF-06: O sistema ignora arquivos que não são imagens

---

## 5. Requisitos Não-Funcionais

- **Performance:** A detecção deve ocorrer em menos de 100ms
- **Compatibilidade:** Funciona em browsers modernos (Chrome, Firefox, Safari, Edge)
- **Observabilidade:** Log no console quando imagens são detectadas

### 5.1 UI/UX Responsivo

- [x] Layout funciona em todos os breakpoints (mobile a desktop)
- [x] Imagens escalam corretamente sem distorção
- [x] Textos permanecem legíveis em telas pequenas

---

## 6. Análise da Aplicação

- **Arquitetura geral:** Frontend estático com HTML, CSS e JavaScript vanilla
- **Padrões em uso:** CSS com variáveis, classes BEM-like, JavaScript modular
- **Fluxo de dados:** Arquivos estáticos servidos diretamente pelo servidor

---

## 7. Arquivos Envolvidos

| Arquivo | Ação | Razão |
|---------|------|-------|
| `index.html` | Modificar | Adicionar script para carregar imagens dinamicamente |
| `js/data.js` | Modificar | Transformar em array vazio (será populado dinamicamente) |
| `js/app.js` | Modificar | Adicionar lógica de detecção de imagens |
| `server.js` | Criar | Servidor simples para servir arquivos estáticos com CORS |

---

## 8. Problemas e Impedimentos

### 8.1 Problemas Técnicos
- Navegadores não permitem leitura direta do sistema de arquivos por segurança
- Solução: Usar servidor local ou lista hardcodada que seja atualizada externamente

### 8.2 Ambiguidades nos Requisitos
- Como o navegador não pode listar arquivos diretamente, precisamos de uma abordagem alternativa

### 8.3 Riscos
- Dependência de servidor para leitura de diretório

---

## 9. Critérios de Aceite

- [x] CA-01: Dado que existem imagens na pasta images/, quando o carrossel carrega, então todas as imagens são exibidas
- [x] CA-02: Dado que uma nova imagem é adicionada à pasta, quando o carrossel recarrega, então a nova imagem aparece
- [x] CA-03: Dado que uma imagem é removida da pasta, quando o carrossel recarrega, então ela não aparece mais
- [x] CA-04: Dado que a pasta está vazia, quando o carrossel carrega, então uma mensagem de aviso é exibida

---

## 10. Plano de Implementação

```
Passo 1: Criar servidor simples para servir arquivos estáticos
  - O que fazer: Criar server.js com Node.js
  - Arquivo(s): server.js
  - Como validar: Executar `node server.js` e acessar http://localhost:3000

Passo 2: Modificar app.js para detectar imagens
  - O que fazer: Adicionar função que busca lista de imagens
  - Arquivo(s): js/app.js
  - Como validar: Abrir console e ver lista de imagens detectadas

Passo 3: Atualizar data.js para ser dinâmico
  - O que fazer: Transformar PARCEIROS em array vazio
  - Arquivo(s): js/data.js
  - Como validar: Carrossel funciona com dados dinâmicos

Passo 4: Testar adição e remoção de imagens
  - O que fazer: Adicionar/remover imagens e recarregar página
  - Arquivo(s): images/
  - Como validar: Carrossel atualiza automaticamente
```

---

## 11. Rollout e Observabilidade

- **Estratégia de entrega:** Deploy direto (arquivos estáticos)
- **Como monitorar:** Console do navegador mostra imagens detectadas
- **Plano de rollback:** Reverter para versão anterior com dados hardcoded

---

## 12. Definição de Pronto (DoD)

- [x] Todos os critérios de aceite foram verificados
- [x] Código revisado
- [x] Sem warnings ou erros não tratados
- [x] Seção Histórico de Correções atualizada

---

## 13. DDR — Design Decision Record

### DDR-001 - Estratégia de Detecção de Imagens

**Status:** Aceito

**Data:** 07/08/2026

**Contexto:**
O navegador não pode ler diretamente o sistema de arquivos por questões de segurança. Precisamos de uma forma de detectar imagens na pasta images/.

**Decisão:**
Usar endpoint HTTP que retorna a lista de imagens disponíveis.

**Alternativas consideradas:**

#### Alternativa 1: Fetch de diretório via servidor
- Prós: Seguro, funciona em qualquer browser
- Contras: Requer servidor backend

#### Alternativa 2: Hardcoded com script de geração
- Prós: Sem dependência de servidor
- Contras: Requer execução manual para atualizar

**Consequências:**

### Positivas:
- Solução robusta e escalável
- Funciona em qualquer ambiente

### Negativas:
- Requer servidor para executar

---

## Histórico de Correções

| Data | Descrição | RF/CA Afetados |
|------|-----------|----------------|
| 07/08/2026 | Implementação inicial da auto-detecção de imagens | RF-01 a RF-06, CA-01 a CA-04 |
