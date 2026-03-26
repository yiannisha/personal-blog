"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type MarkdownContentProps = {
  content: string;
};

function isInternalLink(href: string) {
  return href.startsWith("/");
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="feed-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          a: ({ href, children, ...props }) => {
            if (!href) {
              return <a {...props}>{children}</a>;
            }

            if (isInternalLink(href)) {
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} target="_blank" rel="noreferrer" {...props}>
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
