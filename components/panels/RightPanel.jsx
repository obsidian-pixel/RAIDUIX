"use client";

import { useState } from "react";
import { Settings, Code } from "lucide-react";
import SettingsTab from "@/components/settings/SettingsTab";
import CodeTab from "@/components/code/CodeTab";

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState("settings");

  const tabs = [
    { id: "settings", name: "Settings", icon: Settings },
    { id: "code", name: "Code", icon: Code },
  ];

  return (
    <div
      className="flex flex-col min-h-0"
      style={{ height: "calc(100vh - 64px)", maxHeight: "calc(100vh - 64px)" }}
    >
      {/* Tab Headers */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-1 p-1 glass-panel rounded-lg">
          {tabs.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-medium flex-1 justify-center
                ${
                  activeTab === id
                    ? "bg-primary/20 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "code" && <CodeTab />}
      </div>
    </div>
  );
}
