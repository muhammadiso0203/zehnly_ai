import { api } from "@/config/api"
import type { ILeadboard } from "@/type/types"
import { useQuery } from "@tanstack/react-query"

export const useGetTopScores = () => {
  return useQuery<ILeadboard>({
    queryKey: ['top-scores'],
    queryFn: () => {
        return api.get('/admin/leaderboard/top-scores').then((res) => res.data)
    }
  }
  )
}
