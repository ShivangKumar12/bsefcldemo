import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

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
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      await apiRequest("POST", "/api/login", data);
      // On successful login, redirect to dashboard
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: t('login.errorTitle'),
        description: t('login.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Card className="overflow-hidden animate-in fade-in-50 duration-300">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-400 py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">
            {t('login.title')}
          </h2>
          <div className="flex items-center">
            <Button 
              variant={i18n.language === 'hi' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={i18n.language === 'hi' ? 'text-primary font-medium' : 'text-white hover:text-white hover:bg-primary-800'} 
              onClick={toggleLanguage}
            >
              {t('language.hindi')}
            </Button>
            <Button 
              variant={i18n.language === 'en' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={i18n.language === 'en' ? 'text-primary font-medium ml-1' : 'text-white hover:text-white hover:bg-primary-800 ml-1'} 
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
                  <FormLabel>{t('login.username')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('login.usernamePlaceholder')} 
                      {...field} 
                      className="py-5"
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
                  <FormLabel>{t('login.password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder={t('login.passwordPlaceholder')}
                        {...field}
                        className="py-5"
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
                className="w-full bg-primary hover:bg-primary-700 text-white font-medium py-5"
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
              
              <div className="flex justify-between items-center">
                <Button variant="link" className="text-primary p-0 h-auto font-medium">
                  {t('login.forgotPassword')}
                </Button>
                <Button variant="link" className="text-primary p-0 h-auto font-medium">
                  {t('login.newRegistration')}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        
        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
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
      </CardContent>
    </Card>
  );
};

export default LoginCard;
