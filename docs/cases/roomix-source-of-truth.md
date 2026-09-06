# Roomix Source of Truth — Project & Product Audit

Data da Auditoria: 6 de setembro de 2026  
Escopo: Ecossistema de Produtos Roomix (Roomix SaaS, Roomix Channel Manager, Roomix Console, Roomix Direct / Booking Generator, Roomix Agents, Roomix Sales Core)  
Finalidade: Embasar a narrativa do case do portfólio profissional de Christian Da Costa (Technical Project Manager / Product & SaaS Project Manager).

---

## 1. Regra de Classificação de Evidências

- **FATO DOCUMENTADO**: Informação extraída diretamente de especificações (PRDs/Specs em `specs/`), arquivos de documentação (`docs/`), arquivos de configuração de ambiente (`cmp_roomix-*.json`, `vercel.json`, `railway.json`), planos de release ou suítes de testes automatizados do projeto.
- **INFERÊNCIA TÉCNICA**: Conclusão lógica derivada da arquitetura de código-fonte, endpoints da API, esquemas do banco de dados (Prisma/PostgreSQL RLS) ou fluxos de integração verificados.
- **A VALIDAR**: Funcionalidades, métricas de negócio, números de clientes ou decisões estratégicas não constantes em código/documentação.

---

## 2. Visão do Produto & Arquitetura dos 6 Componentes do Ecossistema

Roomix é um **Ecossistema de Tecnologia Hospitalar (Hospitality Technology Ecosystem)** operando em arquitetura multi-tenant com segregação por propriedade (`property_id`) e acesso baseado em funções (RBAC).

Os **6 componentes/produtos confirmados** do ecossistema são:

1. **Roomix SaaS**: Core PMS multi-tenant (gestão de reservas, faturamento, automação de mensagens, compliance FNRH Digital / FNSH e requisições comerciais).
2. **Roomix Channel Manager**: Motor de conectividade multi-canal gerenciando sincronização bidirecional com OTAs (Booking.com, Airbnb, Expedia, Hostelworld) com travas de segurança *fail-closed*.
3. **Roomix Console**: Painel de operações de plataforma (Platform Ops), onboarding de propriedades, controle de solicitações comerciais e fila LGPD.
4. **Roomix Direct / Booking Generator**: Motor de reservas diretas para hóspedes com templates premium e o subproduto **Booking Generator** integrado para intake direto de reservas sem intermediários.
5. **Roomix Agents (Jarvis AI)**: Sistema autônomo de agentes de IA integrado a LLMs (OpenAI / NVIDIA NIM Nemotron) para diagnósticos operacionais (`runBookingReadOnlySmoke`) sob guardrails de orçamento.
6. **Roomix Sales Core**: Núcleo de vendas B2B e onboarding comercial de novas propriedades hoteleiras.

---

## 3. Módulo FNRH Digital / FNSH (Esclarecimento de Nomenclatura)

- **FNRH Digital**: Ficha Nacional de Registro de Hóspedes (regulamentação do Ministério do Turismo / FNSH).
- **FNSH**: Ficha Nacional de Sintetização Hoteleira / Sistema de Registro de Hóspedes do Ministério do Turismo.
- O módulo implementa mascaramento de CPF, criptografia de chaves por campo no banco de dados e fila de submissão dry-run para conformidade regulatória sem expor dados de hóspedes.

---

## 4. Escopo de Atuação Comprovado de Christian Da Costa

As competências de Christian no ecossistema Roomix concentram-se em:
- **Discovery & Especificação**: Levantamento de requisitos regulatórios (FNRH Digital / FNSH e LGPD) e elaboração de PRDs/Specs.
- **Mapeamento de Processos**: Definição de máquinas de estado para reservas, cobranças e mensageria.
- **Coordenação de Requisitos e Dependências**: Gestão de entregas, prioridades e validação entre os 6 produtos do ecossistema.
- **Gestão de Riscos & Travas de Segurança**: Definição de travas operacionais (*kill switches* e flags de ativação em staging/produção).
- **QA & Validação**: Estruturação e execução de suítes de testes de integração automatizadas (`fnrh:test`, `lgpd:test`, `billing:test`, `branding:test`, `operational:hardening:test`).
