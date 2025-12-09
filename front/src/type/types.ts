export interface IStats {
  totalUsers: number;
  newUsersToday: number;
  dailyActiveUsers: number;
  totalTests: number;
  completedTests: number;
  premiumUsers: number;
}

export interface IDailyStats {
  date: string;
  newUsers: number;
  completedTests: number;
}

export interface ILeadboard {
  userId: string;
  username: string;
  fullName: string;
  totalScore: number;
  rank: number;
  hasPremium: boolean;
  totalTestsCompleted: number;
  averageScore: number;
}

export interface IPremium {
  id: string;
  name: string;
  email: string;
  plan: string;
  premiumSince: string;
  testsCompleted: number;
  status: string;
}

export interface IPractice {
  id: string;
  title: string;
  type: string;
  level: string;
  status: string;
  questions: number;
  duration: number;
}
