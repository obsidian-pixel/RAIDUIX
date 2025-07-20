import DocsHeader from "@/components/docs/DocsHeader";

export default function DocsLayout({ children }) {
  return (
    <div className="min-h-screen max-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <DocsHeader />
      <main className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
