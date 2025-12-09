import React, { useMemo } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetDailyStats } from "@/service/query/useGetDailyStats"

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(262, 83%, 58%)",
  },
} satisfies ChartConfig

export const DailyLineChart: React.FC = () => {
  const { data, isLoading, isError } = useGetDailyStats()
  
  const isDataLoading = isLoading

  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return []

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    return data.map((d, i) => ({
      day: days[i % 7],
      users: d.newUsers || 0,
    }))
  }, [data])

  const maxValue = chartData.length
    ? Math.max(...chartData.map(d => d.users))
    : 0

  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">
          Daily Active Users
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isDataLoading && <div>Loading...</div>}
        {!isDataLoading && (isError || chartData.length === 0) && (
          <div>No data available</div>
        )}

        {!isDataLoading && chartData.length > 0 && (
          <ChartContainer config={chartConfig}>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="0"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 14 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 14 }}
                    domain={[0, maxValue + 100]}
                    allowDecimals={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={chartConfig.users.color}
                    strokeWidth={2}
                    dot={{ fill: chartConfig.users.color, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}