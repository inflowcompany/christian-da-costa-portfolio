"use client";

import { Carousel, Column, Flex, Heading, SmartLink, Text } from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  images: string[];
  title: string;
  description: string;
  status: string;
}

export function ProjectCard({ href, images, title, description, status }: ProjectCardProps) {
  return (
    <Column fillWidth gap="m">
      {images.length > 0 && (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((slide) => ({ slide, alt: title }))}
        />
      )}
      <Flex
        s={{ direction: "column" }}
        fillWidth paddingX="s" paddingTop="24" paddingBottom="24" gap="l"
        borderTop="neutral-alpha-weak"
      >
        <Column flex={5} gap="12">
          {status && status !== "[A VALIDAR]" && (
            <Text variant="label-default-xs" onBackground="brand-weak">{status}</Text>
          )}
          {(!status || status === "[A VALIDAR]") && (
            <Text variant="label-default-xs" onBackground="brand-weak">Case Study</Text>
          )}
          <Heading as="h2" wrap="balance" variant="heading-strong-xl">{title}</Heading>
        </Column>
        <Column flex={7} gap="16">
          <Text variant="body-default-s" onBackground="neutral-weak">{description}</Text>
          <SmartLink suffixIcon="arrowRight" href={href} aria-label={`Explore case: ${title}`}>
            <Text variant="body-default-s">Explore case</Text>
          </SmartLink>
        </Column>
      </Flex>
    </Column>
  );
}

