# Requisitos — Painel de Sinalização Digital (Carrossel de Parceiros)
## CT Império

**Versão:** 1.0
**Componente de referência:** `carrossel-parceiros.html`
**Ambiente de exibição:** monitor de 19" fixado na recepção/área comum da academia

---

## 1. Objetivo

Exibir, em loop contínuo durante o horário de funcionamento da academia, um ciclo de conteúdo que combina informação útil para os alunos e publicidade paga dos parceiros oficiais do CT Império, seguindo uma proporção fixa de conteúdo e um cronograma de inserção por marca.

---

## 2. Regras de negócio do ciclo

Estas regras vieram do briefing original e são a fonte de verdade para qualquer ajuste de tempo no código.

| Regra | Valor |
|---|---|
| Duração total do ciclo (vinheta completa) | 3 a 5 minutos |
| Duração da inserção por marca/parceiro | 10 a 15 segundos por ciclo |
| Frequência de exibição por parceiro | ~20 vezes por hora (base: anúncio de 15s em ciclo de 3min) |
| Inserções totais por dia | ~240, considerando 12h de funcionamento |
| Proporção conteúdo útil | 60% do ciclo |
| Proporção publicidade de parceiros | 40% do ciclo |

**Implicação direta para o código:** a constante `DURACAO_SLIDE_MS` e a variável CSS `--duracao-slide` devem sempre ficar entre 10000 e 15000 (10s–15s). Hoje estão configuradas em 12000ms (12s), dentro da faixa.

O número de parceiros cadastrados em `PARCEIROS` deve ser compatível com o ciclo total de 3–5 minutos: com slides de 12s, o carrossel de publicidade sozinho comporta de 15 a 25 parceiros por rodada completa antes de repetir — mas como a publicidade é só 40% do ciclo (ver seção 4), esse número real de parceiros por rodada é menor.

---

## 3. Estrutura atual implementada (`carrossel-parceiros.html`)

O arquivo entregue cobre **apenas o bloco de publicidade dos parceiros** (os 40%). Ele já resolve:

- Carrossel infinito com transição em crossfade entre slides.
- Barra de progresso por parceiro no rodapé, estilo "cronômetro de round", mostrando visualmente quanto falta para o próximo anunciante.
- Contador textual `atual / total` (ex.: "2 / 4").
- Layout responsivo em `vw`/`vh`, compatível com as três resoluções mais comuns de monitor 19": 1280×1024 (4:3), 1366×768 (16:9) e 1440×900 (16:10).
- Lista de parceiros centralizada em um único array JS (`PARCEIROS`), com `nome`, `categoria` e `img` — facilita adicionar/remover parceiro sem mexer no HTML/CSS.
- Tema visual: preto (`--preto`), dourado royal (`--dourado`) e branco (`--branco`), com elemento de assinatura (linha "corda de ringue" no topo/base).

**Ainda não implementado** (fora do escopo do arquivo atual): o bloco de conteúdo útil (60%) e a lógica que alterna entre os dois blocos dentro do ciclo de 3–5 minutos.

---

## 4. Requisitos funcionais

### 4.1 Bloco de publicidade de parceiros (implementado ✓)
- RF01 — O sistema deve exibir um parceiro por vez, em tela cheia, por um tempo configurável entre 10 e 15 segundos.
- RF02 — Ao final do tempo de exibição, o sistema deve avançar automaticamente para o próximo parceiro, em loop infinito (ao chegar no último, volta para o primeiro).
- RF03 — O sistema deve exibir, para cada parceiro: imagem/logo, nome e categoria (ex.: "Nutrição Esportiva").
- RF04 — O sistema deve indicar visualmente o progresso da exibição do parceiro atual (barra de preenchimento) e a posição no ciclo (ex.: "2 / 4").
- RF05 — A lista de parceiros deve poder ser alterada (adicionar, remover, reordenar) editando um único ponto de configuração, sem exigir mudanças na estrutura HTML/CSS.

