/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'guest' | 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  zalo: string;
  role: UserRole;
  createdAt: string;
}

export type BrokerType = 'Forex' | 'Crypto' | 'Prop Firm';

export interface Broker {
  id: string;
  name: string;
  type: BrokerType;
  logoUrl: string;
  bannerUrl: string;
  referralLink: string;
  referralCode: string;
  cashbackEnabled: boolean;
  cashbackDescription: string;
  cashbackRate: string; // e.g. "Up to $10/lot", "20% fee rebate"
  rating: number; // 1-5
  minDeposit: string;
  maxLeverage: string;
  depositWithdrawalSpeed: string; // e.g. "Instant / 5-15 mins"
  kycRequired: boolean;
  suitableFor: string;
  spreadCommission: string;
  status: 'active' | 'inactive';
  priority: number;
  description: string;
  pros: string[];
  cons: string[];
  faqs: { question: string; answer: string }[];
}

export interface BrokerAccount {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  brokerId: string;
  brokerName: string;
  accountUid: string;
  accountType: string; // e.g. Raw Spread, Standard, Cent, Pro
  verificationStatus: 'pending' | 'approved' | 'rejected';
  note?: string;
  createdAt: string;
  totalLotVolume?: number;
  accruedCashback?: number;
}

export type LeadStatus = 'new' | 'contacted' | 'pending_uid' | 'verified' | 'invalid' | 'converted';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'consultation' | 'course' | 'backcom_contact' | 'community';
  need: string; // Detail of what they need
  status: LeadStatus;
  assignedTo?: string;
  note?: string;
  createdAt: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  content: string; // Full markdown / formatted body
  thumbnail: string;
  seoTitle: string;
  metaDescription: string;
  authorName: string;
  status: 'published' | 'draft';
  createdAt: string;
  views: number;
}

export interface BannerClick {
  id: string;
  brokerId: string;
  brokerName: string;
  userId?: string;
  ip: string;
  userAgent: string;
  referrer: string;
  createdAt: string;
}

export type CashbackTransactionStatus = 'pending' | 'calculated' | 'paid' | 'rejected';

export interface CashbackTransaction {
  id: string;
  userId: string;
  userName: string;
  brokerId: string;
  brokerName: string;
  accountUid: string;
  volumeLot: number;
  grossCommission: number; // e.g., broker paid rebate
  cashbackRatePercent: number; // e.g., 80% to user
  cashbackAmount: number; // USD/VND
  status: CashbackTransactionStatus;
  period: string; // e.g., "May 2026", "Week 21, 2026"
  paidAt?: string;
  note?: string;
}

export type WithdrawalRequestStatus = 'pending' | 'approved' | 'paid' | 'rejected';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number; // in USDT or VND
  currency: 'USDT' | 'VND';
  method: 'Bank Transfer' | 'USDT (TRC20)';
  bankInfo: string; // STK, Bank, Owner or Wallet Address
  status: WithdrawalRequestStatus;
  adminNote?: string;
  createdAt: string;
  paidAt?: string;
}

export interface Course {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  whoShouldTake: string[];
  learnGoals: string[];
  syllabus: { title: string; content: string }[];
  trainerName: string;
  trainerBio: string;
  rating: number;
  reviewsCount: number;
}
