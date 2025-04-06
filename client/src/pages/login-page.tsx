import { useEffect } from "react";
import Header from "@/components/login/header";
import InfoBanner from "@/components/login/info-banner";
import NotificationBar from "@/components/login/notification-bar";
import LoginCard from "@/components/login/login-card";
import UserManual from "@/components/login/user-manual";
import Footer from "@/components/login/footer";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = "BSEFCL - Student Login Portal";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      <InfoBanner />
      <NotificationBar />
      
      <main className="container mx-auto px-4 md:px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - User Manual */}
          <div className="w-full md:w-2/3 order-2 md:order-1">
            <UserManual />
          </div>
          
          {/* Right Column - Login Form */}
          <div className="w-full md:w-1/3 order-1 md:order-2">
            <LoginCard />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
