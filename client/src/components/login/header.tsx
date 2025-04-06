import { useTranslation } from "react-i18next";
import biharGovtLogo from "@/assets/bihar-govt-logo.png";
import bsefclLogo from "@/assets/bsefcl-logo.jpg";

const Header = () => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={biharGovtLogo}
              alt="Bihar Government Logo" 
              className="h-12 mr-4"
            />
            
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-xl font-bold text-primary">
                <span className="hidden md:inline font-[Noto Sans Devanagari]">
                  {i18n.language === 'hi' ? t('header.title.hindi') : t('header.title.english')}
                </span>
                <span className="md:hidden font-[Noto Sans Devanagari]">
                  {i18n.language === 'hi' ? t('header.title.shortHindi') : t('header.title.shortEnglish')}
                </span>
              </h1>
              <p className="text-xs md:text-sm text-neutral-800 font-[Noto Sans Devanagari]">
                <span className="hidden md:inline">
                  {i18n.language === 'hi' ? t('header.subtitle.hindi') : t('header.subtitle.english')}
                </span>
                <span className="md:hidden">
                  {i18n.language === 'hi' ? t('header.subtitle.shortHindi') : t('header.subtitle.shortEnglish')}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <button 
              onClick={toggleLanguage}
              className="mr-4 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-primary rounded-md text-sm font-medium transition-colors"
            >
              {i18n.language === 'en' ? t('language.hindi') : t('language.english')}
            </button>
            <img 
              src={bsefclLogo}
              alt="BSEFCL Logo" 
              className="h-12 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
