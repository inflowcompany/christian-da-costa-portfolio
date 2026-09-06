# Desenvolvimento, QA e preparação para Netlify

Esta fase prepara o projeto para `local development → QA → commit → GitHub → Netlify`.
Nenhum site Netlify foi criado, conectado ou publicado. A compatibilidade está fundamentada na arquitetura do projeto e na documentação oficial; o runtime Netlify ainda não foi homologado.

## Ambiente reproduzível

- Node.js **24.15.0**, registrado em `.nvmrc` e `netlify.toml`; `engines.node` limita a família a 24.x.
- npm **11.17.0**, registrado em `packageManager`, Netlify e GitHub Actions.
- Dependências instaladas pelo `package-lock.json` com `npm ci`.
- Next.js e `@next/mdx` **16.3.4**; React/React DOM **19.2.8**.
- Once UI **1.5.6**, fixado na versão do baseline para preservar o design.

O Next.js 16 requer Node >=20.9.0; o Node 18 informado no README original não atende ao framework instalado. O Node 24 é suportado para builds e Functions no Netlify. [Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16), [Node 24 no Netlify](https://www.netlify.com/changelog/2026-07-07-nodejs-24-default-new-sites/).

```sh
npm ci
npm run dev -- --hostname 127.0.0.1
npm run qa
npm run start -- --hostname 127.0.0.1
```

`start` depende de um build concluído. Use a porta livre escolhida para o ambiente local, por exemplo `--port 3000`. Execute o QA completo novamente após alterações.

## Quality gates

| Comando | Verificação |
| --- | --- |
| `npm run lint` | Biome sobre `src`, sem alterar arquivos |
| `npm run typecheck` | Geração de tipos de rotas Next e TypeScript estrito sem emissão |
| `npm test` | Testes de contrato/editoriais em `tests/*.test.mjs` |
| `npm run build` | Build de produção Next |
| `npm run qa` | Lint → typecheck → testes → build; interrompe no primeiro erro |
| `npm audit` | Revisão atualizada dos advisories do lockfile |

`next lint` foi removido no Next16; o projeto usa Biome diretamente. `next export` também foi removido e não integra o fluxo. O build não executa lint automaticamente. [Migração Next16](https://nextjs.org/docs/app/guides/upgrading/version-16), [remoção do export](https://nextjs.org/docs/14/app/building-your-application/upgrading/version-14).

O workflow `.github/workflows/quality.yml` utiliza checkout, instalação limpa e QA em Linux. Um job separado executa `npm audit --audit-level=high` e falha se houver advisories altos ou críticos; ele não mascara a pendência descrita abaixo. O workflow não possui etapa de publicação nem credenciais de deploy. Sua execução remota depende da definição e envio ao repositório GitHub oficial.

O único override de lint é `security/noDangerouslySetInnerHtml` em `src/app/layout.tsx`: o template inicializa o tema antes da hidratação por um script local estático, com valores de configuração tipada versionados. Não recebe HTML de usuários ou conteúdo MDX nesse ponto. O restante das regras recomendadas continua ativo; caso a origem desses valores mude, revisar essa exceção.

## Auditoria de dependências em 2026-09-06

O baseline tinha **16 advisories: 12 altos e 4 moderados**. A atualização Next 16.1.6→16.3.4, React 19.2.4→19.2.8 e atualizações transitivas compatíveis (`npm audit fix`, sem `--force`) reduziu o relatório para **2 altos, 0 moderados e 0 críticos**. O Next foi mantido dentro da família 16; seu canal estável recebeu correções críticas em agosto. [Suporte Next.js](https://nextjs.org/support-policy), [comunicados oficiais](https://nextjs.org/blog).

Os dois registros restantes correspondem a **uma cadeia**: `@once-ui-system/core@1.5.6 → sharp@0.33.5`, com o advisory [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) de vulnerabilidades herdadas do libvips. O npm propõe Once UI 1.8.4 como correção. Essa troca foi adiada para preservar o design e comportamento do template nesta fase; não foi aplicado override forçando mudança 0.x do sharp. Esses registros são uma pendência de publicação, não uma aprovação de segurança. O job de audit deve ficar vermelho enquanto persistirem; planejar atualização controlada do Once UI ou solução upstream suportada com QA visual e de imagens.

## Configuração Netlify preparada

| Campo | Valor |
| --- | --- |
| Base directory | Raiz do futuro repositório oficial, onde está `package.json` |
| Build command | `npm run qa` |
| Publish directory | `.next` |
| Node/npm | 24.15.0 / 11.17.0 |
| Adaptador | OpenNext automático da Netlify |
| Credenciais obrigatórias nesta fase | Nenhuma |
| Domínio definitivo | `[A VALIDAR]` |
| Repositório GitHub oficial de Christian | `[A VALIDAR]` |

O comando configurado inclui os gates antes de gerar `.next`. Não definir `NODE_ENV=production` antes da instalação: TypeScript e Biome são devDependencies necessárias ao build. A Netlify aceita `.nvmrc`/`NODE_VERSION` e `NPM_VERSION` para selecionar o runtime. [Dependências Netlify](https://docs.netlify.com/build/configure-builds/manage-dependencies/).

A Netlify suporta App Router, Server Components, SSG, SSR, Route Handlers e otimização de imagens com seu adaptador OpenNext. O adaptador é detectado automaticamente; não foi adicionada uma versão fixa de `@netlify/plugin-nextjs`. O projeto usa o modo normal do Next e não exportação estática. [Next.js no Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [configuração de build](https://docs.netlify.com/snippets/frameworks/nextjs-config-values/).

Não há dependência de Vercel Analytics, Vercel Blob, Edge Config ou serviço proprietário de hospedagem. APIs do framework, como `next/image` e `next/og`, não exigem hospedagem Vercel.

## Variáveis, conteúdo e acesso externo

`NEXT_PUBLIC_SITE_URL` representa o domínio público confirmado para URLs canônicas e metadata. Até essa confirmação, usar o fallback local do projeto; não tratar o domínio do template como domínio de Christian. A variável é pública e não deve conter segredo. Consulte `.env.example`.

Não são necessárias credenciais para os placeholders. Não usar o sistema demonstrativo de senha do upstream para evidência privada: ele utiliza verificação de cookie estático e um guard no cliente. Evidências futuras precisam de autorização de publicação; um case público não é armazenamento confidencial.

Os handlers de fetch/proxy de Open Graph herdados aceitavam destinos arbitrários. Recursos desse tipo precisam permanecer desativados ou receber controle de destino antes de publicação. Links e evidências locais não dependem desse proxy.

As fontes `next/font/google` precisam de acesso ao Google durante o build. Caso o gerador Open Graph utilize fontes ou imagens remotas, a requisição também precisa estar disponível no runtime; verificar esse endpoint na futura homologação Netlify. A lista `images.remotePatterns` deve ser limitada a origens de evidências aprovadas.

## Licença e publicação

O template Magic Portfolio é CC BY-NC 4.0, com atribuição obrigatória e restrição de uso comercial. `LICENSE` foi preservado e `NOTICE.md` registra origem e adaptação. O acordo oficial distingue Magic Portfolio do Once UI Core MIT. Confirmar o enquadramento da publicação profissional e eventual licença comercial antes de publicar. [Licença original](https://github.com/once-ui-system/magic-portfolio/blob/main/LICENSE), [acordo Once UI](https://once-ui.com/license-agreement).

## Passos posteriores, sem execução nesta fase

1. Confirmar repositório GitHub de Christian e domínio; manter o upstream identificado para rastrear origem.
2. Validar licença de publicação e documentação oficial de cada case.
3. Repetir QA local, navegação em desktop/mobile e audit das dependências.
4. Revisar diff, fazer commit e enviar ao repositório oficial após sua definição.
5. Com autorização de deployment, conectar o GitHub ao Netlify usando a configuração versionada.
6. Homologar URLs, assets, metadata, 404, links e handlers no runtime Netlify; registrar resultado antes de considerar acesso publicado aprovado.
