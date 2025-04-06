import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Info, Phone, Download, FileText, HelpCircle } from "lucide-react";

const UserManual = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("userManual");
  
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <Tabs defaultValue="userManual" value={activeTab} className="w-full">
        <TabsList className="w-full rounded-none bg-white border-b grid grid-cols-3">
          <TabsTrigger 
            value="userManual" 
            onClick={() => setActiveTab("userManual")}
            className={activeTab === "userManual" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {t('userManual.tabs.manual')}
          </TabsTrigger>
          <TabsTrigger 
            value="about" 
            onClick={() => setActiveTab("about")}
            className={activeTab === "about" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          >
            <Info className="mr-2 h-4 w-4" />
            {t('userManual.tabs.about')}
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            onClick={() => setActiveTab("contact")}
            className={activeTab === "contact" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          >
            <Phone className="mr-2 h-4 w-4" />
            {t('userManual.tabs.contact')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="userManual" className="p-6 m-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary mb-4">
                {t('userManual.loanProcess.title')}
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'register',
                  'complete',
                  'upload',
                  'submit',
                  'visit'
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{t(`userManual.loanProcess.steps.${step}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 bg-blue-50 rounded-lg overflow-hidden">
              <div className="h-full w-full flex items-center justify-center p-6">
                <div className="text-center text-primary">
                  <BookOpen size={48} className="mx-auto mb-4 text-primary opacity-50" />
                  <h4 className="font-medium">{t('userManual.educationalLoan')}</h4>
                  <p className="text-sm mt-2 text-gray-600">{t('userManual.helpText')}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 text-primary justify-start h-auto py-4 px-4">
              <Download className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">{t('userManual.quickLinks.downloadForm')}</span>
            </Button>
            <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 text-primary justify-start h-auto py-4 px-4">
              <FileText className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">{t('userManual.quickLinks.checklist')}</span>
            </Button>
            <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 text-primary justify-start h-auto py-4 px-4">
              <HelpCircle className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">{t('userManual.quickLinks.faq')}</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="p-6 m-0">
          <h3 className="text-lg font-semibold text-primary mb-3">
            {t('userManual.about.title')}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {t('userManual.about.description')}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-primary mb-2">
              {t('userManual.about.mission.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('userManual.about.mission.description')}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-2">
              {t('userManual.about.vision.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('userManual.about.vision.description')}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="p-6 m-0">
          <h3 className="text-lg font-semibold text-primary mb-3">
            {t('userManual.contact.title')}
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-primary mb-2">
              {t('userManual.contact.address.title')}
            </h4>
            <p className="text-sm text-gray-600">
              Bihar State Education Finance Corporation Ltd.<br />
              Vikas Bhawan, Bailey Road<br />
              Patna - 800001, Bihar
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800">
                  {t('userManual.contact.phone.title')}
                </h4>
                <p className="text-sm text-gray-600">0612-2230092</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div>
                <h4 className="font-medium text-gray-800">
                  {t('userManual.contact.email.title')}
                </h4>
                <p className="text-sm text-gray-600">support@bsefcl.in</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Image Gallery */}
      <div className="mt-2 grid grid-cols-2 gap-4 px-6 pb-6">
        <div className="bg-blue-50 rounded-lg overflow-hidden h-40 flex items-center justify-center">
          <div className="text-center text-primary p-4">
            <svg className="h-12 w-12 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm font-medium">Bihar Education Department</span>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg overflow-hidden h-40 flex items-center justify-center">
          <div className="text-center text-primary p-4">
            <svg className="h-12 w-12 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span className="text-sm font-medium">Education Loan Support</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserManual;
