"use client";

import ColorModeToggle from "./ColorModeToggle";
import Logo from "./Logo";
import { Button } from "./button";

export default function Header() {
  return (
    <header className="h-16 pt-2 pb-2 glass-panel border-b border-border/50 flex items-center justify-between px-6">
      <Logo />
      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="ghost"
          className="glass-button font-semibold px-4 py-2 text-sm hover:shadow-lg transition-all"
        >
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="glass-button font-semibold px-4 py-2 text-sm hover:shadow-lg transition-all"
        >
          <a href="/changelog" target="_blank" rel="noopener noreferrer">
            Changelog
          </a>
        </Button>
        <ColorModeToggle />
      </div>
    </header>
  );
}
