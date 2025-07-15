import { z } from "zod";



export const schemaCreatePlan = z.object({
  type: z.string().nonempty("نوع کالا باید انتخاب شود"),
  name: z.string().min(1, "نام کالا"),

  country: z.string().nonempty("کشور مبدا بایدد نوشته شود"),
  warehouseNumber: z.string().optional(),
  quantity: z
    .number({ error: "تعداد باید عدد باشد" })
    .min(1, "حداقل ۱ باید باشد"),
  file: z
    .any()
    .refine((f) => f instanceof File, "لطفاً یک فایل انتخاب کنید")
    .refine((f) => {
      const allowedTypes = [
        // تصاویر
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/vnd.adobe.photoshop",
        "application/postscript", 
      ];
      return f instanceof File && allowedTypes.includes(f.type);
    }, "فرمت فایل باید یکی از موارد مجاز باشد: PDF، DOC، DOCX، JPEG، PNG، GIF، MP4، PSD، AI"),
});
