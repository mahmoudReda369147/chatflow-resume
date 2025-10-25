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
    logout: "Sign out",
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
    choosePerfectTemplate: "Choose Your Perfect Template",
    templatesSubtitle: "Select a professionally designed template and customize it with AI assistance to match your style",
    useThisTemplate: "Use This Template",
    template_pro_name: "Professional",
    template_pro_desc: "Clean and minimal design perfect for corporate roles",
    template_creative_name: "Creative",
    template_creative_desc: "Modern layout ideal for creative professionals",
    template_executive_name: "Executive",
    template_executive_desc: "Elegant design for senior positions",
    template_modern_name: "Modern",
    template_modern_desc: "Contemporary style for tech professionals",
    template_bold_name: "Bold",
    template_bold_desc: "Stand out with vibrant design elements",
    template_minimal_name: "Minimalist",
    template_minimal_desc: "Simple and elegant for any industry",
    readyToStart: "Ready to Create Your Resume?",
    getStarted: "Get Started Now",
    login: "Login",
    newChat: "New Chat",
    resumeChat: "Resume Chat",
    noChatsYet: "No chats yet.",
    startConversation: "Start a new conversation!",
    clickToViewMessages: "Click to view messages",
    preview: "Preview",
    typeYourMessage: "Type your message...",
    downloadYourResume: "Download Your Resume",
    resumeGeneratedSuccess: "Your resume has been generated successfully! You can preview it on the right panel.",
    welcomeAssistant: "Hello! I'm your AI resume assistant. I'll help you create a professional resume by asking you a few questions. Let's start with your name. What should I call you?",
    // Resume Preview
    livePreview: "Live Preview",
    downloadPdf: "Open PDF in browser",
    resumePreviewTitle: "Resume Preview",
    yourName: "Your Name",
    professionalTitle: "Professional Title",
    contactPlaceholder: "email@example.com | (123) 456-7890 | City, State",
    professionalSummary: "Professional Summary",
    professionalSummaryDesc: "Your professional summary will appear here as you provide information to the AI assistant.",
    // Footer
    product: "Product",
    resumeBuilder: "Resume Builder",
    pricing: "Pricing",
    features: "Features",
    company: "Company",
    aboutUs: "About Us",
    blog: "Blog",
    careers: "Careers",
    contact: "Contact",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
    disclaimer: "Disclaimer",
    rightsReserved: "All rights reserved.",
    buildProfessionalResumes: "Build professional resumes with AI-powered technology in minutes.",
    // Landing extras
    viewTemplates: "View Templates",
    buildSmarterNotHarder: "Build Smarter, Not Harder",
    featuresSubtitle: "Experience the future of resume building with cutting-edge AI technology",
    happyUsers: "15k+ Happy Users",
    threeMin: "3 min",
    avgBuildTime: "Average Build Time",
    pricingPlans: "Pricing Plans",
    choosePerfectPlan: "Choose Your Perfect Plan",
    startFreeSubtitle: "Start free and upgrade anytime to unlock premium features",
    free: "Free",
    perMonth: "/month",
    resumes1: "1 Resume",
    basicTemplates: "Basic Templates",
    pdfExport: "PDF Export",
    getStartedCta: "Get Started",
    mostPopular: "Most Popular",
    pro: "Pro",
    unlimitedResumes: "Unlimited Resumes",
    premiumTemplates: "Premium Templates",
    aiSuggestions: "AI Suggestions",
    prioritySupport: "Priority Support",
    getPro: "Get Pro",
    enterprise: "Enterprise",
    everythingInPro: "Everything in Pro",
    teamCollaboration: "Team Collaboration",
    customBranding: "Custom Branding",
    dedicatedSupport: "Dedicated Support",
    contactSales: "Contact Sales",
    joinCtaSubtitle: "Join 15,000+ professionals who landed their dream jobs with AI-powered resumes",
    // PDFs Page
    yourPdfs: "Your PDFs",
    browseGeneratedPdfs: "Browse your generated PDFs",
    pdfsSubtitle: "Access the resumes you've created. Click to open or download.",
    loading: "Loading...",
    noPdfsYet: "No PDFs found yet.",
    createdAt: "Created at",
    viewPdf: "View PDF",
    previous: "Previous",
    next: "Next",
    pageOf: "Page {0} of {1}",
  },
  ar: {
    home: "الرئيسية",
    chat: "الدردشة",
    templates: "القوالب",
    darkMode: "الوضع الداكن",
    language: "English",
    logout: "تسجيل الخروج",
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
    choosePerfectTemplate: "اختر القالب المثالي",
    templatesSubtitle: "اختر قالبًا مصممًا باحتراف وقم بتخصيصه بمساعدة الذكاء الاصطناعي ليناسب أسلوبك",
    useThisTemplate: "استخدم هذا القالب",
    template_pro_name: "احترافي",
    template_pro_desc: "تصميم نظيف وبسيط مثالي للأدوار المؤسسية",
    template_creative_name: "إبداعي",
    template_creative_desc: "تنسيق حديث مناسب للمتخصصين المبدعين",
    template_executive_name: "تنفيذي",
    template_executive_desc: "تصميم أنيق للمناصب العليا",
    template_modern_name: "حديث",
    template_modern_desc: "أسلوب معاصر للمحترفين في التقنية",
    template_bold_name: "جريء",
    template_bold_desc: "تميّز بعناصر تصميم نابضة بالحياة",
    template_minimal_name: "بسيط",
    template_minimal_desc: "بسيط وأنيق لأي صناعة",
    readyToStart: "هل أنت مستعد لإنشاء سيرتك الذاتية؟",
    getStarted: "ابدأ الآن",
    login: "تسجيل الدخول",
    newChat: "محادثة جديدة",
    resumeChat: "دردشة السيرة الذاتية",
    noChatsYet: "لا توجد محادثات بعد.",
    startConversation: "ابدأ محادثة جديدة!",
    clickToViewMessages: "انقر لعرض الرسائل",
    preview: "معاينة",
    typeYourMessage: "اكتب رسالتك...",
    downloadYourResume: "تحميل سيرتك الذاتية",
    resumeGeneratedSuccess: "تم إنشاء سيرتك الذاتية بنجاح! يمكنك معاينتها في اللوحة اليمنى.",
    welcomeAssistant: "مرحبًا! أنا مساعد السيرة الذاتية الذكي. سأساعدك في إنشاء سيرة ذاتية احترافية من خلال طرح بعض الأسئلة عليك. لنبدأ باسمك. بماذا أناديك؟",
    // Resume Preview
    livePreview: "معاينة مباشرة",
    downloadPdf: "فتح السيرة في المتصفح",
    resumePreviewTitle: "معاينة السيرة الذاتية",
    yourName: "اسمك",
    professionalTitle: "المسمى الوظيفي",
    contactPlaceholder: "email@example.com | (123) 456-7890 | المدينة، الدولة",
    professionalSummary: "الملخص المهني",
    professionalSummaryDesc: "سيظهر ملخصك المهني هنا أثناء تزويدك للمساعد الذكي بالمعلومات.",
    // Footer
    product: "المنتج",
    resumeBuilder: "منشئ السيرة الذاتية",
    pricing: "الأسعار",
    features: "الميزات",
    company: "الشركة",
    aboutUs: "من نحن",
    blog: "المدونة",
    careers: "الوظائف",
    contact: "اتصل بنا",
    legal: "سياسات",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    cookiePolicy: "سياسة ملفات تعريف الارتباط",
    disclaimer: "إخلاء المسؤولية",
    rightsReserved: "جميع الحقوق محفوظة.",
    buildProfessionalResumes: "أنشئ سيرًا ذاتية احترافية بتقنية الذكاء الاصطناعي خلال دقائق.",
    // Landing extras
    viewTemplates: "عرض القوالب",
    buildSmarterNotHarder: "ابنِ بذكاء، لا بمشقة",
    featuresSubtitle: "اختبر مستقبل إنشاء السيرة الذاتية بتقنيات الذكاء الاصطناعي المتقدمة",
    happyUsers: "+15 ألف مستخدم سعيد",
    threeMin: "3 دقائق",
    avgBuildTime: "متوسط وقت الإنشاء",
    pricingPlans: "خطط الأسعار",
    choosePerfectPlan: "اختر الخطة المثالية",
    startFreeSubtitle: "ابدأ مجانًا وطوّر لاحقًا للحصول على الميزات المتقدمة",
    free: "مجاني",
    perMonth: "/شهريًا",
    resumes1: "سيرة ذاتية واحدة",
    basicTemplates: "قوالب أساسية",
    pdfExport: "تصدير PDF",
    getStartedCta: "ابدأ الآن",
    mostPopular: "الأكثر شيوعًا",
    pro: "احترافي",
    unlimitedResumes: "عدد غير محدود من السير",
    premiumTemplates: "قوالب مميزة",
    aiSuggestions: "اقتراحات الذكاء الاصطناعي",
    prioritySupport: "دعم مُعجّل",
    getPro: "احصل على النسخة الاحترافية",
    enterprise: "المؤسسات",
    everythingInPro: "كل ما في الاحترافي",
    teamCollaboration: "تعاون الفرق",
    customBranding: "هوية مخصصة",
    dedicatedSupport: "دعم مخصص",
    contactSales: "تواصل مع المبيعات",
    joinCtaSubtitle: "انضم إلى أكثر من 15,000 محترف حصلوا على وظائف أحلامهم بسير ذاتية مدعومة بالذكاء الاصطناعي",
    footer: "التذييل",
    copyright: "حقوق النشر",
    allRightsReserved: "جميع الحقوق محفوظة.",
    // PDFs Page
    yourPdfs: "ملفاتك PDF",
    browseGeneratedPdfs: "استعرض ملفات PDF المُنشأة",
    pdfsSubtitle: "اطّلع على السير الذاتية التي أنشأتها. انقر للفتح أو التحميل.",
    loading: "جارٍ التحميل...",
    noPdfsYet: "لا توجد ملفات PDF حتى الآن.",
    createdAt: "تاريخ الإنشاء",
    viewPdf: "عرض PDF",
    previous: "السابق",
    next: "التالي",
    pageOf: "الصفحة {0} من {1}",
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
