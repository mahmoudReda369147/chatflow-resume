import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, FileCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-orange.jpg";

const Landing = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Orange Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,113,33,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.1),transparent_50%)]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-glow">
                <Sparkles className="h-4 w-4" />
                {t("aiPowered")} Resume Builder
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                {t("heroTitle").split("AI")[0]}
                <span className="gradient-primary bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                {t("heroDescription")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/chat">
                  <Button size="lg" className="gradient-accent text-white gap-2 shadow-glow hover:scale-105 transition-transform text-lg px-8 py-6">
                    {t("startBuilding")}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6">
                    View Templates
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-12 pt-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">15k+ Happy Users</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">3 min</div>
                  <div className="text-sm text-muted-foreground">Average Build Time</div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:block hidden">
              <div className="absolute -top-10 -right-10 h-80 w-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 h-80 w-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="relative">
                <img 
                  src={heroImage}
                  alt="AI Resume Builder" 
                  className="relative rounded-3xl shadow-glow w-full border-4 border-primary/20 animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {t("featuresTitle")}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Build Smarter, <span className="gradient-primary bg-clip-text text-transparent">Not Harder</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the future of resume building with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-3xl p-10 shadow-soft hover:shadow-glow transition-all border-2 border-border hover:border-primary/50">
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-bl-[100px] rounded-tr-3xl"></div>
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-medium group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("aiPowered")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aiPoweredDesc")}
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-3xl p-10 shadow-soft hover:shadow-glow transition-all border-2 border-border hover:border-primary/50">
              <div className="absolute top-0 right-0 h-24 w-24 bg-accent/10 rounded-bl-[100px] rounded-tr-3xl"></div>
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 shadow-medium group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("instantPreview")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("instantPreviewDesc")}
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-3xl p-10 shadow-soft hover:shadow-glow transition-all border-2 border-border hover:border-primary/50">
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-bl-[100px] rounded-tr-3xl"></div>
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-medium group-hover:scale-110 transition-transform">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("professionalTemplates")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("professionalTemplatesDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Pricing Plans
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your <span className="gradient-primary bg-clip-text text-transparent">Perfect Plan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start free and upgrade anytime to unlock premium features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-soft hover:shadow-medium transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">1 Resume</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">Basic Templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">PDF Export</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-2">Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 shadow-glow transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-white">$9</span>
                  <span className="text-white/80">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-white/30 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white">Unlimited Resumes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-white/30 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white">Premium Templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-white/30 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white">AI Suggestions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-white/30 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white">Priority Support</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-primary hover:bg-white/90">Get Pro</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-soft hover:shadow-medium transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">Team Collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">Custom Branding</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">Dedicated Support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-2">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-accent opacity-10"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-accent rounded-[2rem] p-16 text-center text-white shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {t("readyToStart")}
              </h2>
              <p className="text-xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
                Join 15,000+ professionals who landed their dream jobs with AI-powered resumes
              </p>
              <Link to="/chat">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 shadow-lg text-lg px-10 py-7 hover:scale-105 transition-transform">
                  {t("getStarted")}
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
