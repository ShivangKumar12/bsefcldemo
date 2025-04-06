import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { User } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { firebaseService } from "../services/firebase-service";
import { mockDataService } from "../services/mock-data-service";
import { FirebaseUser, CreateFirebaseUser } from "../types/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

// Use mock service for now because of Firebase permission issues
const dataService = mockDataService;

// Convert Firebase data types to match our existing interface from Drizzle schema
const convertFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
  // Get mobile phone from Firebase user data
  const mobile = firebaseUser.mobile || '';
  
  // Create User object with all required fields from schema
  return {
    id: parseInt(firebaseUser.id) || 1,
    username: firebaseUser.username,
    password: "", // We don't return the password
    fullName: firebaseUser.fullName,
    email: firebaseUser.email,
    mobile: mobile,
    isActive: true,
    lastLogin: new Date().toISOString(),
    registrationId: firebaseUser.registrationId,
    address: firebaseUser.address,
    // Map to the schema fields
    coApplicantName: "MUNNA KUMAR",
    coApplicantAddress: "ROAD NO.8, NARAYANI NAGAR, SANCHIPATTI, HAJIPUR, VAISHALI, BIHAR",
    coApplicantContact: "9931286972",
    instituteName: firebaseUser.institute,
    instituteAddress: "LANDRAN, KHARAR-BANUR HIGHWAY, SECTOR-112, GREATER MOHALI, PUNJABLANDRAN, MOHALI-140307(PUNJAB)",
    instituteContact: "1723984200",
    appliedCourse: firebaseUser.course,
    courseDuration: 48
  };
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

// Define login and register data types
type LoginData = {
  username: string; // This will be used as email for Firebase
  password: string;
};

// This is what would go into the registerUser function
type RegisterData = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  mobile: string;
  registrationId?: string;
  address?: string;
  phone?: string;
  course?: string;
  institute?: string;
  enrollmentDate?: string;
  graduationDate?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<Error | null>(null);
  
  // Initialize with mock data instead of relying on Firebase auth state
  useEffect(() => {
    const initializeMockUser = async () => {
      setInitializing(true);
      try {
        // Get user from mock service
        const userProfile = await dataService.getCurrentUser();
        if (userProfile) {
          setCurrentUser(convertFirebaseUserToUser(userProfile));
        } else {
          setCurrentUser(null);
        }
        setAuthError(null);
      } catch (error) {
        console.error("Error initializing mock user:", error);
        setAuthError(error as Error);
        setCurrentUser(null);
      } finally {
        setInitializing(false);
      }
    };

    initializeMockUser();
  }, []);

  // Login mutation using mock data service
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const firebaseUser = await dataService.loginUser(credentials.username, credentials.password);
      return convertFirebaseUserToUser(firebaseUser);
    },
    onSuccess: (userData: User) => {
      setCurrentUser(userData);
      queryClient.setQueryData(["/api/user"], userData);
      toast({
        title: "Login successful",
        description: `Welcome, ${userData.fullName}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  // Register mutation using mock data service
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { email, password, ...otherUserData } = userData;
      // Create a properly typed object for mock data service
      const firebaseUserData: CreateFirebaseUser = {
        username: userData.username,
        email,
        fullName: userData.fullName,
        mobile: userData.mobile,
        registrationId: userData.registrationId,
        address: userData.address,
        phone: userData.phone,
        course: userData.course,
        institute: userData.institute,
        enrollmentDate: userData.enrollmentDate,
        graduationDate: userData.graduationDate
      };
      
      const firebaseUser = await dataService.registerUser(
        email, 
        password, 
        firebaseUserData
      );
      
      return convertFirebaseUserToUser(firebaseUser);
    },
    onSuccess: (userData: User) => {
      setCurrentUser(userData);
      queryClient.setQueryData(["/api/user"], userData);
      toast({
        title: "Registration successful",
        description: `Welcome, ${userData.fullName}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    },
  });

  // Logout mutation using mock data service
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await dataService.logoutUser();
    },
    onSuccess: () => {
      setCurrentUser(null);
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoading: initializing,
        error: authError,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}