import { api } from "@/config/api";
import type { IStats } from "@/type/types";
import { useQuery } from "@tanstack/react-query";

export const useGetStats = () => {
  return useQuery<IStats[]>({
    queryKey: ["total_users"],
    queryFn: () => {
      return api.get("/admin/analytics/platform-stats").then((res) => res.data);
    },
  });
};
