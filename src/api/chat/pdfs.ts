import { makeApiCall } from "@/api/makeApiCall";

export type PdfItem = {
  id: string;
  createdAt: string;
  title: string;
  pdfUrl: string;
  imageUrl: string;
  userId: string;
  conversationId: string;
  messageId: string;
};

export type PdfsResponse = {
  success: boolean;
  message: string;
  data: {
    items: PdfItem[];
    meta: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
};

export async function getPdfs(page: number = 1) {
  const res = await makeApiCall<PdfsResponse>({
    url: "/chat/pdfs",
    method: "GET",
    params: { page },
  });
  return res.data;
}
