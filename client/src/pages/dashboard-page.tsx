import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

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
  
  // Fetch all dashboard data
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ["/api/dashboard-data"],
    retry: 1,
    refetchOnWindowFocus: false
  });

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Welcome, {dashboardData?.profile?.fullName || "Student"}</h1>
          <p className="text-gray-600">Registration Id: {dashboardData?.profile?.registrationId || "6172140"}</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 w-full border border-gray-200 rounded-md justify-start">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">Profile Summary</TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-white">Account Summary</TabsTrigger>
            <TabsTrigger value="track" className="data-[state=active]:bg-primary data-[state=active]:text-white">Track Loan Status</TabsTrigger>
            <TabsTrigger value="disbursement" className="data-[state=active]:bg-primary data-[state=active]:text-white">Disbursement Details</TabsTrigger>
            <TabsTrigger value="repayment" className="data-[state=active]:bg-primary data-[state=active]:text-white">Repayment Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="border border-gray-200 rounded-lg p-6 bg-white">
            <ProfileCard profile={dashboardData?.profile} />
          </TabsContent>
          
          <TabsContent value="account" className="border border-gray-200 rounded-lg p-6 bg-white">
            <AccountSummary loanDetails={dashboardData?.loanDetails} />
          </TabsContent>
          
          <TabsContent value="track" className="border border-gray-200 rounded-lg p-6 bg-white">
            <ApplicationStatus />
          </TabsContent>
          
          <TabsContent value="disbursement" className="border border-gray-200 rounded-lg p-6 bg-white">
            <DisbursementDetails disbursementDetails={dashboardData?.disbursementDetails} />
          </TabsContent>
          
          <TabsContent value="repayment" className="border border-gray-200 rounded-lg p-6 bg-white">
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