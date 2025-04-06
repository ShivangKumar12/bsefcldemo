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
import { FirebaseUser } from "../types/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

// Convert Firebase data types to match our existing interface
const convertFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: parseInt(firebaseUser.id),
    username: firebaseUser.username,
    password: "", // We don't return the password
    fullName: firebaseUser.fullName,
    email: firebaseUser.email,
    registrationId: firebaseUser.registrationId,
    address: firebaseUser.address,
    phone: firebaseUser.phone,
    course: firebaseUser.course,
    institute: firebaseUser.institute,
    enrollmentDate: firebaseUser.enrollmentDate,
    graduationDate: firebaseUser.graduationDate,
    created_at: new Date(firebaseUser.created_at),
    updated_at: new Date(firebaseUser.updated_at)
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
  registrationId: string;
  address: string;
  phone: string;
  course: string;
  institute: string;
  enrollmentDate: string;
  graduationDate: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<Error | null>(null);
  
  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setInitializing(true);
      try {
        if (firebaseUser) {
          const userProfile = await firebaseService.getCurrentUser();
          if (userProfile) {
            setCurrentUser(convertFirebaseUserToUser(userProfile));
          } else {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
        setAuthError(null);
      } catch (error) {
        setAuthError(error as Error);
        setCurrentUser(null);
      } finally {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const firebaseUser = await firebaseService.loginUser(credentials.username, credentials.password);
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

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { email, password, ...otherUserData } = userData;
      // Use email for authentication but preserve username for display
      const firebaseUser = await firebaseService.registerUser(email, password, {
        ...otherUserData,
        username: userData.username,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      return convertFirebaseUserToUser(firebaseUser as FirebaseUser);
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

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await firebaseService.logoutUser();
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