import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileText, Home, LayoutTemplate, Moon, Sun, Menu ,Settings} from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrentUser, useLogout } from "@/api/auth/authHooks";

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const { data: currentUser } = useCurrentUser();
  const logout = useLogout();

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
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compact Settings Dropdown: Theme + Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Settings" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme === "dark" ? "dark" : "light"} onValueChange={(v) => setTheme(v as "light" | "dark")}> 
                  <DropdownMenuRadioItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={(v) => {
                    if (v === "en" || v === "ar") setLanguage(v);
                  }}
                >
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Controls */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={""} alt={currentUser.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600">
                    {t("logout") || "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="hidden sm:block">
                <Button className="gradient-accent shadow-glow">
                  {t("login")}
                </Button>
              </Link>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant={isActive("/") ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <Home className="h-5 w-5" />
                      {t("home")}
                    </Button>
                  </Link>
                  
                  <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant={isActive("/chat") ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <FileText className="h-5 w-5" />
                      {t("chat")}
                    </Button>
                  </Link>
                  
                  <Link to="/templates" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant={isActive("/templates") ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <LayoutTemplate className="h-5 w-5" />
                      {t("templates")}
                    </Button>
                  </Link>
                  
                  <div className="border-t border-border my-4"></div>
                  
                  <div className="flex items-center justify-between px-4 py-2">
                    <Label className="text-sm">{t("darkMode")}</Label>
                    <div className="flex items-center gap-2">
                      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <Switch 
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between px-4 py-2">
                    <Label className="text-sm">{t("language")}</Label>
                    <Switch 
                      checked={language === "ar"}
                      onCheckedChange={(checked) => setLanguage(checked ? "ar" : "en")}
                    />
                  </div>
                  
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="mt-4">
                    <Button className="w-full gradient-accent shadow-glow">
                      {t("login")}
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
