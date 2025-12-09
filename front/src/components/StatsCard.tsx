import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetStats } from "@/service/query/useGetStats";
import {
  ChartLineIcon,
  CircleCheckBig,
  ClipboardList,
  UserPlus,
  Users,
} from "lucide-react";

export const StatsCards = () => {
  const { data, isLoading } = useGetStats();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: (
        <div className="p-3  rounded-lg bg-blue-50">
          <Users />
        </div>
      ),
      color: "text-blue-600",
    },
    {
      title: "New Signups",
      value: data.newUsersToday,
      icon: (
        <div className="p-3  rounded-lg bg-green-50">
          <UserPlus />
        </div>
      ),
      color: "text-green-600",
    },
    {
      title: "Daily Active (DAU)",
      value: data.dailyActiveUsers,
      icon: (
        <div className="p-3  rounded-lg bg-purple-50">
          <ChartLineIcon />
        </div>
      ),
      color: "text-purple-600",
    },
    {
      title: "Total Tests",
      value: data.totalTests,
      icon: (
        <div className="p-3  rounded-lg bg-red-50">
          <ClipboardList />
        </div>
      ),
      color: "text-orange-600",
    },
    {
      title: "Tests Today",
      value: data.completedTests,
      icon: (
        <div className="p-3  rounded-lg bg-green-50">
          <CircleCheckBig />
        </div>
      ),
      color: "text-teal-600",
    },
  ];

  return (
    <div className=" container p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((item) => (
        <Card key={item.title} className="py-4 ">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[17px] font-normal text-gray-500">
              {item.title}
            </CardTitle>
            <span className={`text-2xl ${item.color}`}>{item.icon}</span>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold pb-2">
              {item.value?.toLocaleString()}
              <h1 className="text-xl text-green-500 font-normal mt-2">
                +12.5%
              </h1>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
