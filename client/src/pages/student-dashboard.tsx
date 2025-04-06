import { useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const StudentDashboard = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // This is a placeholder dashboard. In a real app, you'd check
    // authentication status and either show the dashboard or redirect to login
    
    const checkAuth = () => {
      // For demo purposes, redirect back to login
      toast({
        title: "Not implemented",
        description: "This is a placeholder dashboard. Redirecting to login.",
      });
      
      setTimeout(() => {
        setLocation("/");
      }, 3000);
    };
    
    checkAuth();
  }, [setLocation, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Student Dashboard</h1>
        <p className="text-center text-gray-600 mb-8">
          This is a placeholder dashboard. You would see your loan application status and other details here.
        </p>
        
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-8">
          Redirecting to login page...
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;
