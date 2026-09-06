import { Badge, Column, Grid, Icon, Row, Tag, Text } from "@once-ui-system/core";

export function RoomixArchitectureDiagram() {
  return (
    <Column fillWidth gap="20" padding="24" border="brand-alpha-medium" background="neutral-alpha-weak" radius="l" marginY="24">
      <Row fillWidth horizontal="between" vertical="center" wrap gap="12">
        <Row gap="8" vertical="center">
          <Icon name="grid" onBackground="brand-medium" />
          <Text variant="heading-strong-l">Arquitetura de Produto & Sincronização de Dados</Text>
        </Row>
        <Badge>Multi-System Integration</Badge>
      </Row>

      <Text variant="body-default-s" onBackground="neutral-weak">
        Fluxo bidirecional entre os sistemas do ecossistema com isolamento de responsabilidade e travas de segurança em produção.
      </Text>

      <Grid columns="1" gap="16">
        {/* Layer 1: Core PMS */}
        <Column padding="16" border="neutral-medium" background="surface" radius="m" gap="8">
          <Row horizontal="between" vertical="center">
            <Text variant="heading-strong-m">1. Roomix SaaS (Source of Truth)</Text>
            <Badge>Central Inventory & PMS</Badge>
          </Row>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Centraliza propriedades, inventário de quartos, reservas, regras de tarifação, cadastro de hóspedes e consentimentos LGPD.
          </Text>
        </Column>

        {/* Sync Arrow */}
        <Row horizontal="center" vertical="center" gap="8">
          <Icon name="chevronDown" onBackground="brand-medium" />
          <Text variant="label-default-s" onBackground="brand-medium">Outbox Pattern & Event Bus (Idempotent)</Text>
          <Icon name="chevronDown" onBackground="brand-medium" />
        </Row>

        {/* Layer 2: Distribution & Agents */}
        <Grid columns="2" s={{ columns: "1" }} gap="16">
          <Column padding="16" border="neutral-medium" background="surface" radius="m" gap="8">
            <Text variant="heading-strong-s">2. Roomix Channel Manager</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Sincroniza tarifas e disponibilidade com OTAs (Booking.com, Airbnb, Expedia).
            </Text>
            <Row wrap gap="4">
              <Tag size="s">KillSwitch Guards</Tag>
              <Tag size="s">Read-Only Smoke Tests</Tag>
            </Row>
          </Column>

          <Column padding="16" border="neutral-medium" background="surface" radius="m" gap="8">
            <Text variant="heading-strong-s">3. Roomix Direct & Agents</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Venda direta via motor próprio + diagnósticos autônomos por agentes Jarvis AI.
            </Text>
            <Row wrap gap="4">
              <Tag size="s">Voucher Direct</Tag>
              <Tag size="s">NVIDIA NIM / OpenAI</Tag>
            </Row>
          </Column>
        </Grid>

        {/* Layer 3: Security & Fail-Closed */}
        <Column padding="16" border="neutral-medium" background="neutral-alpha-weak" radius="m" gap="8">
          <Row gap="8" vertical="center">
            <Icon name="shield" onBackground="accent-medium" />
            <Text variant="heading-strong-s">Mecanismos de Segurança Fail-Closed em Produção</Text>
          </Row>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Ativação de OTAs e Gateways de Pagamento exige flags duplas de produção. Na ausência de chaves explícitas, o sistema opera em modo simulação segura sem efetuar chamadas externas reais.
          </Text>
        </Column>
      </Grid>
    </Column>
  );
}
