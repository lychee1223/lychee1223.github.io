import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import MarkdownRenderer from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { PdfEmbed } from "@/components/publications/pdf-embed";

interface MarkdownProps {
  source: string;
}

function MarkdownLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <ArrowUpRight
        aria-hidden="true"
        size={12}
        className="publication-mdx-link-icon"
      />{" "}
      {children}
    </a>
  );
}

function isPdfHref(href: string) {
  return /\.pdf(?:[?#].*)?$/i.test(href);
}

function escapeHtmlAttribute(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function parseStandalonePdfEmbed(line: string) {
  const trimmedLine = line.trim();

  if (!trimmedLine.startsWith("[")) {
    return null;
  }

  let labelDepth = 0;
  let labelEndIndex = -1;

  for (let index = 0; index < trimmedLine.length; index += 1) {
    const character = trimmedLine[index];

    if (character === "[") {
      labelDepth += 1;
      continue;
    }

    if (character === "]") {
      labelDepth -= 1;

      if (labelDepth === 0) {
        labelEndIndex = index;
        break;
      }
    }
  }

  if (
    labelEndIndex <= 0 ||
    trimmedLine[labelEndIndex + 1] !== "(" ||
    !trimmedLine.endsWith(")")
  ) {
    return null;
  }

  const title = trimmedLine.slice(1, labelEndIndex);
  const src = trimmedLine.slice(labelEndIndex + 2, -1);

  if (!title || !isPdfHref(src)) {
    return null;
  }

  return { src, title };
}

function preprocessMarkdown(source: string) {
  return source
    .split("\n")
    .map((line) => {
      const parsedEmbed = parseStandalonePdfEmbed(line);

      if (!parsedEmbed) {
        return line;
      }

      return `<iframe data-publication-pdf-embed="true" src="${escapeHtmlAttribute(parsedEmbed.src)}" title="${escapeHtmlAttribute(parsedEmbed.title)}"></iframe>`;
    })
    .join("\n");
}

export function Markdown({ source }: MarkdownProps) {
  return (
    <MarkdownRenderer
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={{
        a: ({ children, href = "" }) => (
          <MarkdownLink href={href}>{children}</MarkdownLink>
        ),
        iframe: ({ node, ...props }) => {
          void node;
          const src = typeof props.src === "string" ? props.src : "";
          const title =
            typeof props.title === "string" ? props.title : undefined;
          const pdfEmbedMarker = (props as Record<string, unknown>)[
            "data-publication-pdf-embed"
          ];

          if (pdfEmbedMarker === "true" && isPdfHref(src)) {
            return <PdfEmbed src={src} title={title} />;
          }

          return <iframe {...props} />;
        },
      }}
    >
      {preprocessMarkdown(source)}
    </MarkdownRenderer>
  );
}
