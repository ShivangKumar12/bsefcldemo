import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  header: {
    title: {
      english: 'Bihar State Education Finance Corporation Limited, Patna',
      shortEnglish: 'BSEFCL, Patna',
      hindi: 'बिहार राज्य शिक्षा वित्त निगम लिमिटेड, पटना',
      shortHindi: 'BSEFCL, पटना'
    },
    subtitle: {
      english: '(An Undertaking of Finance Department, Government of Bihar)',
      shortEnglish: '(Govt. of Bihar)',
      hindi: '(वित्त विभाग, बिहार सरकार का उपक्रम)',
      shortHindi: '(बिहार सरकार)'
    }
  },
  infoBanner: {
    longText: 'Applicant can get all details of his/her BSCC loan application from their login here. BSCC Applicant is advised to use same Login Id & Password what it is used in application form.',
    shortText: 'Use same Login Id & Password as used in application form.'
  },
  notifications: {
    title: 'Notification',
    deadlineExtended: 'Last date for loan application submission has been extended till 30th September 2023',
    emailVerification: 'All applicants must verify their email address to receive updates',
    holidayClosure: 'Document verification centers will remain closed on national holidays'
  },
  language: {
    hindi: 'Hindi',
    english: 'English'
  },
  login: {
    title: 'Student Login',
    username: 'Username / Application ID',
    usernamePlaceholder: 'Enter your username or application ID',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    forgotPassword: 'Forgot Password?',
    newRegistration: 'New Registration',
    needHelp: 'Need Help?',
    helpline: 'Helpline',
    email: 'Email',
    workingHours: 'Working Hours: 10:00 AM - 5:00 PM (Mon-Fri)',
    errorTitle: 'Login Failed',
    errorMessage: 'Invalid username or password. Please try again.'
  },
  userManual: {
    tabs: {
      manual: 'User Manual',
      about: 'About BSEFCL',
      contact: 'Contact Us'
    },
    loanProcess: {
      title: 'Educational Loan Process',
      steps: {
        register: 'Register on the portal with valid email and mobile',
        complete: 'Complete the application form with accurate details',
        upload: 'Upload required documents as per checklist',
        submit: 'Submit application and track status via login',
        visit: 'Visit verification center if requested by the department'
      }
    },
    educationalLoan: 'Educational Loan Support',
    helpText: 'Follow the guidelines to complete your loan application',
    quickLinks: {
      downloadForm: 'Download Application Form',
      checklist: 'Document Checklist',
      faq: 'Frequently Asked Questions'
    },
    about: {
      title: 'About Bihar State Education Finance Corporation',
      description: 'Bihar State Education Finance Corporation Limited (BSEFCL) is an undertaking of the Finance Department, Government of Bihar, established to provide financial assistance to deserving students for higher education.',
      mission: {
        title: 'Our Mission',
        description: 'To make quality education accessible to all deserving students of Bihar by providing timely financial assistance through simplified processes.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To be the most trusted and efficient education finance corporation in India, enabling every deserving student from Bihar to pursue quality education without financial constraints.'
      }
    },
    contact: {
      title: 'Contact Information',
      address: {
        title: 'Office Address'
      },
      phone: {
        title: 'Helpline'
      },
      email: {
        title: 'Email Support'
      }
    }
  },
  footer: {
    title: 'Bihar State Education Finance Corporation Ltd.',
    address: 'Vikas Bhawan, Bailey Road, Patna - 800001',
    location: 'Bihar, India',
    links: {
      title: 'Important Links',
      govtBihar: 'Government of Bihar',
      education: 'Education Department',
      siteMap: 'Site Map'
    },
    connect: {
      title: 'Connect With Us'
    },
    copyright: '2023 Bihar State Education Finance Corporation Ltd. All Rights Reserved.',
    bottomLinks: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      accessibility: 'Accessibility'
    }
  }
};

