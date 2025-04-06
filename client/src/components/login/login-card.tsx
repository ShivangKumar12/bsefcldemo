import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, LogIn, GraduationCap, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import educationFinanceImage from "@/assets/education-finance.jpg";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginCard = () => {
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useAuth();
  const isLoading = loginMutation.isPending;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // On successful login, redirect to dashboard
        setLocation("/dashboard");
      },
      onError: (error) => {
        toast({
          title: t('login.errorTitle'),
          description: error.message || t('login.errorMessage'),
          variant: "destructive",
        });
      }
    });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Card className="overflow-hidden shadow-lg animate-in fade-in-50 duration-300">
      {/* Top image */}
      <div className="relative">
        <div className="h-32 w-full overflow-hidden">
          <img 
            src={educationFinanceImage} 
            alt="Education Finance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-bold">{t('login.title')}</h2>
            </div>
            <p className="text-xs text-blue-100">Bihar State Education Finance Corporation Ltd.</p>
          </div>
        </div>
      </div>

      <CardHeader className="bg-white border-b pt-4 pb-2 px-6">
        <div className="flex justify-end items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={i18n.language === 'hi' ? 'text-primary bg-blue-50' : 'text-gray-600'} 
              onClick={toggleLanguage}
            >
              {t('language.hindi')}
            </Button>
            <span className="mx-1 text-gray-400">|</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className={i18n.language === 'en' ? 'text-primary bg-blue-50' : 'text-gray-600'} 
              onClick={toggleLanguage}
            >
              {t('language.english')}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">{t('login.username')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('login.usernamePlaceholder')} 
                      {...field} 
                      className="py-5 border-gray-300 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">{t('login.password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder={t('login.passwordPlaceholder')}
                        {...field}
                        className="py-5 border-gray-300 focus:border-primary"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-700 text-white font-medium py-6 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    {t('login.loggingIn')}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    {t('login.loginButton')}
                  </>
                )}
              </Button>
              
              <div className="flex justify-between items-center pt-2">
                <Button variant="link" className="text-primary p-0 h-auto font-medium text-sm">
                  {t('login.forgotPassword')}
                </Button>
                <Button variant="link" className="text-primary p-0 h-auto font-medium text-sm">
                  {t('login.newRegistration')}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        
        {/* Help Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {t('login.needHelp')}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-primary mr-2">📞</span>
                    <span>{t('login.helpline')}: 0612-2230092</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-primary mr-2">✉️</span>
                    <span>{t('login.email')}: support@bsefcl.in</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-primary mr-2">🕒</span>
                    <span>{t('login.workingHours')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <a 
          href="#about" 
          className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center mx-auto"
        >
          <Info className="mr-1 h-3 w-3" />
          Learn more about student loans and eligibility
        </a>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
