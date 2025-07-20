import React, { useState } from "react";
import { docsSections } from "./docsData";

export default function DocsSidebar({ onSelect, selected }) {
  const [search, setSearch] = useState("");
  const filteredSections = docsSections
    .map((section) => ({
      ...section,
      articles: section.articles.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.articles.length > 0);

  // 64px header height (py-4)
  return (
    <aside
      className="w-64 border-r bg-muted flex flex-col"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <input
        type="text"
        placeholder="Search docs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="m-4 px-3 py-2 rounded bg-background border"
      />
      <nav className="flex-1 overflow-y-auto">
        {filteredSections.map((section) => (
          <div key={section.id} className="mb-4">
            <div className="px-4 py-2 text-xs font-bold uppercase text-muted-foreground">
              {section.title}
            </div>
            <ul>
              {section.articles.map((article) => (
                <li key={article.id}>
                  <button
                    className={`w-full text-left px-6 py-2 hover:bg-accent rounded ${
                      selected === article.id ? "bg-accent font-semibold" : ""
                    }`}
                    onClick={() => onSelect(article.id)}
                  >
                    {article.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
