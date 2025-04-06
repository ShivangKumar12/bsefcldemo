import { Button } from "@/components/ui/button";
import { BellIcon, LogOut, Home, CreditCard, BarChart2, FileText, Calendar, HelpCircle, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import headerLogo from "@assets/219-2196137_bihar-government-logo-bihar-government-logo-png-transparent.png";

interface DashboardHeaderProps {
  fullName: string;
}

export default function DashboardHeader({ fullName }: DashboardHeaderProps) {
  const [, setLocation] = useLocation();
  
  const handleLogout = () => {
    // Make logout request
    fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => {
      // Redirect to login page
      setLocation("/");
    });
  };
  
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto py-3 px-4">
        {/* Top header with logo and title */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <img 
              src={headerLogo} 
              alt="BSEFCL Logo" 
              className="h-12 bg-white p-1 rounded-md" 
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide">BSEFCL APPLICANT PORTAL</h1>
            </div>
          </div>
          
          {/* Logout button */}
          <Button 
            variant="outline" 
            size="sm"
            className="border-white text-white hover:bg-blue-700"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-1" />
            <span>Log out</span>
          </Button>
        </div>
        
        {/* Navigation bar */}
        <nav className="mt-2 bg-blue-800 rounded-md py-1 px-2 overflow-x-auto">
          <ul className="flex space-x-1 min-w-max">
            <NavItem label="Home" icon={<Home className="w-4 h-4" />} isActive={true} />
            <NavItem label="Account Summary" icon={<CreditCard className="w-4 h-4" />} />
            <NavItem label="Track Loan Status" icon={<BarChart2 className="w-4 h-4" />} />
            <NavItem label="Disbursement Details" icon={<FileText className="w-4 h-4" />} />
            <NavItem label="Repayment Status" icon={<Calendar className="w-4 h-4" />} />
            <NavItem label="Notification" icon={<BellIcon className="w-4 h-4 text-red-400" />} />
            <NavItem label="FAQ" icon={<HelpCircle className="w-4 h-4" />} />
            <NavItem label="Guidelines" icon={<BookOpen className="w-4 h-4" />} />
          </ul>
        </nav>
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
    <li className={`px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
      <a href="#" className="flex items-center text-white text-sm font-medium">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </a>
    </li>
  );
}