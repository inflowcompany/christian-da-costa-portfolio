import { Badge, Column, Grid, Icon, Row, Tag, Text } from "@once-ui-system/core";

type ProductCardProps = {
  name: string;
  role: string;
  domain?: string;
  status: string;
  modules: string[];
  icon: string;
};

const PRODUCTS: ProductCardProps[] = [
  {
    name: "Roomix SaaS",
    role: "Core PMS & Hotel Operations",
    domain: "app.roomix.com.br",
    status: "Production / Staging",
    modules: ["Reservas & Calendário", "FNRH Digital (MinTur)", "Billing & Faturas", "Automacão de Mensagens", "Gateway de Pagamentos"],
    icon: "grid",
  },
  {
    name: "Roomix Channel Manager",
    role: "OTA Connectivity & Sync Engine",
    domain: "managerroomix.com.br",
    status: "Production / Staging",
    modules: ["Booking.com (Real Onboarding)", "Airbnb (Discovery)", "Expedia (Discovery)", "Hostelworld (Discovery)", "Outbox Worker & Safety Guards"],
    icon: "globe",
  },
  {
    name: "Roomix Console",
    role: "Platform Ops & Account Management",
    domain: "Internal Platform",
    status: "Staging / Internal",
    modules: ["Onboarding de Propriedades", "Gestão de Solicitações", "Fila LGPD & Consentimento", "Controle de Entitlements", "Scheduler Drains"],
    icon: "shield",
  },
  {
    name: "Roomix Direct",
    role: "Direct Booking Engine",
    domain: "Direct Web Engine",
    status: "Staging / Premium",
    modules: ["Motor de Reservas Hóspede", "Templates Premium", "Vouchers & Venda Direta", "Pagamento Manual & Direct", "Regras de Tarifas"],
    icon: "sparkles",
  },
  {
    name: "Roomix Agents",
    role: "Autonomous AI System (Jarvis)",
    domain: "Agents Service / Vercel",
    status: "Staging / NVIDIA NIM",
    modules: ["NVIDIA NIM & OpenAI LLM", "Diagnósticos de Smoke", "Budget Guardrails (Nemotron)", "Heartbeat & Cron Tasks", "Tool Dispatch Segura"],
    icon: "cpu",
  },
];

export function RoomixEcosystemMap() {
  return (
    <Column fillWidth gap="20" padding="24" border="brand-alpha-medium" background="neutral-alpha-weak" radius="l" marginY="24">
      <Row fillWidth horizontal="between" vertical="center" wrap gap="12">
        <Column gap="4">
          <Row gap="8" vertical="center">
            <Icon name="grid" onBackground="brand-medium" />
            <Text variant="heading-strong-l">Roomix Hospitality Ecosystem</Text>
          </Row>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Visão arquitetural multi-produto com gestão de dependências e sincronização em tempo real.
          </Text>
        </Column>
        <Badge>Multi-Tenant / 3-Tier Architecture</Badge>
      </Row>

      <Grid columns="1" gap="16">
        {PRODUCTS.map((prod) => (
          <Column key={prod.name} padding="16" border="neutral-medium" background="surface" radius="m" gap="12">
            <Row fillWidth horizontal="between" vertical="center" wrap gap="8">
              <Row gap="8" vertical="center">
                <Icon name={prod.icon} onBackground="brand-strong" />
                <Text variant="heading-strong-m">{prod.name}</Text>
                <Tag size="s">{prod.role}</Tag>
              </Row>
              <Row gap="8" vertical="center">
                {prod.domain && <Tag size="s">{prod.domain}</Tag>}
                <Badge>{prod.status}</Badge>
              </Row>
            </Row>
            <Row wrap gap="8">
              {prod.modules.map((mod) => (
                <Tag key={mod} size="s" prefixIcon="chevronRight">
                  {mod}
                </Tag>
              ))}
            </Row>
          </Column>
        ))}
      </Grid>
    </Column>
  );
}
