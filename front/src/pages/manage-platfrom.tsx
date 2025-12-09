import { DailyLineChart } from "@/components/DailyLineChart";
import { DailyTest } from "@/components/dailyTest";
import { TopBandScores } from "@/components/RankScore";
import { StatsCards } from "@/components/StatsCard";

const ManagePlatfrom = () => {
  return (
    <>
      <StatsCards />
      <div className="container flex items-center justify-center gap-10">
        <DailyLineChart/>
        <DailyTest />
      </div>
      <TopBandScores/>
    </>
  );
};

export default ManagePlatfrom;
