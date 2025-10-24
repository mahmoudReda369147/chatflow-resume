import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and minimal design perfect for corporate roles",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Creative",
    description: "Modern layout ideal for creative professionals",
    color: "bg-purple-50",
  },
  {
    id: 3,
    name: "Executive",
    description: "Elegant design for senior positions",
    color: "bg-gray-50",
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a professional template to get started. You can customize it with AI assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border"
            >
              <div className={`${template.color} h-64 flex items-center justify-center`}>
                <FileText className="h-24 w-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                <Button className="w-full gradient-primary">Use This Template</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
