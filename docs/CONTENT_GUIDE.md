# Guia de conteúdo dos cases

## Posicionamento e fontes

Christian Da Costa será apresentado como **Technical Project Manager | SaaS, Product & Implementation**. A narrativa deve demonstrar gestão de projetos e produtos, implementação, análise de negócio, requisitos, processos, QA, documentação e acompanhamento da execução técnica. O uso de tecnologia e desenvolvimento assistido por IA apoia esse posicionamento.

O briefing confirma os nomes dos cinco cases e dos cinco módulos iniciais de Roomix. Ele não confirma tecnologias, datas, vínculo empregatício, funcionalidades, responsabilidades específicas, métricas ou resultados. Esses campos permanecem como `[A VALIDAR]`, ou ausentes quando o campo técnico é opcional. Datas, imagens e equipes não devem receber valores fictícios para satisfazer o template.

O preenchimento detalhado depende da documentação oficial de cada projeto. Ao recebê-la, registrar em Evidence a fonte, a afirmação sustentada e a autorização para publicar o material. Remover ou anonimizar dados privados antes de incluí-los no Git.

## Organização

| Arquivo / diretório | Função |
| --- | --- |
| `src/app/work/projects/*.mdx` | Fonte dos cases ativos; nome do arquivo define o slug |
| `src/lib/cases.ts` | Contrato, validação e ordenação dos cases |
| `docs/templates/case-study.mdx` | Modelo copiável de 17 seções |
| `docs/upstream-samples/projects` | Três exemplos originais preservados fora das rotas ativas |
| `tests/cases.test.mjs` | Testes do carregamento, contrato e conteúdo inicial |
| `public/images/cases/<slug>/` | Convenção para futuros arquivos visuais aprovados |

Os exemplos upstream não descrevem Christian e não podem ser reutilizados como evidência de sua experiência. O template de conteúdo fora de `src/app/work/projects` não gera uma página.

## Cases e rotas

| Ordem | Case | Rota |
| --- | --- | --- |
| 1 | Roomix — Hospitality Technology Ecosystem | `/work/roomix` |
| 2 | Inflowork Looping Engineering | `/work/inflowork-looping-engineering` |
| 3 | Inflowork Business Systems | `/work/inflowork-business-systems` |
| 4 | Logistics SaaS — `[A VALIDAR]` | `/work/logistics-saas` |
| 5 | HQBeds — International SaaS Implementation | `/work/hqbeds` |

Roomix é o case principal e representa um ecossistema. O frontmatter contém Roomix SaaS, Roomix Console, Roomix Channel Manager, Roomix Direct e Booking Generator. Cada descrição está em `[A VALIDAR]`. Funções, integrações, relações e novos módulos dependem de fontes confirmadas.

## Frontmatter

```yaml
---
title: "[A VALIDAR]"
summary: "[A VALIDAR]"
order: 6
status: "[A VALIDAR]"
images: []
team: []
---
```

- `title` e `summary`: textos obrigatórios, não vazios; usar `[A VALIDAR]` para informação desconhecida.
- `order`: inteiro positivo único. A ordem é editorial e não implica cronologia ou data de entrega. Roomix ocupa a posição 1.
- `status`: `[A VALIDAR]` nesta fase. Uma futura publicação validada requer revisão consciente desse contrato, com testes.
- `images`: lista de caminhos de imagens aprovadas, inicialmente vazia. Nunca usar screenshots de demonstração como se fossem do case.
- `team`: lista vazia nesta fase. A inclusão futura de pessoas exige documentação e evolução explícita do contrato.
- `modules`: lista opcional de objetos `name` / `description`, normalizada para `[]` quando ausente. Não incluir descrições funcionais sem documentação.
- `publishedAt`: opcional, string entre aspas em formato `YYYY-MM-DD`; omitir enquanto não existir uma data de publicação real aprovada.
- `image` e `link`: opcionais; omitir quando não houver imagem social ou destino confirmado.

Copiar o modelo para `src/app/work/projects/<slug>.mdx` e ajustar o `order` para um valor livre. Slugs aceitam letras minúsculas, números e hífens. Preservar slugs já publicados ou planejar os redirecionamentos quando o nome definitivo de Logistics SaaS for aprovado.

## Seções

Os 17 títulos de nível 2 são obrigatórios, únicos e seguem esta ordem:

1. Overview
2. Context
3. Problem
4. My Role
5. Discovery
6. Requirements
7. Scope
8. Planning
9. Product / System Architecture
10. Execution
11. QA & Validation
12. Challenges
13. Decisions
14. Delivery
15. Results
16. Lessons / Evolution
17. Evidence

Usar `###` para subdivisões dentro de uma seção. Não substituir incerteza por uma narrativa plausível: manter o marcador explícito `[A VALIDAR]`. A arquitetura de produto/sistema deve descrever somente o que a documentação sustenta e explicitar a participação de Christian quando confirmada.

## Texto, links e evidências visuais

O corpo aceita Markdown/MDX: parágrafos, listas, tabelas, links, imagens e componentes já registrados em `CustomMDX`. O componente `EvidenceBlock` suporta imagens, screenshots, diagramas, fluxos e links, com os tipos `image`, `screenshot`, `diagram`, `flow` e `link`.

Todos os cases usam inicialmente um bloco sem arquivo ou destino:

```mdx
<EvidenceBlock kind="image" />
```

Esse bloco mostra um placeholder explícito, sem requisitar uma imagem inexistente. Quando uma evidência oficial estiver disponível, usar `src` para um arquivo visual, `href` para um link, e `title` / `caption` para identificação e contexto. Diagramas e fluxos podem ser exportados como imagens locais; não há dependência de Mermaid ou de um serviço proprietário para renderizá-los. Não criar um diagrama de arquitetura por dedução nesta fase.

As imagens aprovadas podem ficar em `public/images/cases/<slug>/` e ser referenciadas por `/images/cases/<slug>/<arquivo>`. O guia descreve a convenção; nenhum ativo de case foi inventado. Evitar links quebrados usando um placeholder sem `href` até confirmar o destino.

MDX é conteúdo executável revisado no Git. Não aceitar uploads públicos nem copiar expressões JavaScript/JSX de fontes desconhecidas. Para cada nova integração de componente MDX, revisar o componente e verificar seu comportamento localmente.

## Validação antes do commit

Executar os scripts de testes, lint, typecheck e build definidos no `package.json`. Os testes podem ser executados diretamente com Node 24: `node --test tests/cases.test.mjs`. O loader também valida o frontmatter e as seções durante a geração das páginas, impedindo que um case malformado seja publicado silenciosamente.

Conferir no navegador a home, a lista, os cinco cases, o índice por âncoras e as evidências nos tamanhos desktop e mobile. Confirmar que não aparecem datas, empresas, fotografias, tecnologias ou resultados herdados dos exemplos. O fluxo permanece desenvolvimento local → QA → commit → GitHub → Netlify, sem deploy nesta fase.
