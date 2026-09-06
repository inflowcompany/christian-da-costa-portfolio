import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Christian",
  lastName: "Da Costa",
  name: "Christian Da Costa",
  role: "Technical Project Manager | SaaS • Product • Implementation • AI",
  avatar: "",
  email: "",
  location: "America/Sao_Paulo",
  languages: ["Português (Nativo)", "Espanhol (Bilíngue)", "Inglês (Limited Working)"],
  locale: "pt-BR",
};

const newsletter: Newsletter = { display: false, title: "", description: "" };

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/christian-da-costa-3881a6303/",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/api/og/generate",
  label: "Home",
  title: `${person.name} — Technical Project Manager`,
  description: "Transformo problemas operacionais complexos em projetos de tecnologia estruturados — de discovery e requisitos até entrega, QA e evolução.",
  headline: "Technical Project Manager",
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong>Roomix Ecosystem</strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text onBackground="brand-medium">Hospitality Technology</Text>
      </Row>
    ),
    href: "/work/roomix",
  },
  subline: (
    <>
      <Text as="span" onBackground="neutral-strong">Christian Da Costa</Text>
      <br />
      SaaS • Product • Implementation • AI
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre",
  title: "Sobre Christian Da Costa",
  description: "Technical Project Manager especialista em ecossistemas SaaS, implementação de produtos, gestão de requisitos, QA e inteligência artificial aplicada.",
  tableOfContent: { display: true, subItems: false },
  avatar: { display: false },
  calendar: { display: false, link: "" },
  intro: {
    display: true,
    title: "Perfil Profissional",
    description: (
      <>
        <Text as="p" variant="body-default-l">
          Atuo na interseção entre negócio, operação, cliente, produto e tecnologia. Minha trajetória evoluiu de Customer Experience e Implantação para liderança de projetos de produto e gestão técnica (Technical Project Management).
        </Text>
        <Text as="p" variant="body-default-m" onBackground="neutral-weak">
          Especialista em conduzir ecossistemas SaaS multiproduto, mapear requisitos de negócios e regulatórios (como FNRH/MinTur e LGPD), definir arquiteturas funcionais, estabelecer critérios de aceite e coordenar a execução técnica sob travas de segurança em produção.
        </Text>
        <Text as="p" variant="body-default-s" onBackground="neutral-weak">
          Utilizo agentes de IA e ferramentas modernas para otimizar workflows de desenvolvimento, diagnósticos operacionais de conectividade e automação de processos.
        </Text>
      </>
    ),
  },
  work: {
    display: true,
    title: "Trajetória Profissional",
    experiences: [
      {
        company: "Inflowork",
        timeframe: "2024 — Presente",
        role: "Technical Project Manager & Product Delivery",
        achievements: [
          "Estruturação e coordenação de entregas do ecossistema multiproduto Roomix (PMS, Channel Manager, Console, Direct, Agents, Sales Core).",
          "Mapeamento de requisitos regulatórios de FNRH Digital (Ministério do Turismo) e governança de privacidade LGPD.",
          "Definição de regras de segurança fail-closed, kill switches e suítes automatizadas de testes de integração e QA.",
          "Orquestração do produto Inflowork Canvas Workspace OS e sistemas internos de inteligência operacional.",
        ],
        images: [],
      },
      {
        company: "HQBeds",
        timeframe: "jul/2024 — jul/2026",
        role: "International SaaS Implementation Specialist & Project Manager",
        achievements: [
          "Condução de projetos de implantação de software SaaS para clientes no Brasil, Argentina, Peru, México e Estados Unidos.",
          "Gestão de requisitos operacionais, onboarding de propriedades, parametrização de sistema, gestão de SLAs e mitigações de risco.",
          "Interface direta entre Cliente, Produto, Suporte, Operações e Equipes Técnicas durante todo o pipeline até o Go-Live.",
          "Treinamento de equipes hoteleiras internacionais, acompanhamento de adoção e garantia de retenção pós-implantação.",
        ],
        images: [],
      },
      {
        company: "Customer Experience & Operations Leadership",
        timeframe: "Trajetória de Evolução",
        role: "CX, Implementation & Operations Lead",
        achievements: [
          "Liderança de atendimento ao cliente, suporte técnico especializado e onboarding de novos usuários.",
          "Mapeamento de jornadas de clientes, redução de tempo de implantação e estruturação de bases de conhecimento.",
          "Evolução contínua do perfil operacional para gestão de produtos, análise de negócios e projetos de tecnologia.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false,
    title: "Formação",
    institutions: [],
  },
  technical: {
    display: true,
    title: "Áreas de Atuação",
    skills: [
      {
        title: "Gestão de Projetos & Entrega de Produtos",
        description: "Estruturação de roadmaps, alinhamento de stakeholders, gestão de escopo, mitigações de riscos e entregas multiproduto.",
        tags: ["Project Management", "Product Delivery", "SaaS", "Roadmap Management", "Stakeholder Management", "Risk & Dependency Management"].map((name) => ({ name })),
      },
      {
        title: "Análise de Negócios & Mapeamento",
        description: "Levantamento de requisitos, arquitetura funcional, documentação técnica, mapeamento de processos e conformidade regulatória (FNRH/LGPD).",
        tags: ["Business Analysis", "Requirements Gathering", "Process Mapping", "Scope Definition", "Documentation"].map((name) => ({ name })),
      },
      {
        title: "Implantação, QA & Automações com IA",
        description: "Onboarding de clientes internacionais, definição de critérios de aceite, suítes de testes de QA e automações orientadas a IA.",
        tags: ["QA & Acceptance Testing", "Implementation", "AI-assisted Development"].map((name) => ({ name })),
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Cases",
  title: "Projetos & Ecossistemas",
  description: "Cases de gestão de projetos, produtos SaaS, arquitetura funcional e implantação conduzidos por Christian Da Costa.",
};

const blog: Blog = { path: "/blog", label: "Artigos", title: "Artigos", description: "" };
const gallery: Gallery = { path: "/gallery", label: "Galeria", title: "Galeria", description: "", images: [] };

export { person, social, newsletter, home, about, blog, work, gallery };
