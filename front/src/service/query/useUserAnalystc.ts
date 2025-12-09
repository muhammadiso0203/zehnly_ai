import { api } from "@/config/api"
import type { IPremium } from "@/type/types"
import { useQuery } from "@tanstack/react-query"

export const useUserPremium = () => {
  return useQuery<IPremium[]>({
    queryKey: ['user_analytics'],
    queryFn: () => {
        return api.get('/admin/users/premium').then((res) => res.data)
    }
  }
  )
}
