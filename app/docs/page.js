"use client";
import React, { useState } from "react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsContent from "@/components/docs/DocsContent";
import { docsSections } from "@/components/docs/docsData";

export default function DocsPage() {
  // Default to first article
  const firstArticle = docsSections[0]?.articles[0]?.id || "";
  const [selected, setSelected] = useState(firstArticle);
  return (
    <div className="flex w-full h-full min-h-0 max-h-full">
      <DocsSidebar selected={selected} onSelect={setSelected} />
      <div className="flex-1 h-full min-h-0 max-h-full bg-background overflow-hidden">
        <DocsContent selected={selected} />
      </div>
    </div>
  );
}
