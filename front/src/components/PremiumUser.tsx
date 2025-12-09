import { useGetStats } from "@/service/query/useGetStats"
import { Crown } from "lucide-react"

export function PremiumUsers() {
    const {data, isLoading} = useGetStats()
  return (
    <div className="container p-8 flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Premium Users</h1>
        <p className="text-sm text-muted-foreground">Manage users with premium subscriptions</p>
      </div>
      <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md border border-amber-200">
        <Crown className="h-4 w-4" />
        <span className="text-sm font-medium">{data?.premiumUsers} Premium Members</span>
      </div>
    </div>
  )
}