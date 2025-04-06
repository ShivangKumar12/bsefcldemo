// Types for Firebase data models

export interface FirebaseUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  registrationId: string;
  address: string;
  phone: string;
  course: string;
  institute: string;
  enrollmentDate: string;
  graduationDate: string;
  created_at: string;
  updated_at: string;
}

export interface FirebaseLoanDetails {
  id: string;
  userId: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  loanPurpose: string;
  loanStatus: string;
  approvalDate: string;
  disbursementDate: string;
  nextPaymentDate: string;
  totalPaid: number;
  remainingBalance: number;
  created_at: string;
  updated_at: string;
}

export interface FirebaseDisbursementDetails {
  id: string;
  userId: string;
  disbursementId: string;
  disbursementDate: string;
  disbursementAmount: number;
  bankName: string;
  accountNumber: string;
  transactionId: string;
  status: string;
  remarks: string;
  created_at: string;
  updated_at: string;
}

export interface FirebaseRepaymentSchedule {
  id: string;
  userId: string;
  loanId: string;
  paymentNumber: number;
  paymentDate: string;
  paymentAmount: number;
  principalAmount: number;
  interestAmount: number;
  paymentStatus: string;
  remarks: string;
  created_at: string;
  updated_at: string;
}

export interface FirebaseDashboardData {
  profile: FirebaseUser;
  loanDetails: FirebaseLoanDetails;
  disbursementDetails: FirebaseDisbursementDetails;
  repaymentSchedule: FirebaseRepaymentSchedule[];
}