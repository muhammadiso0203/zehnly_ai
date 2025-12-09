import { Crown, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserPremium } from "@/service/query/useUserAnalystc";

export function PremiumSubscribers() {
  const { data, isLoading } = useUserPremium();

  if (isLoading) {
    return (
      <div className="container py-6">
        <Card className="w-full mx-auto">
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container py-6">
        <Card className="w-full mx-auto">
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">No premium subscribers found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container py-6">
      <Card className="w-full mx-auto">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-500">
            Premium Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-black border-b">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Premium Since</th>
                  <th className="pb-3 font-medium">Tests Completed</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((subscriber, index:number) => (
                  <tr
                    key={subscriber.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="bg-[#4A53C4] text-white">
                          <AvatarFallback className="bg-[#4A53C4] text-white text-sm font-medium">
                            {getInitials(subscriber.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-foreground">
                              {subscriber.name}
                            </span>
                            <Crown className="h-4 w-4 text-amber-400 fill-amber-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ID: {index + 1}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={
                          subscriber.plan === "Annual" ? "default" : "secondary"
                        }
                        className={
                          subscriber.plan === "Annual"
                            ? "bg-teal-500 hover:bg-teal-600 text-white"
                            : "bg-gray-200 text-black hover:bg-sky-200"
                        }
                      >
                        {subscriber.plan}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{subscriber.premiumSince}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-black font-medium">
                        {subscriber.testsCompleted} tests
                      </span>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {subscriber.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <button className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}