### 4.2 Bloco de conteúdo útil (pendente — não coberto pelo código atual)
- RF06 — O sistema deve exibir conteúdo institucional/utilitário (dicas de treino, notícias, previsão do tempo, avisos da academia) ocupando 60% do tempo total do ciclo.
- RF07 — O sistema deve alternar automaticamente entre o bloco de conteúdo útil e o bloco de publicidade de parceiros, respeitando a proporção 60/40 dentro do ciclo total de 3 a 5 minutos.
- RF08 — Cada item de conteúdo útil deve poder ter duração própria (nem todo aviso precisa dos mesmos 10–15s de um anúncio pago).

### 4.3 Geral
- RF09 — O ciclo completo deve se repetir automaticamente e sem interação humana durante todo o horário de funcionamento (~12h/dia).
- RF10 — O sistema deve rodar em navegador, sem dependência de internet após o carregamento inicial (imagens/vídeos devem estar hospedados localmente ou em cache, não em serviços externos sujeitos a queda de link).

---

## 5. Requisitos não funcionais

- RNF01 — **Resolução de referência:** 1280×1024 px (5:4) — resolução nativa do monitor LG 19" da recepção. Imagens devem ter no máximo essa dimensão.
- RNF02 — **Peso de arquivo:** cada imagem de parceiro deve pesar no máximo ~500 KB, para evitar engasgo em loop contínuo de longa duração.
- RNF03 — **Resolução de imagem (DPI):** 72–96 DPI é suficiente, por se tratar de exibição em tela, não impressão.
- RNF04 — **Formato de arquivo:** PNG com fundo transparente para logos; JPG para banners/fotos com fundo já resolvido.
- RNF05 — **Estabilidade:** o painel deve poder ficar ligado continuamente por 12h/dia sem necessidade de recarregar a página manualmente.
- RNF06 — **Performance visual:** transições (crossfade) não devem ultrapassar ~1s, para não atrasar a leitura do próximo item nem parecer travado.
- RNF07 — **Identidade visual:** tema fixo preto, dourado royal e branco, consistente com a marca CT Império — qualquer novo bloco de conteúdo (ex.: previsão do tempo) deve seguir a mesma paleta e tipografia.

---

## 6. Especificação de mídia (parceiros)

| Item | Especificação |
|---|---|
| Proporção | 5:4 (monitor LG 19" antigo) |
| Dimensão máxima | 1280 × 1024 px |
| Dimensão mínima | 800 × 600 px |
| DPI | 72–96 |
| Formato | PNG (logo, fundo transparente) ou JPG (banner/foto) |
| Peso máximo | ~500 KB |
| Área de segurança | conteúdo principal centralizado, ~8–10% de margem livre nas bordas |
| Contraste | preferir fundo transparente ou preto sólido; evitar fundo branco colado à borda |

---

## 7. Itens em aberto / próximos passos

1. Definir o formato de dados do bloco de conteúdo útil (dicas de treino, notícias, previsão do tempo, avisos) — provavelmente uma segunda página HTML com a mesma estrutura visual do carrossel de parceiros.
2. Definir o mecanismo de alternância entre os dois blocos (60/40) dentro do ciclo de 3–5 minutos: pode ser feito por um player/playlist externo de sinalização digital, ou por lógica interna em uma única página que soma os dois blocos.
3. Definir fonte de dados para "previsão do tempo" (API externa) e para "avisos da academia" (conteúdo estático atualizado manualmente ou painel administrativo simples).
4. Confirmar quantos parceiros simultâneos são esperados no lançamento, para validar se o ciclo de 3–5 minutos comporta todos dentro da fatia de 40% sem estourar o tempo.
5. Definir processo de atualização de imagens/dados: quem sobe os arquivos, onde ficam hospedados, e se haverá um painel administrativo ou edição direta no array `PARCEIROS`.

---

## 8. Critérios de aceite

- [x] Cada parceiro é exibido por um tempo dentro da faixa 10–15s (implementado: 12s).
- [x] O carrossel de parceiros roda em loop infinito sem intervenção manual.
- [ ] O ciclo total (conteúdo útil + publicidade) fica entre 3 e 5 minutos.
- [ ] A proporção entre conteúdo útil e publicidade se mantém em 60/40.
- [ ] Imagens fora da especificação de tamanho/peso (seção 6) são identificadas antes de entrar em produção.
- [x] O painel roda de forma estável durante um dia inteiro de funcionamento (~12h) sem necessidade de reload manual.