// Hindi translations
const hiTranslations = {
  header: {
    title: {
      hindi: 'बिहार राज्य शिक्षा वित्त निगम लिमिटेड, पटना',
      shortHindi: 'BSEFCL, पटना',
      english: 'Bihar State Education Finance Corporation Limited, Patna',
      shortEnglish: 'BSEFCL, Patna'
    },
    subtitle: {
      hindi: '(वित्त विभाग, बिहार सरकार का उपक्रम)',
      shortHindi: '(बिहार सरकार)',
      english: '(An Undertaking of Finance Department, Government of Bihar)',
      shortEnglish: '(Govt. of Bihar)'
    }
  },
  infoBanner: {
    longText: 'आवेदक अपने बीएससीसी ऋण आवेदन के सभी विवरण यहां से लॉगिन कर प्राप्त कर सकते हैं। बीएससीसी आवेदक को सलाह दी जाती है कि वे आवेदन पत्र में उपयोग किए गए समान लॉगिन आईडी और पासवर्ड का उपयोग करें।',
    shortText: 'आवेदन पत्र में उपयोग किए गए समान लॉगिन आईडी और पासवर्ड का उपयोग करें।'
  },
  notifications: {
    title: 'सूचना',
    deadlineExtended: 'ऋण आवेदन जमा करने की अंतिम तिथि 30 सितंबर 2023 तक बढ़ा दी गई है',
    emailVerification: 'सभी आवेदकों को अपडेट प्राप्त करने के लिए अपने ईमेल पते को सत्यापित करना होगा',
    holidayClosure: 'दस्तावेज़ सत्यापन केंद्र राष्ट्रीय अवकाश के दिन बंद रहेंगे'
  },
  language: {
    hindi: 'हिंदी',
    english: 'अंग्रेज़ी'
  },
  login: {
    title: 'छात्र लॉगिन',
    username: 'उपयोगकर्ता नाम / आवेदन आईडी',
    usernamePlaceholder: 'अपना उपयोगकर्ता नाम या आवेदन आईडी दर्ज करें',
    password: 'पासवर्ड',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    loginButton: 'लॉगिन करें',
    loggingIn: 'लॉगिन हो रहा है...',
    forgotPassword: 'पासवर्ड भूल गए?',
    newRegistration: 'नया पंजीकरण',
    needHelp: 'सहायता चाहिए?',
    helpline: 'हेल्पलाइन',
    email: 'ईमेल',
    workingHours: 'कार्य समय: सुबह 10:00 - शाम 5:00 (सोम-शुक्र)',
    errorTitle: 'लॉगिन विफल',
    errorMessage: 'अमान्य उपयोगकर्ता नाम या पासवर्ड। कृपया पुनः प्रयास करें।'
  },
  userManual: {
    tabs: {
      manual: 'उपयोगकर्ता मैनुअल',
      about: 'बीएसईएफसीएल के बारे में',
      contact: 'संपर्क करें'
    },
    loanProcess: {
      title: 'शैक्षिक ऋण प्रक्रिया',
      steps: {
        register: 'वैध ईमेल और मोबाइल के साथ पोर्टल पर पंजीकरण करें',
        complete: 'सटीक विवरण के साथ आवेदन पत्र पूरा करें',
        upload: 'चेकलिस्ट के अनुसार आवश्यक दस्तावेज अपलोड करें',
        submit: 'आवेदन जमा करें और लॉगिन के माध्यम से स्थिति ट्रैक करें',
        visit: 'विभाग द्वारा अनुरोध किए जाने पर सत्यापन केंद्र पर जाएं'
      }
    },
    educationalLoan: 'शैक्षिक ऋण सहायता',
    helpText: 'अपने ऋण आवेदन को पूरा करने के लिए दिशानिर्देशों का पालन करें',
    quickLinks: {
      downloadForm: 'आवेदन पत्र डाउनलोड करें',
      checklist: 'दस्तावेज़ चेकलिस्ट',
      faq: 'अक्सर पूछे जाने वाले प्रश्न'
    },
    about: {
      title: 'बिहार राज्य शिक्षा वित्त निगम के बारे में',
      description: 'बिहार राज्य शिक्षा वित्त निगम लिमिटेड (बीएसईएफसीएल) वित्त विभाग, बिहार सरकार का एक उपक्रम है, जो उच्च शिक्षा के लिए योग्य छात्रों को वित्तीय सहायता प्रदान करने के लिए स्थापित किया गया है।',
      mission: {
        title: 'हमारा मिशन',
        description: 'सरलीकृत प्रक्रियाओं के माध्यम से समय पर वित्तीय सहायता प्रदान करके बिहार के सभी योग्य छात्रों के लिए गुणवत्तापूर्ण शिक्षा को सुलभ बनाना।'
      },
      vision: {
        title: 'हमारा विज़न',
        description: 'भारत में सबसे विश्वसनीय और कुशल शिक्षा वित्त निगम बनना, बिहार के हर योग्य छात्र को वित्तीय बाधाओं के बिना गुणवत्तापूर्ण शिक्षा प्राप्त करने में सक्षम बनाना।'
      }
    },
    contact: {
      title: 'संपर्क जानकारी',
      address: {
        title: 'कार्यालय का पता'
      },
      phone: {
        title: 'हेल्पलाइन'
      },
      email: {
        title: 'ईमेल सहायता'
      }
    }
  },
  footer: {
    title: 'बिहार राज्य शिक्षा वित्त निगम लिमिटेड',
    address: 'विकास भवन, बेली रोड, पटना - 800001',
    location: 'बिहार, भारत',
    links: {
      title: 'महत्वपूर्ण लिंक',
      govtBihar: 'बिहार सरकार',
      education: 'शिक्षा विभाग',
      siteMap: 'साइट मैप'
    },
    connect: {
      title: 'हमसे जुड़ें'
    },
    copyright: '2023 बिहार राज्य शिक्षा वित्त निगम लिमिटेड। सर्वाधिकार सुरक्षित।',
    bottomLinks: {
      privacy: 'गोपनीयता नीति',
      terms: 'उपयोग की शर्तें',
      accessibility: 'सुलभता'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
