import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import React, { type ComponentProps, type ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import { CASE_SECTIONS } from "@/lib/cases";
import { EvidenceBlock, RoomixEcosystemMap, ProjectManagementFlow, RoomixArchitectureDiagram } from "@/components/cases";
import {
  Heading, HeadingLink, Text, InlineCode, CodeBlock, Accordion, AccordionGroup,
  Table, Feedback, Button, Card, Grid, Row, Column, Icon, Media, SmartLink,
  List, ListItem, Line,
} from "@once-ui-system/core";

function plainText(node: ReactNode): string {
  return React.Children.toArray(node).map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    if (React.isValidElement<{ children?: ReactNode }>(child)) return plainText(child.props.children);
    return "";
  }).join("");
}

function CustomLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <SmartLink href={href} {...props}>{children}</SmartLink>;
  return <a href={href} {...(href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })} {...props}>{children}</a>;
}

function createImage({ alt, src }: ComponentProps<"img">) {
  if (typeof src !== "string" || !src) return null;
  return <Media marginTop="8" marginBottom="16" enlarge radius="m" border="neutral-alpha-medium" sizes="(max-width: 960px) 100vw, 960px" alt={alt || ""} src={src} />;
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  function CustomHeading({ children }: ComponentProps<"h2">) {
    const title = plainText(children);
    const id = CASE_SECTIONS.find((section) => section.title === title)?.id
      || transliterate(title.replace(/&/g, " and "), { lowercase: true, separator: "-" });
    return (
      <HeadingLink marginTop="24" marginBottom="12" as={as} id={id} style={{ scrollMarginTop: "6rem" }}>
        {children}
      </HeadingLink>
    );
  }
  return CustomHeading;
}

function createParagraph({ children }: ComponentProps<"p">) {
  return <Text as="p" style={{ lineHeight: "175%" }} variant="body-default-m" onBackground="neutral-medium" marginTop="8" marginBottom="12">{children}</Text>;
}

function createCodeBlock({ children, ...props }: ComponentProps<"pre">) {
  if (React.isValidElement<{ className?: string; children?: ReactNode }>(children) && children.props.className) {
    const language = children.props.className.replace("language-", "");
    return <CodeBlock marginTop="8" marginBottom="16" codes={[{ code: plainText(children.props.children), language, label: language }]} copyButton />;
  }
  return <pre {...props}>{children}</pre>;
}

function createList(as: "ul" | "ol") {
  return function CustomList({ children }: ComponentProps<"ul">) { return <List as={as}>{children}</List>; };
}

const components: MDXComponents = {
  p: createParagraph,
  h1: createHeading("h1"), h2: createHeading("h2"), h3: createHeading("h3"),
  h4: createHeading("h4"), h5: createHeading("h5"), h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: ({ children }) => <InlineCode>{children}</InlineCode>,
  pre: createCodeBlock,
  ol: createList("ol"), ul: createList("ul"),
  li: ({ children }) => <ListItem marginTop="4" marginBottom="8">{children}</ListItem>,
  hr: () => <Row fillWidth horizontal="center"><Line maxWidth="40" /></Row>,
  Heading, Text, CodeBlock, InlineCode, Accordion, AccordionGroup, Table, Feedback,
  Button, Card, Grid, Row, Column, Icon, Media, SmartLink, EvidenceBlock,
  RoomixEcosystemMap, ProjectManagementFlow, RoomixArchitectureDiagram,
};

export function CustomMDX(props: MDXRemoteProps) {
  // MDX is trusted repository code reviewed before commit, never user-uploaded content.
  return <MDXRemote {...props} options={{ ...props.options, blockJS: false }} components={{ ...components, ...props.components }} />;
}

