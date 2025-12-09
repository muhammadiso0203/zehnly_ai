import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTest = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/admin/tests/${id}`).then((res) => res.data)
    }
  })
}