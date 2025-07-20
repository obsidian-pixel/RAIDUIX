"use client";
import React from "react";
import Link from "next/link";

import ReportBugButton from "./ReportBugButton";

import ColorModeToggle from "../ui/ColorModeToggle";

const socials = [
  {
    href: "https://github.com/obsidian-pixel/RAIDUIX",
    icon: "/x-logo-black.png",
    label: "GitHub",
  },
  // Add more socials as needed
];

export default function DocsHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <img
          src="/raiduix_logo_transparent_bg.PNG"
          alt="RAIDUIX Logo"
          className="h-10 w-10 object-contain drop-shadow-lg"
          style={{ background: "transparent" }}
        />
        <span
          className="text-2xl font-extrabold tracking-tight text-blue-900 dark:text-blue-100 ml-2 select-none"
          style={{ letterSpacing: "0.04em" }}
        >
          RAIDUIX
        </span>
        <Link href="/" className="ml-6 text-sm font-medium hover:underline">
          Back to Workspace
        </Link>
        <Link href="/changelog" className="text-sm font-medium hover:underline">
          Changelog
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://x.com/raiduix"
          target="_blank"
          rel="noopener noreferrer"
          className="header-icon-button rounded-lg px-3 py-2 flex items-center justify-center"
          style={{ height: 40 }}
        >
          <img
            src="/x-logo-black.png"
            alt="Twitter/X"
            className="h-6 w-6 object-contain social-icon"
            style={{ display: "block" }}
          />
        </a>
        <a
          href="mailto:dev.raiduix@outlook.com"
          className="header-icon-button rounded-lg px-3 py-2 flex items-center justify-center"
          style={{ height: 40 }}
        >
          <img
            src="/mail-icon-black.png"
            alt="Email"
            className="h-6 w-6 object-contain social-icon"
            style={{ display: "block" }}
          />
        </a>
        <ReportBugButton />
        <ColorModeToggle />
      </div>
    </header>
  );
}
