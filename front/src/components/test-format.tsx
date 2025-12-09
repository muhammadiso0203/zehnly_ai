import { useState } from "react";
import { BookOpen, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All Tests", icon: null },
  { id: "english", label: "English Tests", icon: BookOpen },
  { id: "math", label: "Math Tests", icon: Calculator },
];

export function TestFilterTabs() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="container">
      <div className="border border-border w-full p-6 rounded-lg inline-flex gap-1 bg-background">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border",
              activeTab === tab.id
                ? "bg-[#1e293b] text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {tab.icon && <tab.icon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
