// Usage: <MarkdownArticle content={article.content} />
import React from "react";
import ReactMarkdown from "react-markdown";

import { useAppStore } from "@/stores/useAppStore";
export default function MarkdownArticle({ content }) {
  const { colorMode } = useAppStore();
  return (
    <div className={`markdown-body ${colorMode === "dark" ? "dark" : ""}`}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            return (
              <code
                className={`${className ? className : ""} ${
                  colorMode === "dark" ? "code-dark" : "code-light"
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre({ node, className, children, ...props }) {
            return (
              <pre
                className={`${className ? className : ""} ${
                  colorMode === "dark" ? "pre-dark" : "pre-light"
                }`}
                {...props}
              >
                {children}
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
