import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    chat: "Chat",
    templates: "Templates",
    darkMode: "Dark Mode",
    language: "العربية",
    heroTitle: "Create Your Professional Resume in Minutes with AI",
    heroDescription: "Chat with our AI assistant to build a resume that stands out. Get professional results without the hassle.",
    startBuilding: "Start Building",
    featuresTitle: "Why Choose ResumeAI?",
    aiPowered: "AI-Powered",
    aiPoweredDesc: "Our intelligent assistant guides you through every step",
    instantPreview: "Instant Preview",
    instantPreviewDesc: "See your resume take shape in real-time",
    professionalTemplates: "Professional Templates",
    professionalTemplatesDesc: "Choose from expertly designed resume layouts",
    readyToStart: "Ready to Create Your Resume?",
    getStarted: "Get Started Now",
  },
  ar: {
    home: "الرئيسية",
    chat: "الدردشة",
    templates: "القوالب",
    darkMode: "الوضع الداكن",
    language: "English",
    heroTitle: "أنشئ سيرتك الذاتية الاحترافية في دقائق مع الذكاء الاصطناعي",
    heroDescription: "تحدث مع مساعدنا الذكي لبناء سيرة ذاتية مميزة. احصل على نتائج احترافية دون عناء.",
    startBuilding: "ابدأ الإنشاء",
    featuresTitle: "لماذا تختار ResumeAI؟",
    aiPowered: "مدعوم بالذكاء الاصطناعي",
    aiPoweredDesc: "مساعدنا الذكي يرشدك خلال كل خطوة",
    instantPreview: "معاينة فورية",
    instantPreviewDesc: "شاهد سيرتك الذاتية تتشكل في الوقت الفعلي",
    professionalTemplates: "قوالب احترافية",
    professionalTemplatesDesc: "اختر من تصميمات السيرة الذاتية المصممة بخبرة",
    readyToStart: "هل أنت مستعد لإنشاء سيرتك الذاتية؟",
    getStarted: "ابدأ الآن",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) {
      setLanguageState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
