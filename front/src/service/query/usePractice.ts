import { api } from "@/config/api";
import type { IPractice } from "@/type/types";
import { useQuery } from "@tanstack/react-query";

export const usePracticeUser = () => {
  return useQuery<IPractice[]>({
    queryKey: ["practice_user"],
    queryFn: () => {
      return api.get("/admin/tests/practice").then((res) => res.data);
    },
  });
};