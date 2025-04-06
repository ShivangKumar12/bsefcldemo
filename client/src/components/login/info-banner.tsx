import { useTranslation } from "react-i18next";

const InfoBanner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-blue-50 border-y border-blue-200 py-2">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-xs md:text-sm text-blue-800 font-medium text-center">
          <span className="hidden md:inline">
            {t('infoBanner.longText')}
          </span>
          <span className="md:hidden">
            {t('infoBanner.shortText')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InfoBanner;
