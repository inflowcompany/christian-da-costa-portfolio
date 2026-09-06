# Auditoria inicial — Magic Portfolio

Data: 6 de setembro de 2026. Registro concluído antes das alterações no código do projeto.

## Origem e integridade

- Clone de https://github.com/once-ui-system/magic-portfolio em `outputs/christian-portfolio`.
- Branch original: `main`, acompanhando `origin/main`; checkout limpo após instalação e gates.
- Commit auditado: `c64bdb5cb77275d8ccfe3ca46cf3b4744db883b1` (2026-08-08).
- Template Magic Portfolio 2.3.0. Nenhum trabalho preexistente no diretório da tarefa.
- GitHub de destino de Christian: `[A VALIDAR]`; não confundir o upstream do template com o repositório oficial do novo portfólio.

## Stack e dependências

| Dependência | Declaração | Resolvida no lockfile |
| --- | --- | --- |
| Next.js | ^16.0.10 | 16.1.6 |
| @next/mdx | ^16.0.10 | 16.1.6 |
| React / React DOM | ^19.2.4 / ^19.2.3 | 19.2.4 / 19.2.4 |
| @once-ui-system/core | latest | 1.5.6 |
| next-mdx-remote | ^6.0.0 | 6.0.0 |
| TypeScript | ^5.8.3 | 5.9.3 |
| ESLint | ^9.25.0 | 9.39.0 |
| Biome | ^1.9.4 | 1.9.4 |

Demais dependências declaradas: `@mdx-js/loader`, `classnames`, `cookie`, `gray-matter`, `lint-staged`, `react-icons`, `sass`, `transliteration`; ferramentas e tipos: `@types/cookie`, `@types/node`, `@types/react`, `@types/react-dom`, `tzdata`. Inventário exato e transitivo no `package-lock.json` do commit auditado.

Não há Tailwind, CMS, banco de dados, SDK proprietário da Vercel, backend de negócios ou testes de aplicação. O README recomenda Node 18.17+, mas Next 16 requer Node >=20.9. Ambiente auditado: Windows, Node 24.15.0 e npm 11.17.0.

## Arquitetura e rotas

App Router em `src/app`, layout raiz compartilhado, Server Components e componentes cliente para interações. TypeScript strict, resolução bundler e alias `@/*` para `src/*`.

| Rota | Implementação / comportamento original |
| --- | --- |
| `/` | Home com hero, projeto destacado, blog, demais projetos e newsletter |
| `/about` | Perfil, experiência, estudos, habilidades e índice lateral |
| `/work` | Listagem dos projetos MDX |
| `/work/[slug]` | Case pelo nome do arquivo, `generateStaticParams`, metadata e conteúdo MDX |
| `/blog` | Listagem do blog |
| `/blog/[slug]` | Post MDX, geração estática, compartilhamento |
| `/gallery` | Galeria de imagens configurada em conteúdo |
| `/robots.txt` | Regras e referência ao sitemap |
| `/sitemap.xml` | Rotas habilitadas mais todos os posts e projetos |
| `/api/rss` | Feed dos posts do blog |
| `/api/authenticate` | POST de senha e cookie estático |
| `/api/check-auth` | Verificação do cookie |
| `/api/og/generate` | Imagem social com `next/og`, runtime Node, fonte Google e avatar |
| `/api/og/fetch` | Leitura de metadados de URL fornecida |
| `/api/og/proxy` | Proxy de imagem/URL remota |

Existem 3 projetos de demonstração e 11 posts. `not-found.tsx` fornece a tela 404. O build original gerou 29 páginas/entradas estáticas segundo o contador do Next. Não há Pages Router.

`RouteGuard` atua no cliente: flags de rota e senha não são controle seguro de acesso a documentos. O sitemap original inclui slugs de blog/work mesmo quando suas rotas são desligadas. Rotas opcionais precisam de tratamento no servidor para não publicar conteúdo de demonstração.

## Conteúdo e MDX

- `src/resources/content.tsx`: `person`, `social`, `home`, `about`, `work`, `blog`, `gallery`, `newsletter`.
- `src/resources/once-ui.config.ts`: domínio, flags de rotas, efeitos, tema, fontes, schema, Mailchimp, proteção e compartilhamento.
- `src/types/content.types.ts` e `config.types.ts`: contratos tipados.
- `src/app/work/projects/*.mdx` e `src/app/blog/posts/*.mdx`: arquivos de conteúdo; os diretórios não criam páginas diretamente.
- `src/utils/utils.ts`: leitura síncrona com `fs`, parsing YAML por `gray-matter`, slug pelo basename do arquivo.
- Frontmatter original: `title`, `subtitle`, `publishedAt`, `summary`, `image`, `images`, `tag`, `team`, `link`. Sem validação em runtime. Ordenação por data.
- `src/components/mdx.tsx`: `MDXRemote` RSC com mapa de elementos e componentes Once UI. Blocos de texto, títulos com âncoras, links, imagens, listas, código, tabelas, cards e accordions.
- `blockJS: false` permite expressões JSX; MDX deve ser tratado como código confiável revisado em Git, nunca como upload público.
- Projetos geram metadados, imagem social, JSON-LD, equipe, capa, corpo e projetos relacionados. Data não deve ser inventada só para ordenar cases.

O conteúdo de demonstração descreve Selene Yu, Design Engineer, empresas, estudos e resultados percentuais. Nada disso constitui informação sobre Christian e será retirado da apresentação ativa.

## Componentes reutilizáveis

`Header`, `Footer`, `ThemeToggle`, `Providers`, `RouteGuard`, `ProjectCard`, `work/Projects`, `CustomMDX`, `HeadingLink`, `ScrollToHash`, `about/TableOfContents`, `blog/Posts`, `blog/Post`, `blog/ShareSection`, `gallery/GalleryView` e `Mailchimp`.

