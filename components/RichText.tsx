import { RichText as HygraphRichText } from "@graphcms/rich-text-react-renderer";
import type { RichTextContent } from "@graphcms/rich-text-types";
import Image from "next/image";
import type { CmsRichText } from "@/lib/types/cms";

type Props = {
  content: CmsRichText;
};

export default function RichText({ content }: Props) {
  if (content.html && !content.raw?.children?.length) {
    return (
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    );
  }

  return (
    <div className="prose">
      <HygraphRichText
        content={content.raw as RichTextContent}
        renderers={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-5 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold mt-4 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          bold: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-snbackground text-accent text-sm font-mono">
              {children}
            </code>
          ),
          code_block: ({ children }) => (
            <pre className="p-4 rounded-lg bg-snbackground border border-border overflow-x-auto my-4">
              <code className="text-sm font-mono">{children}</code>
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-4 my-4 italic text-text-muted">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-4 ml-2">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-accent/80 transition-colors">
              {children}
            </a>
          ),
          img: ({ src, altText, width, height }) => (
            <figure className="my-6">
              <Image
                src={src ?? ""}
                alt={altText ?? ""}
                width={width ?? 800}
                height={height ?? 450}
                className="rounded-lg w-full h-auto"
              />
              {altText && (
                <figcaption className="text-xs text-text-muted text-center mt-2">
                  {altText}
                </figcaption>
              )}
            </figure>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse border border-border text-sm">
                {children}
              </table>
            </div>
          ),
          table_head: ({ children }) => (
            <thead className="bg-snbackground">{children}</thead>
          ),
          table_body: ({ children }) => <tbody>{children}</tbody>,
          table_row: ({ children }) => (
            <tr className="border-b border-border">{children}</tr>
          ),
          table_cell: ({ children }) => (
            <td className="px-3 py-2 border border-border">{children}</td>
          ),
          table_header_cell: ({ children }) => (
            <th className="px-3 py-2 border border-border font-semibold text-left">
              {children}
            </th>
          ),
        }}
      />
    </div>
  );
}
