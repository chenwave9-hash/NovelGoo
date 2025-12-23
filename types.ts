
export interface Novel {
  id: string;
  title: string;
  author: string;
  cover: string;
  summary: string;
  category: string;
  rating: number;
  chapters: Chapter[];
  views: string;
  status: 'Ongoing' | 'Completed';
  isApproved?: boolean;
  userId?: string;
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface UserState {
  id: string;
  username: string;
  email: string;
  password?: string;
  bio: string;
  points: number;
  referralCode: string;
  referredBy?: string; 
  referralBonusProcessed?: boolean; 
  hasWithdrawn: boolean;
  invitedCount: number;
  readingTimeToday: number;
  totalEarnings: number;
  library: string[];
  isAdmin?: boolean;
  avatar: string;
}

export type PaymentMethod = 'DANA' | 'OVO' | 'GOPAY';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  username: string;
  amount: number;
  method: PaymentMethod;
  phoneNumber: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}
