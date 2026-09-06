import type { ReactNode } from "react";
import { Column, Media, SmartLink, Text } from "@once-ui-system/core";

type EvidenceBlockProps = {
  kind: "image" | "screenshot" | "diagram" | "flow" | "link" | "text";
  title?: string;
  src?: string;
  href?: string;
  alt?: string;
  caption?: string;
  children?: ReactNode;
};

/** Only add reviewed, approved evidence. Missing sources render nothing to preserve a clean public UI. */
export function EvidenceBlock({ kind, title, src, href, alt, caption, children }: EvidenceBlockProps) {
  if (src && (!src.startsWith("/images/cases/") || src.includes("..") || src.includes("\\"))) {
    throw new Error("Evidence images must use a reviewed local /images/cases/ asset.");
  }
  if (src && !alt) throw new Error("Evidence images require a descriptive alt text.");
  if (href && !/^https:\/\//.test(href)) throw new Error("Evidence links require an approved HTTPS URL.");

  const hasEvidence = kind === "link" ? Boolean(href) : kind === "text" ? Boolean(children) : Boolean(src || children);
  if (!hasEvidence) return null;

  return (
    <Column as="figure" fillWidth margin="0" marginY="16" padding="24" gap="16" border="neutral-alpha-weak" radius="m">
      {title && <Text variant="label-strong-s">{title}</Text>}
      {src && <Media src={src} alt={alt || ""} enlarge radius="m" sizes="(max-width: 768px) 100vw, 768px" />}
      {kind === "link" && href && <SmartLink href={href} suffixIcon="arrowUpRightFromSquare">{title || "View evidence"}</SmartLink>}
      {children}
      {caption && <Text as="figcaption" variant="body-default-s" onBackground="neutral-weak">{caption}</Text>}
    </Column>
  );
}
