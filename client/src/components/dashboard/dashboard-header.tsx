import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { BellIcon, LogOut } from "lucide-react";
import headerLogo from "@assets/219-2196137_bihar-government-logo-bihar-government-logo-png-transparent.png";

interface DashboardHeaderProps {
  fullName: string;
}

export default function DashboardHeader({ fullName }: DashboardHeaderProps) {
  const { logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={headerLogo} 
              alt="BSEFCL Logo" 
              className="h-12 bg-white p-1 rounded-md" 
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">BSEFCL APPLICANT PORTAL</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex">
              <ul className="flex space-x-1">
                <NavItem label="Home" isActive={true} />
                <NavItem label="Account Summary" />
                <NavItem label="Track Loan Status" />
                <NavItem label="Disbursement Details" />
                <NavItem label="Repayment Status" />
                <NavItem label="Notification" icon={<BellIcon className="w-4 h-4 text-red-500" />} />
                <NavItem label="FAQ" />
                <NavItem label="Guideline" />
              </ul>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-sm">Welcome, {fullName}</span>
                <Button 
                  variant="link" 
                  className="text-white p-0 h-auto flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

interface NavItemProps {
  label: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

function NavItem({ label, isActive, icon }: NavItemProps) {
  return (
    <li className={`px-3 py-2 rounded-t-md ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
      <a href="#" className="flex items-center text-white text-sm font-medium">
        {label}
        {icon && <span className="ml-1">{icon}</span>}
      </a>
    </li>
  );
}