import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetTopScores } from "@/service/query/useGetTopScores";
import { Trophy } from "lucide-react";

export const TopBandScores = () => {
  const { data, isLoading, isError } = useGetTopScores();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Top Band Scores - High Achievers</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (isError || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Top Band Scores - High Achievers</CardTitle>
        </CardHeader>
        <CardContent>No data available</CardContent>
      </Card>
    );
  }

  return (
    <div className="container py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="text-[#daa034]">
              <Trophy />
            </div>
            Top Band Scores - High Achievers
          </CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-3 text-left">Rank</th>
                <th className="py-3 text-left">Student Name</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Test Type</th>
                <th className="py-3 text-left">Band Score</th>
                <th className="py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item: any) => (
                <tr
                  key={item.userID}
                  className="border-b last:border-none hover:bg-muted/30 transition"
                >
                  <td className="py-3 font-medium">
                    <div className="flex items-center gap-2">
                      {item.rank <= 3 && (
                        <Trophy
                          className={
                            item.rank === 1
                              ? "text-yellow-500"
                              : item.rank === 2
                              ? "text-gray-400"
                              : "text-amber-700"
                          }
                        />
                      )}
                      <span>#{item.rank}</span>
                    </div>
                  </td>

                  <td className="py-3 font-medium">{item.studentName}</td>

                  <td className="py-3 text-gray-600">{item.email}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.testType === "English"
                          ? "bg-blue-100 text-blue-600"
                          : item.testType === "Math"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.testType}
                    </span>
                  </td>

                  <td className="py-3 font-semibold text-green-600">
                    {item.bandScore}
                  </td>

                  <td className="py-3 text-gray-600">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
