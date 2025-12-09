import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestManagementHeader() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Test Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and manage English and Math tests
          </p>
        </div>
        <Button className="bg-[#1e293b] hover:bg-[#334155] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Test
        </Button>
      </div>
    </div>
  );
}
