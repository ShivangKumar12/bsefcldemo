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
  FirebaseDashboardData
} from '../types/firebase';

class FirebaseService {
  // Authentication methods
  async registerUser(email: string, password: string, userData: Omit<FirebaseUser, 'id'>) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...userData,
        id: user.uid,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      // Return user data
      return {
        ...userData,
        id: user.uid
      };
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