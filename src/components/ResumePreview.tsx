import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";

const ResumePreview = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Resume Preview</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" className="gap-2 gradient-primary">
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg shadow-soft p-8 min-h-[800px] text-gray-900">
          {/* Resume Template Preview */}
          <div className="space-y-6">
            <div className="text-center border-b border-gray-200 pb-4">
              <h1 className="text-3xl font-bold text-gray-900">Your Name</h1>
              <p className="text-gray-600 mt-1">Professional Title</p>
              <p className="text-sm text-gray-500 mt-2">email@example.com | (123) 456-7890 | City, State</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                Professional Summary
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your professional summary will appear here as you provide information to the AI assistant.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                Work Experience
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Job Title</h3>
                  <p className="text-sm text-gray-600">Company Name | Date - Date</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li>• Achievement or responsibility will be listed here</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                Education
              </h2>
              <div>
                <h3 className="font-semibold text-gray-900">Degree</h3>
                <p className="text-sm text-gray-600">University Name | Graduation Year</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Skill 1</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Skill 2</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Skill 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
