"use client";

import { useState } from "react";
import { Modal, Button, Select, Input, Upload } from "antd";
import type { UploadProps } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InboxOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { schemaCreatePlan } from "@/lib/schema";

type FormSchema = z.infer<typeof schemaCreatePlan>;

export default function AddProductModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(schemaCreatePlan),
    defaultValues: {
      type: "",
      name: "",
      country: "",
      warehouseNumber: "",
      quantity: undefined,
      file: null,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("مقادیر صحیح:", data);
    setOpen(false);
  };

  const uploadProps: UploadProps = {
    beforeUpload(file) {
      setValue("file", [file]);
      return false;
    },
    multiple: false,
    fileList: [],
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        + افزودن کالا
      </Button>

      <Modal
        style={{ direction: "rtl" }}
        title="افزودن کالا"
        open={open}
        onCancel={() => setOpen(false)}
        okText="ثبت"
        onOk={handleSubmit(onSubmit)}
        width={1102}
      >
        <form className="space-y-4">
          <div dir="rtl">
            <label>نوع کالا</label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  direction="rtl"
                  className=" text-right"
                  {...field}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="">انتخاب کنید</Select.Option>
                  <Select.Option value="a">نوع A</Select.Option>
                  <Select.Option value="b">نوع B</Select.Option>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label>نام کالا</label>
            <Input dir="lrt" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label>کشور مبدا</label>
              <Input {...register("country")} />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label>شماره قبض انبار</label>
              <Input {...register("warehouseNumber")} />
            </div>
          </div>

          <div>
            <label>تعداد</label>
            <Input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>برای بارگذاری فایل، بکشید یا مرور کنید</p>
            </Upload.Dragger>
            {errors.file && (
              <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}
