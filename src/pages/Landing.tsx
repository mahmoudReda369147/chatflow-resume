import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Builder
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Create Your Professional Resume in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minutes with AI
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Chat with our AI assistant to build a stunning resume. No templates to fill out, 
              just natural conversation that creates professional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chat">
                <Button size="lg" className="gradient-primary text-primary-foreground gap-2 shadow-medium hover:shadow-lg transition-all">
                  Start Building
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline">
                  View Templates
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5 min</div>
                <div className="text-sm text-muted-foreground">Average Time</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
            <img 
              src={heroImage}
              alt="AI Resume Builder Illustration" 
              className="relative rounded-3xl shadow-medium w-full animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose ResumeAI?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building a resume has never been this easy and intuitive
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all border border-border">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
            <p className="text-muted-foreground">
              Our intelligent AI guides you through every step, asking the right questions 
              to highlight your best qualities.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all border border-border">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Create a professional resume in under 5 minutes. See changes in real-time 
              as you chat with the AI.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all border border-border">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Professional Results</h3>
            <p className="text-muted-foreground">
              Download your resume as a polished PDF ready to impress employers 
              and land your dream job.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center text-primary-foreground shadow-medium">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Build Your Future?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of job seekers who've created winning resumes with ResumeAI
          </p>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
