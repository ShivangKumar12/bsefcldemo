import { useEffect } from "react";
import Header from "@/components/login/header";
import InfoBanner from "@/components/login/info-banner";
import NotificationBar from "@/components/login/notification-bar";
import LoginCard from "@/components/login/login-card";
import UserManual from "@/components/login/user-manual";
import Footer from "@/components/login/footer";
import { useTranslation } from "react-i18next";

// Import images
import biharGovtLogo from "@/assets/bihar-govt-logo.png";
import bsefclLogo from "@/assets/bsefcl-logo.jpg";
import graduationImage from "@/assets/graduation-celebration.png";
import secretariatImage from "@/assets/bihar-secretariat.jpg";
import educationFinanceImage from "@/assets/education-finance.jpg";

const LoginPage = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.title = "BSEFCL - Student Login Portal";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      <InfoBanner />
      <NotificationBar />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="container mx-auto px-4 md:px-6 py-8 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <img src={biharGovtLogo} alt="Bihar Government Logo" className="h-16 mr-3" />
                <img src={bsefclLogo} alt="BSEFCL Logo" className="h-16" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {t('header.title.english')}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6">
                {t('userManual.about.description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#login" className="bg-white text-blue-700 hover:bg-blue-50 px-5 py-2 rounded-md font-medium transition-colors">
                  Student Login
                </a>
                <a href="#about" className="bg-blue-700 text-white hover:bg-blue-900 border border-blue-500 px-5 py-2 rounded-md font-medium transition-colors">
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={graduationImage} 
                alt="Students celebrating graduation" 
                className="rounded-lg shadow-lg max-h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 md:px-6 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - User Manual & Information */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1 space-y-8">
            {/* Featured Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={secretariatImage} 
                  alt="Bihar Secretariat" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg text-primary">Bihar State Secretariat</h3>
                  <p className="text-sm text-gray-600">Department of Education, Patna</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={educationFinanceImage} 
                  alt="Education Finance" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg text-primary">Education Loan Program</h3>
                  <p className="text-sm text-gray-600">Supporting higher education in Bihar</p>
                </div>
              </div>
            </div>
            
            {/* User Manual Component */}
            <UserManual />
          </div>
          
          {/* Right Column - Login Form */}
          <div id="login" className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="sticky top-8">
              <LoginCard />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
