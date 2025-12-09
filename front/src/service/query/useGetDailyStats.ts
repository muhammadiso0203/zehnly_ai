import { api } from "@/config/api";
import type { IDailyStats } from "@/type/types";
import { useQuery } from "@tanstack/react-query";

export const useGetDailyStats = () => {
  return useQuery<IDailyStats[]>({
    queryKey: ["total_users"],
    queryFn: () => {
      return api.get("/admin/analytics/daily-stats").then((res) => res.data);
    },
  });
};
