import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { mockDataService } from "@/services/mock-data-service";
import type { FirebaseDashboardData } from "@/types/firebase";

// Use mock service to bypass Firebase permission issues
const dataService = mockDataService;

// Dashboard components
import ProfileCard from "@/components/dashboard/profile-card";
import AccountSummary from "@/components/dashboard/account-summary";
import DisbursementDetails from "@/components/dashboard/disbursement-details";
import RepaymentStatus from "@/components/dashboard/repayment-status";
import ApplicationStatus from "@/components/dashboard/application-status";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export default function DashboardPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [dashboardData, setDashboardData] = useState<FirebaseDashboardData | null>(null);

  // Fetch dashboard data from mock service
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setError(new Error("User not authenticated"));
        return;
      }

      try {
        setIsLoading(true);
        // In a real app, we would use the user's ID to get their data
        // For now, we'll use a hardcoded ID for testing
        const userId = user.id.toString();
        // Use mock data service instead of Firebase
        const data = await dataService.getDashboardData(userId);
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchDashboardData();
    }
  }, [user, authLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    // Show error and redirect to login page after a delay
    toast({
      title: "Authentication Error",
      description: "Please log in to access the dashboard",
      variant: "destructive"
    });
    
    // Redirect to login page after a short delay
    setTimeout(() => setLocation("/"), 2000);
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error loading dashboard</h1>
        <p className="text-gray-600">{error.message}</p>
        <p className="mt-4">Redirecting to login page...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader fullName={dashboardData?.profile?.fullName || "Student"} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Welcome, {dashboardData?.profile?.fullName || "Student"}</h1>
              <p className="text-gray-600">Registration Id: {dashboardData?.profile?.registrationId || "6172140"}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center border border-blue-100">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="text-sm font-semibold text-gray-700">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full bg-gray-50 p-1 border border-gray-200 rounded-md justify-start overflow-x-auto">
            <TabsTrigger 
              value="profile" 
              className="py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
            >
              Profile Summary
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
            >
              Account Summary
            </TabsTrigger>
            <TabsTrigger 
              value="track" 
              className="py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
            >
              Track Loan Status
            </TabsTrigger>
            <TabsTrigger 
              value="disbursement" 
              className="py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
            >
              Disbursement Details
            </TabsTrigger>
            <TabsTrigger 
              value="repayment" 
              className="py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
            >
              Repayment Status
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Profile Information</h2>
            <ProfileCard profile={dashboardData?.profile} />
          </TabsContent>
          
          <TabsContent value="account" className="mt-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Account Summary</h2>
            <AccountSummary loanDetails={dashboardData?.loanDetails} />
          </TabsContent>
          
          <TabsContent value="track" className="mt-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Loan Application Status</h2>
            <ApplicationStatus />
          </TabsContent>
          
          <TabsContent value="disbursement" className="mt-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Disbursement Details</h2>
            <DisbursementDetails disbursementDetails={dashboardData?.disbursementDetails} />
          </TabsContent>
          
          <TabsContent value="repayment" className="mt-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Repayment Schedule</h2>
            <RepaymentStatus 
              loanDetails={dashboardData?.loanDetails} 
              repaymentSchedule={dashboardData?.repaymentSchedule} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}