import { BookOpen, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePracticeUser } from "@/service/query/usePractice";
import { useDeleteTest } from "@/service/mutation/useDeleteTest";
import { toast } from "sonner";

interface Test {
  id: string;
  title: string;
  type: string;
  level: string;
  status: string;
  questions: number;
  duration: number;
}

export const TestCard = () => {
  const { data, isLoading, refetch } = usePracticeUser();

  const deleteTeacherMutation = useDeleteTest();

  const handleDelete = (id: string) => {
    deleteTeacherMutation.mutate(id, {
      onSuccess: () => {
        refetch();
        toast("Malumot o`chirildi", {
          position: "bottom-right",
        });
      },
      onError: (error) => {
        console.error("Error deleting teacher:", error);
        toast("Bu o`qituvchining guruhlari borligi sababli o`chirilmadi!", {
          position: "bottom-right",
        });
      },
    });
  };

  return (
    <div className="container w-full py-6">
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4">
            {data?.map((test: Test) => (
              <div
                key={test.id}
                className="bg-[#f8fafc] rounded-xl p-5 border border-border"
              >
                <h3 className="text-base font-semibold text-foreground mb-3">
                  {test.title}
                </h3>

                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-[#1e293b] text-white text-xs font-medium px-2.5 py-1 rounded">
                    <BookOpen className="h-3.5 w-3.5" />
                    {test.type}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground bg-[#e2e8f0] px-2.5 py-1 rounded">
                    {test.level}
                  </span>
                  <span className="text-xs font-medium text-white bg-[#1e293b] px-2.5 py-1 rounded">
                    {test.status}
                  </span>
                </div>

                <div className="flex items-center gap-8 mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Questions
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {test.questions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-blue-600">
                      {test.duration} min
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Attempts
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      1740
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(test.id)}
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
