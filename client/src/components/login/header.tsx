import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Bihar_Govt_Logo.png/800px-Bihar_Govt_Logo.png" 
              alt="Bihar Government Logo" 
              className="h-12 mr-4"
            />
            
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-xl font-bold text-primary">
                <span className="hidden md:inline font-[Noto Sans Devanagari]">
                  {t('header.title.hindi')}
                </span>
                <span className="md:hidden font-[Noto Sans Devanagari]">
                  {t('header.title.shortHindi')}
                </span>
              </h1>
              <p className="text-xs md:text-sm text-neutral-800 font-[Noto Sans Devanagari]">
                <span className="hidden md:inline">
                  {t('header.subtitle.hindi')}
                </span>
                <span className="md:hidden">
                  {t('header.subtitle.shortHindi')}
                </span>
              </p>
            </div>
          </div>

          <img 
            src="https://uploads.wikimedia.org/wikipedia/commons/1/17/Bihar_state_education_board.png" 
            alt="BSEFCL Logo" 
            className="h-12"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
