import { 
  FirebaseUser, 
  FirebaseLoanDetails, 
  FirebaseDisbursementDetails, 
  FirebaseRepaymentSchedule,
  FirebaseDashboardData,
  CreateFirebaseUser
} from '../types/firebase';

// Sample user data
const sampleUser: FirebaseUser = {
  id: "sample-user-123",
  username: "shivangkumarcgc@gmail.com",
  fullName: "Shivang Kumar",
  email: "shivangkumarcgc@gmail.com",
  mobile: "9876543210",
  registrationId: "STU987654",
  address: "123 Main Street, Patna, Bihar",
  phone: "9876543210",
  course: "B.Tech Computer Science",
  institute: "National Institute of Technology, Patna",
  enrollmentDate: "2023-07-15",
  graduationDate: "2027-06-30",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Sample loan details
const sampleLoanDetails: FirebaseLoanDetails = {
  id: "loan-123",
  userId: "sample-user-123",
  loanAmount: 400000,
  loanTerm: 60,
  interestRate: 7.5,
  monthlyPayment: 8000,
  totalInterest: 80000,
  loanPurpose: "Higher Education",
  loanStatus: "APPROVED",
  approvalDate: "2023-08-15",
  disbursementDate: "2023-08-30",
  nextPaymentDate: "2028-09-30",
  totalPaid: 40000,
  remainingBalance: 440000,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Sample disbursement details
const sampleDisbursementDetails: FirebaseDisbursementDetails = {
  id: "disb-123",
  userId: "sample-user-123",
  disbursementId: "DISB54321",
  disbursementDate: "2023-08-30",
  disbursementAmount: 400000,
  bankName: "State Bank of India",
  accountNumber: "XXXX6789",
  transactionId: "TXN123456",
  status: "COMPLETED",
  remarks: "First disbursement for academic year 2023-24",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Sample repayment schedule
const sampleRepaymentSchedule: FirebaseRepaymentSchedule[] = [
  {
    id: "repay-1",
    userId: "sample-user-123",
    loanId: "loan-123",
    paymentNumber: 1,
    paymentDate: "2028-05-15",
    paymentAmount: 8000,
    principalAmount: 6500,
    interestAmount: 1500,
    paymentStatus: "PAID",
    remarks: "Installment 1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "repay-2",
    userId: "sample-user-123",
    loanId: "loan-123",
    paymentNumber: 2,
    paymentDate: "2028-06-15",
    paymentAmount: 8000,
    principalAmount: 6600,
    interestAmount: 1400,
    paymentStatus: "PAID",
    remarks: "Installment 2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "repay-3",
    userId: "sample-user-123",
    loanId: "loan-123",
    paymentNumber: 3,
    paymentDate: "2028-07-15",
    paymentAmount: 8000,
    principalAmount: 6700,
    interestAmount: 1300,
    paymentStatus: "PENDING",
    remarks: "Installment 3",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "repay-4",
    userId: "sample-user-123",
    loanId: "loan-123",
    paymentNumber: 4,
    paymentDate: "2028-08-15",
    paymentAmount: 8000,
    principalAmount: 6800,
    interestAmount: 1200,
    paymentStatus: "UPCOMING",
    remarks: "Installment 4",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "repay-5",
    userId: "sample-user-123",
    loanId: "loan-123",
    paymentNumber: 5,
    paymentDate: "2028-09-15",
    paymentAmount: 8000,
    principalAmount: 6900,
    interestAmount: 1100,
    paymentStatus: "UPCOMING",
    remarks: "Installment 5",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

class MockDataService {
  // Authentication methods
  async registerUser(email: string, password: string, userData: CreateFirebaseUser) {
    console.log('MockDataService: Registering user', { email, userData });
    return sampleUser;
  }
  
  async loginUser(email: string, password: string) {
    console.log('MockDataService: Logging in user', { email });
    return sampleUser;
  }
  
  async logoutUser() {
    console.log('MockDataService: Logging out user');
    return true;
  }
  
  async getCurrentUser() {
    console.log('MockDataService: Getting current user');
    return sampleUser;
  }
  
  // Dashboard data methods
  async getUserProfile(userId: string): Promise<FirebaseUser | null> {
    console.log('MockDataService: Getting user profile', { userId });
    return sampleUser;
  }
  
  async getLoanDetails(userId: string): Promise<FirebaseLoanDetails | null> {
    console.log('MockDataService: Getting loan details', { userId });
    return sampleLoanDetails;
  }
  
  async getDisbursementDetails(userId: string): Promise<FirebaseDisbursementDetails | null> {
    console.log('MockDataService: Getting disbursement details', { userId });
    return sampleDisbursementDetails;
  }
  
  async getRepaymentSchedule(userId: string): Promise<FirebaseRepaymentSchedule[]> {
    console.log('MockDataService: Getting repayment schedule', { userId });
    return sampleRepaymentSchedule;
  }
  
  async getDashboardData(userId: string): Promise<FirebaseDashboardData | null> {
    console.log('MockDataService: Getting dashboard data', { userId });
    return {
      profile: sampleUser,
      loanDetails: sampleLoanDetails,
      disbursementDetails: sampleDisbursementDetails,
      repaymentSchedule: sampleRepaymentSchedule
    };
  }
}

export const mockDataService = new MockDataService();
export default mockDataService;