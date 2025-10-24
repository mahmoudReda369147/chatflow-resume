import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileText, Home, LayoutTemplate, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "secondary" : "ghost"}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                {t("home")}
              </Button>
            </Link>
            <Link to="/chat">
              <Button 
                variant={isActive("/chat") ? "secondary" : "ghost"}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                {t("chat")}
              </Button>
            </Link>
            <Link to="/templates">
              <Button 
                variant={isActive("/templates") ? "secondary" : "ghost"}
                className="gap-2"
              >
                <LayoutTemplate className="h-4 w-4" />
                {t("templates")}
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
              <Label className="text-sm">{t("darkMode")}</Label>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <Switch 
                checked={language === "ar"}
                onCheckedChange={(checked) => setLanguage(checked ? "ar" : "en")}
              />
              <Label className="text-sm">{t("language")}</Label>
            </div>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
