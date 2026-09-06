import { Badge, Column, Grid, Icon, Row, Text } from "@once-ui-system/core";

type FlowStep = {
  stage: string;
  label: string;
  description: string;
  evidence: string;
  icon: string;
};

const STEPS: FlowStep[] = [
  {
    stage: "01",
    label: "DISCOVER",
    description: "Levantamento de necessidades operacionais e regulatórias com propriedades hoteleiras (FNRH/MinTur, LGPD, automações).",
    evidence: "Specs de conformidade (specs/001-fnrh-digital...)",
    icon: "search",
  },
  {
    stage: "02",
    label: "DEFINE",
    description: "Tradução de regras operacionais em especificações de produto (PRDs), schemas tipados e requisitos não-funcionais.",
    evidence: "Documentos de arquitetura funcional em docs/",
    icon: "edit",
  },
  {
    stage: "03",
    label: "SCOPE",
    description: "Faseamento modular entre os sistemas (SaaS, Console, Channel Manager, Direct, Agents) para mitigar riscos de acoplamento.",
    evidence: "Matriz de escopo por produto no repository state",
    icon: "grid",
  },
  {
    stage: "04",
    label: "PLAN",
    description: "Definição de milestones, gates de staging, cronogramas de entrega e critérios rigorosos de aceite.",
    evidence: "Plano de release e readiness launch (specs/001...)",
    icon: "calendar",
  },
  {
    stage: "05",
    label: "BUILD",
    description: "Coordenação de execução técnica multiproduto, acompanhamento de commits, pull requests e integrações com LLM (Jarvis).",
    evidence: "Workflows de desenvolvimento e outbox queues",
    icon: "code",
  },
  {
    stage: "06",
    label: "QA",
    description: "Execução de testes funcionais automatizados, validação de permissões RBAC, isolamento multi-tenant e mascaramento LGPD.",
    evidence: "Suítes de testes fnrh, lgpd, billing, branding e qa",
    icon: "shield",
  },
  {
    stage: "07",
    label: "RELEASE",
    description: "Homologação controlada em staging com travas de segurança (kill switches) ativas para evitar envios ou cobranças acidentais.",
    evidence: "Ambientes Vercel/Railway com fail-closed guards",
    icon: "rocket",
  },
  {
    stage: "08",
    label: "EVOLVE",
    description: "Análise de logs de produção, diagnósticos autônomos (Jarvis Agent) e refatoração contínua do ecossistema.",
    evidence: "Monitor FNRH, audit logs e diagnósticos de agentes",
    icon: "refresh",
  },
];

export function ProjectManagementFlow() {
  return (
    <Column
      fillWidth
      gap="16"
      padding="24"
      border="brand-alpha-medium"
      background="neutral-alpha-weak"
      radius="l"
      marginY="24"
      style={{ maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }}
    >
      <Row fillWidth horizontal="between" vertical="center" wrap gap="12" style={{ minWidth: 0 }}>
        <Row gap="8" vertical="center" wrap style={{ minWidth: 0 }}>
          <Icon name="gitBranch" onBackground="brand-medium" />
          <Text variant="heading-strong-l" wrap="balance">
            Project Management View — Execution Workflow
          </Text>
        </Row>
        <Badge>8-Stage PM Lifecycle</Badge>
      </Row>

      <Text variant="body-default-s" onBackground="neutral-weak">
        Metodologia de gestão aplicada por Christian Da Costa para estruturar, validar e entregar o ecossistema Roomix.
      </Text>

      <Grid columns="1" gap="12" fillWidth style={{ minWidth: 0 }}>
        {STEPS.map((step) => (
          <Row
            key={step.label}
            fillWidth
            padding="16"
            border="neutral-medium"
            background="surface"
            radius="m"
            gap="16"
            vertical="center"
            wrap
            style={{ minWidth: 0, boxSizing: "border-box" }}
          >
            <Row gap="12" vertical="center" wrap style={{ minWidth: 0 }}>
              <Badge>{step.stage}</Badge>
              <Text variant="heading-strong-m">{step.label}</Text>
            </Row>
            <Column flex={1} gap="4" style={{ minWidth: 0, wordBreak: "break-word" }}>
              <Text variant="body-default-s">{step.description}</Text>
              <Text variant="label-default-s" onBackground="brand-weak" style={{ wordBreak: "break-word" }}>
                Evidência: {step.evidence}
              </Text>
            </Column>
          </Row>
        ))}
      </Grid>
    </Column>
  );
}
