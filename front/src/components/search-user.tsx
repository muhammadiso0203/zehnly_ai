import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PremiumUsersSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 bg-gray-100 rounded-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
