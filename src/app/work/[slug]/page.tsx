import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_SECTIONS, getCases, getCase } from "@/lib/cases";
import { Meta, Column, Heading, Text, SmartLink, Row, Line, Media } from "@once-ui-system/core";
import { baseURL, work } from "@/resources";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";

export function generateStaticParams() {
  return getCases().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getCase(slug);
  if (!post) notFound();
  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getCase(slug);
  if (!post) notFound();
  return (
    <Column as="article" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">All cases</SmartLink>
        <Text variant="label-default-s" onBackground="brand-weak">{post.metadata.status}</Text>
        <Heading as="h1" variant="display-strong-m" wrap="balance">{post.metadata.title}</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">{post.metadata.summary}</Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Case in preparation. Responsibilities, delivery details and results await official documentation.
        </Text>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt={post.metadata.title} src={post.metadata.images[0]} />
      )}
      {post.metadata.modules.length > 0 && (
        <Column fillWidth gap="16" padding="24" border="neutral-alpha-weak" radius="m">
          <Heading as="h2" variant="heading-strong-l">Ecosystem structure</Heading>
          <Text onBackground="neutral-weak">
            Known products and modules. Functional descriptions and relationships: [A VALIDAR].
          </Text>
          <Column as="ul" gap="12">
            {post.metadata.modules.map((module) => (
              <Text as="li" key={module.name}>{module.name} — {module.description}</Text>
            ))}
          </Column>
          <Text variant="body-default-s" onBackground="neutral-weak">Additional modules: [A VALIDAR].</Text>
        </Column>
      )}
      <Column as="nav" aria-label="Case sections" fillWidth gap="12" paddingY="24" borderBottom="neutral-alpha-weak">
        <Text variant="label-strong-s">In this case</Text>
        <Row wrap gap="16">
          {CASE_SECTIONS.map((section) => (
            <SmartLink key={section.id} href={`#${section.id}`}>
              <Text variant="body-default-s">{section.title}</Text>
            </SmartLink>
          ))}
        </Row>
      </Column>
      <Column maxWidth="s" gap="8">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="32" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl">More cases</Heading>
        <Projects exclude={[post.slug]} range={[1, 2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}

