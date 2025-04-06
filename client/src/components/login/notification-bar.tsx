import { useTranslation } from "react-i18next";

const NotificationBar = () => {
  const { t } = useTranslation();
  const notifications = [
    t('notifications.deadlineExtended'),
    t('notifications.emailVerification'),
    t('notifications.holidayClosure')
  ];
  
  return (
    <div className="bg-primary py-2">
      <div className="container mx-auto px-4 md:px-6 flex items-center">
        <div className="w-1/4 md:w-auto">
          <h2 className="text-white font-semibold text-sm md:text-base">
            {t('notifications.title')}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto max-h-20 ml-4 text-white text-xs md:text-sm scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {notifications.map((notification, index) => (
            <p key={index} className="py-1">➤ {notification}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