Once UI fornece `Column`, `Row`, `Grid`, `Flex`, `Heading`, `Text`, `Button`, `SmartLink`, `Media`, `Carousel`, `Avatar`, `Badge`, `Tag`, `Accordion`, `Table`, `Schema`, `Meta`, `Background` e `RevealFx`. Preservar estes elementos e os tokens evita redesign.

## Configuração visual

- Geist para títulos/corpo/labels; Geist Mono para código, via `next/font/google`.
- Tema system com alternância claro/escuro, neutral gray, brand cyan, accent red.
- Superfície translúcida, borda playful, sólidos contrast/flat, escala 100 e transições Once UI.
- Efeito de pontos ativo; gradiente, grid e linhas desligados na configuração original.
- CSS global do Once UI, tokens, módulos SCSS locais; `custom.css` contém exemplos comentados.
- `.agents` contém regras de composição com primitivas semânticas Once UI. O posicionamento de Christian segue o briefing do usuário.

## Scripts e baseline executado

| Comando | Resultado original |
| --- | --- |
| `npm ci` | PASS; 363 pacotes instalados; lockfile preservado |
| `npm run lint` | FAIL; `next lint` removido no Next 16, interpreta `lint` como diretório |
| `npx tsc --noEmit --incremental false` | PASS |
| `npm run build` | PASS; Next 16.1.6 / Turbopack; compilação 28,7 s |
| `npx biome lint src` | FAIL; diagnósticos preexistentes em código original |
| `npm audit --json` | 16 vulnerabilidades: 12 high e 4 moderate, 0 critical |
| `npm run dev -- --hostname 127.0.0.1 --port 3100` | PASS; pronto em 1.014 ms; home conferida no navegador |

O build alerta sobre root inferido fora do repositório por lockfile ancestral e sobre runtime edge do proxy. O navegador renderizou hero, menu, projetos e footer; registrou um warning LCP de imagem. A inspeção visual confirmou a apresentação original. Não é uma auditoria de acessibilidade completa.

Scripts adicionais: `start=next start`; `export=next export` está obsoleto; `biome-write` formata arquivos. Não há script typecheck/test/CI. `.eslintrc.json` legado referencia configuração Next não instalada. `next build` não executa lint no Next 16.

Logs brutos da execução inicial estão em `work/baseline-*` na tarefa. Um inventário dos resultados será preservado na documentação versionada.

## Deployment e Netlify

`next.config.mjs` aplica `@next/mdx`, pageExtensions, transpile de `next-mdx-remote`, remotePatterns para www.google.com e opções Sass. Sem export estático, engines, versão Node fixada ou `netlify.toml`.

Netlify documenta suporte ao Next 16, App Router, SSG, SSR, Route Handlers e imagens pelo adaptador OpenNext automático. Configuração prevista: build `npm run build`, publish `.next`, Node fixado e lockfile versionado. Não é necessário serviço proprietário da Vercel nem instalar manualmente um plugin Netlify. `next/og` é API do framework.

Build depende de rede para baixar fontes Google. O gerador OG original também depende de fonte Google no runtime e de um domínio correto para avatar. `baseURL` original aponta para o demo do template. Não há variáveis necessárias para páginas públicas; a senha de exemplo deve ficar desativada.

O fluxo será local → QA → commit → GitHub → Netlify. Sem deploy nesta fase, é possível confirmar compatibilidade arquitetural/documentada e build local; homologação do runtime remoto fica pendente.

## Licença e pontos a resolver

`LICENSE` contém **CC BY-NC 4.0**: exige atribuição, link à licença e indicação de adaptações; restringe uso comercial. Não confundir com a licença MIT do Once UI Core. O footer exige preservar o crédito Once UI sem licença Pro. Manter LICENSE integral, crédito visível e documentar as alterações. Validação de licença adequada ao uso pretendido: `[A VALIDAR]` antes da publicação.

Outros achados: proxies OG aceitam destinos arbitrários; autenticação usa cookie estático e guard cliente. Estes recursos opcionais não serão usados na fase 1. Dependências vulneráveis exigem correções controladas e/ou registro preciso de pendências; não executar atualização forçada indiscriminada do design system.

## Decisões para a implementação

1. Manter Next App Router, Once UI, paleta, fontes, menu e ritmo visual.
2. Apresentar Christian como `Technical Project Manager | SaaS, Product & Implementation`.
3. Preparar home, about e work; desligar blog/gallery/newsletter e links pessoais não confirmados.
4. Criar cinco cases MDX, modelo de 17 seções, estado `[A VALIDAR]`, prioridade editorial explícita sem datas inventadas.
5. Roomix primeiro, como ecossistema; apenas nomes conhecidos dos módulos e placeholders para funções/relações.
6. Suportar imagens, screenshots, diagramas/fluxos como evidências visuais locais e links/texto, sem produzir evidências fictícias.
7. Corrigir gates e configuração de build; preservar exemplos fora das rotas ativas.
8. Não preencher narrativa detalhada, métricas, tecnologias ou resultados sem fonte oficial.

## Fontes consultadas

- [Repositório original](https://github.com/once-ui-system/magic-portfolio)
- [Next.js 16: atualização e comandos removidos](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 14: remoção de next export](https://nextjs.org/docs/14/app/building-your-application/upgrading/version-14)
- [Next.js no Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Valores de configuração Netlify](https://docs.netlify.com/snippets/frameworks/nextjs-config-values/)
- [Licença upstream](https://github.com/once-ui-system/magic-portfolio/blob/main/LICENSE)
- [Acordo de licença Once UI](https://once-ui.com/license-agreement)
