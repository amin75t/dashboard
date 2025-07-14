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
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return f instanceof File && allowedTypes.includes(f.type);
    }, "فرمت فایل باید PDF، DOC یا DOCX باشد"),
});
