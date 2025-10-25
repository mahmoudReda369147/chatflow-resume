import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GeneratedResume {
  pdfUrl?: string;
  htmlCode?: string;
}

interface ResumePreviewProps {
  generatedResume: GeneratedResume | null;
}

const ResumePreview = ({ generatedResume }: ResumePreviewProps) => {
  const { t } = useLanguage();
  const handleDownload = () => {
    if (generatedResume?.pdfUrl) {
      window.open(generatedResume.pdfUrl, '_blank');
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b-2 border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{t("livePreview")}</h3>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleDownload}
              dir="ltr"
              disabled={!generatedResume?.pdfUrl}
              className="gap-2 gradient-accent shadow-glow rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Globe className="h-4 w-4" />
              {t("downloadPdf")}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-secondary/20 to-background">
        {generatedResume?.pdfUrl ? (
          <div className="bg-white rounded-2xl shadow-medium overflow-hidden min-h-[550px] border-2 border-primary/10">
            <iframe 
              src={generatedResume.pdfUrl} 
              className="w-full h-full min-h-[550px]"
              title={t("resumePreviewTitle")}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-medium p-10 min-h-[550px] text-gray-900 border-2 border-primary/10">
            {/* Resume Template Preview */}
            <div className="space-y-8">
            <div className="text-center border-b-2 border-primary/20 pb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {t("yourName")}
              </h1>
              <p className="text-gray-700 mt-2 font-semibold text-lg">{t("professionalTitle")}</p>
              <p className="text-sm text-gray-600 mt-3">{t("contactPlaceholder")}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-3 mb-4">
                {t("professionalSummary")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("professionalSummaryDesc")}
              </p>
            </div>
            
            {/* <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-3 mb-4">
                Work Experience
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Job Title</h3>
                  <p className="text-gray-600 font-medium">Company Name | Date - Date</p>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Achievement or responsibility will be listed here</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-3 mb-4">
                Education
              </h2>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Degree</h3>
                <p className="text-gray-600 font-medium">University Name | Graduation Year</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-3 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-soft">
                  Skill 1
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-soft">
                  Skill 2
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-soft">
                  Skill 3
                </span>
              </div>
            </div> */}
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
