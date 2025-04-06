import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { 
  FirebaseUser, 
  FirebaseLoanDetails, 
  FirebaseDisbursementDetails, 
  FirebaseRepaymentSchedule,
  FirebaseDashboardData,
  CreateFirebaseUser
} from '../types/firebase';

class FirebaseService {
  // Authentication methods
  async registerUser(email: string, password: string, userData: CreateFirebaseUser) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userProfile = {
        ...userData,
        id: user.uid,
        registrationId: userData.registrationId || 'STU' + Math.floor(100000 + Math.random() * 900000),
        address: userData.address || 'Sample Address, Patna, Bihar',
        phone: userData.phone || userData.mobile || '',
        course: userData.course || 'B.Tech',
        institute: userData.institute || 'NIT Patna',
        enrollmentDate: userData.enrollmentDate || '2023-07-15',
        graduationDate: userData.graduationDate || '2027-06-30',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      await setDoc(userRef, userProfile);
      
      // Create sample loan details
      const loanDetailsRef = doc(db, 'loanDetails', user.uid);
      const loanDetails = {
        id: loanDetailsRef.id,
        userId: user.uid,
        loanAmount: 200000,
        loanTerm: 60,
        interestRate: 7.5,
        monthlyPayment: 4000,
        totalInterest: 40000,
        loanPurpose: 'Higher Education',
        loanStatus: 'APPROVED',
        approvalDate: '2023-08-15',
        disbursementDate: '2023-08-30',
        nextPaymentDate: '2028-09-30',
        totalPaid: 20000,
        remainingBalance: 220000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      await setDoc(loanDetailsRef, loanDetails);
      
      // Create sample disbursement details
      const disbursementRef = doc(db, 'disbursementDetails', user.uid);
      const disbursementDetails = {
        id: disbursementRef.id,
        userId: user.uid,
        disbursementId: 'DISB' + Math.floor(10000 + Math.random() * 90000),
        disbursementDate: '2023-08-30',
        disbursementAmount: 200000,
        bankName: 'State Bank of India',
        accountNumber: 'XXXX' + Math.floor(1000 + Math.random() * 9000),
        transactionId: 'TXN' + Math.floor(100000 + Math.random() * 900000),
        status: 'COMPLETED',
        remarks: 'First disbursement for academic year 2023-24',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      await setDoc(disbursementRef, disbursementDetails);
      
      // Create sample repayment schedule
      for (let i = 1; i <= 5; i++) {
        const repaymentRef = doc(collection(db, 'repaymentSchedule'));
        const paymentStatus = i <= 2 ? 'PAID' : (i === 3 ? 'PENDING' : 'UPCOMING');
        const repaymentSchedule = {
          id: repaymentRef.id,
          userId: user.uid,
          loanId: loanDetailsRef.id,
          paymentNumber: i,
          paymentDate: `2028-${i + 4}-15`,
          paymentAmount: 4000,
          principalAmount: 3500,
          interestAmount: 500,
          paymentStatus: paymentStatus,
          remarks: `Installment ${i}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await setDoc(repaymentRef, repaymentSchedule);
      }
      
      // Return user data
      return userProfile;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
  
  async loginUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user profile from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as FirebaseUser;
      } else {
        throw new Error('User profile not found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
  
  async logoutUser() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
  
  async getCurrentUser() {
    const user = auth.currentUser;
    if (!user) return null;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as FirebaseUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }
  
  // Dashboard data methods
  async getUserProfile(userId: string): Promise<FirebaseUser | null> {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as FirebaseUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
  
  async getLoanDetails(userId: string): Promise<FirebaseLoanDetails | null> {
    try {
      const q = query(collection(db, 'loanDetails'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as FirebaseLoanDetails;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting loan details:', error);
      throw error;
    }
  }
  
  async getDisbursementDetails(userId: string): Promise<FirebaseDisbursementDetails | null> {
    try {
      const q = query(collection(db, 'disbursementDetails'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as FirebaseDisbursementDetails;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting disbursement details:', error);
      throw error;
    }
  }
  
  async getRepaymentSchedule(userId: string): Promise<FirebaseRepaymentSchedule[]> {
    try {
      const q = query(collection(db, 'repaymentSchedule'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => doc.data() as FirebaseRepaymentSchedule);
    } catch (error) {
      console.error('Error getting repayment schedule:', error);
      throw error;
    }
  }
  
  async getDashboardData(userId: string): Promise<FirebaseDashboardData | null> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) return null;
      
      const loanDetails = await this.getLoanDetails(userId);
      const disbursementDetails = await this.getDisbursementDetails(userId);
      const repaymentSchedule = await this.getRepaymentSchedule(userId);
      
      return {
        profile,
        loanDetails: loanDetails as FirebaseLoanDetails,
        disbursementDetails: disbursementDetails as FirebaseDisbursementDetails,
        repaymentSchedule
      };
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();
export default firebaseService;