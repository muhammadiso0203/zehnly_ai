import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useGetStats } from "@/service/query/useGetStats"

const chartConfig = {
  tests: {
    label: "Tests",
    color: "hsl(217, 91%, 60%)",
  },
} satisfies ChartConfig


export const DailyTest = () => {
  const { data, isLoading, isFetching, isError } = useGetStats()
  const isDataLoading = isLoading || isFetching

  // Backend hozir object qaytaradi → mock 7 kunlik data yaratamiz
  const chartData = useMemo(() => {
  if (!data) return []

  const completedTests = (data as any).completedTests || 0
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return days.map((day, i) => ({
    day,
    tests: Math.floor(completedTests / 7) + (i % 2)
  }))
}, [data])


  if (isDataLoading) {
    return (
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Tests Completed (7 Days)</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  if (isError || chartData.length === 0) {
    return (
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Tests Completed (7 Days)</CardTitle>
        </CardHeader>
        <CardContent>No data available</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Tests Completed (7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid
              vertical={false}
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
              allowDecimals={false}
              domain={[0, "dataMax + 5"]}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="tests"
              fill={chartConfig.tests.color}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
