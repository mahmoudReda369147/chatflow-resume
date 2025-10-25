import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { getPdfs, type PdfItem } from "@/api/chat/pdfs";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

const Templates = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const cardColors = useMemo(
    () => [
      "from-orange-100 to-orange-50",
      "from-amber-100 to-orange-50",
      "from-orange-50 to-amber-50",
      "from-red-100 to-orange-100",
      "from-orange-200 to-red-100",
      "from-gray-100 to-orange-50",
    ],
    []
  );

  useEffect(() => {
    const fetchPdfs = async () => {
      setLoading(true);
      try {
        const data = await getPdfs(currentPage);
        const list = data?.data?.items ?? [];
        setItems(list);
        setTotalPages(data?.data?.meta?.totalPages ?? 1);
      } catch (e) {
        // errors are toasted by interceptor
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, [currentPage]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4 shadow-glow">
            {t("yourPdfs")}
          </div>
          <h1 className="text-5xl font-bold mb-6">{t("browseGeneratedPdfs")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("pdfsSubtitle")}</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="group bg-card rounded-3xl overflow-hidden shadow-soft border-2 border-border animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
                <div className="p-8 space-y-4">
                  <Skeleton className="h-7 w-2/3" />
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground">{t("noPdfsYet")}</div>
        ) : (
          <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all border-2 border-border hover:border-primary/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative h-80 flex items-center justify-center overflow-hidden bg-gradient-to-br  ${cardColors[index % cardColors.length]}`}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0  px-5 pt-5 bg-white"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-colors"></div>
                  <FileText className="relative h-32 w-32 text-primary/40 group-hover:text-primary/60 transition-colors group-hover:scale-110 transform duration-300" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("createdAt")}: {formatDate(item.createdAt)}
                  </p>
                  <Button
                    className="w-full gradient-accent shadow-glow hover:scale-105 transition-transform rounded-2xl text-base py-6"
                    onClick={() => window.open(item.pdfUrl, "_blank")}
                  >
                    {t("viewPdf")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant={"outline"}
              disabled={currentPage <= 1 || loading}
              onClick={() => setSearchParams({ page: String(currentPage - 1) })}
            >
              {t("previous")}
            </Button>
            <span className="text-sm text-muted-foreground">
              {t("pageOf").replace("{0}", String(currentPage)).replace("{1}", String(totalPages))}
            </span>
            <Button
              variant={"outline"}
              disabled={currentPage >= totalPages || loading}
              onClick={() => setSearchParams({ page: String(currentPage + 1) })}
            >
              {t("next")}
            </Button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Templates;
