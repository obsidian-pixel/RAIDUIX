import React from "react";
import { docsSections } from "./docsData";
import ReactMarkdown from "react-markdown";

export default function DocsContent({ selected }) {
  let article = null;
  for (const section of docsSections) {
    article = section.articles.find((a) => a.id === selected);
    if (article) break;
  }
  if (!article) return <div className="p-8">Select a document to view.</div>;
  return (
    <article
      className="prose dark:prose-invert max-w-5xl mx-auto p-8 pb-20 h-full overflow-y-auto article-scrollbar"
      style={{
        minHeight: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
      }}
    >
      <div className="markdown-body">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}
