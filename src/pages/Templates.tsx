import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and minimal design perfect for corporate roles",
    color: "from-orange-100 to-orange-50",
  },
  {
    id: 2,
    name: "Creative",
    description: "Modern layout ideal for creative professionals",
    color: "from-amber-100 to-orange-50",
  },
  {
    id: 3,
    name: "Executive",
    description: "Elegant design for senior positions",
    color: "from-orange-50 to-amber-50",
  },
  {
    id: 4,
    name: "Modern",
    description: "Contemporary style for tech professionals",
    color: "from-red-100 to-orange-100",
  },
  {
    id: 5,
    name: "Bold",
    description: "Stand out with vibrant design elements",
    color: "from-orange-200 to-red-100",
  },
  {
    id: 6,
    name: "Minimalist",
    description: "Simple and elegant for any industry",
    color: "from-gray-100 to-orange-50",
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4 shadow-glow">
            Professional Templates
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Choose Your <span className="gradient-primary bg-clip-text text-transparent">Perfect Template</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a professionally designed template and customize it with AI assistance to match your style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all border-2 border-border hover:border-primary/50 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${template.color} h-80 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-colors"></div>
                <FileText className="relative h-32 w-32 text-primary/40 group-hover:text-primary/60 transition-colors group-hover:scale-110 transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{template.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{template.description}</p>
                <Button className="w-full gradient-accent shadow-glow hover:scale-105 transition-transform rounded-2xl text-base py-6">
                  Use This Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
