"use client";

import { useEffect } from "react";
import { Modal, Select, Input, Upload, Row, Col } from "antd";
import type { UploadProps } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemaCreatePlan } from "@/lib/schema";
import Image from "next/image";
import PrimaryBtn from "./primeryBTN";

type FormSchema = z.infer<typeof schemaCreatePlan>;

type Props = {
  open: boolean;
  closeModal: () => void;
};
export default function AddProductModal({ open, closeModal }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(schemaCreatePlan),
    defaultValues: {
      type: undefined,
      name: "",
      country: "",
      warehouseNumber: "",
      quantity: undefined,
      file: null,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("مقادیر صحیح:", data);
    closeModal();
  };

  const uploadProps: UploadProps = {
    beforeUpload(file) {
      setValue("file", [file]);
      return false;
    },
    multiple: false,
    fileList: [],
  };
  useEffect(() => {
    console.log(open);
  }, [open]);
  return (
    <>
      <Modal
        styles={{
          content: {
            backgroundColor: "#F7F7F7",
          },
          header: {
            backgroundColor: "#F7F7F7",
          },
        }}
        title="افزودن کالا"
        open={open}
        onCancel={() => closeModal()}
        footer={null}
        width={1000}
        style={{ direction: "rtl" }}
        className="BYekan"
      >
        <div className=" flex items-center justify-center py-[5vh]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="BYekan space-y-8 w-4/6 "
            dir="rtl"
          >
            <Row gutter={16}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    className="BYekan"
                    {...field}
                    placeholder={
                      <span className="flex items-center gap-2">
                        <Image
                          src="/icons/Icon-Right copy 2.svg"
                          // className="w-5 h-5"
                          alt="کالا"
                          width={20}
                          height={20}
                        />
                        <span>گونه کالای خود را انتخاب کنید</span>
                      </span>
                    }
                    size="large"
                    direction="rtl"
                    style={{ width: "100%", borderRadius: 16 }}
                  >
                    <Select.Option value="a">نوع A</Select.Option>
                    <Select.Option value="b">نوع B</Select.Option>
                  </Select>
                )}
              />
            </Row>

            {errors.type && (
              <p className="text-red-500 text-sm">{`${errors.type.message}`}</p>
            )}

            <Row gutter={16}>
              <Col span={12}>
                <label>
                  نام کالا <span className="text-red-500 mr-1">*</span>
                </label>
                <Input
                  className="BYekan"
                  {...register("name")}
                  size="large"
                  style={{ borderRadius: 16 }}
                  placeholder="اینجا بنویسید"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </Col>
              <Col span={12}>
                <label>
                  شماره قبض انبار <span className="text-red-500 mr-1">*</span>
                </label>
                <Input
                  className="BYekan"
                  {...register("warehouseNumber")}
                  size="large"
                  style={{ borderRadius: 16 }}
                  placeholder="اینجا بنویسید"
                />
                {errors.warehouseNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.warehouseNumber.message}
                  </p>
                )}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <label>
                  کشور مبدا <span className="text-red-500 mr-1">*</span>
                </label>
                <Input
                  className="BYekan"
                  {...register("country")}
                  size="large"
                  style={{ borderRadius: 16 }}
                  placeholder="اینجا بنویسید"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </Col>
              <Col span={12}>
                <label>
                  تعداد <span className="text-red-500 mr-1">*</span>
                </label>
                <Input
                  className="BYekan"
                  {...register("quantity", { valueAsNumber: true })}
                  size="large"
                  type="number"
                  style={{ borderRadius: 16 }}
                  placeholder="اینجا بنویسید"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </Col>
            </Row>

            <div>
              <Upload.Dragger {...uploadProps} style={{ borderRadius: 16 }}>
                <div className="!flex BYekan !items-center w-[622px] py-10 !justify-center !flex-col ">
                  <Image
                    src={"/icons/Upload icon.svg"}
                    alt=""
                    width={60}
                    height={60}
                    className="mb-2"
                  />
                  <p className="text-gray-700 text-sm">
                    برای بارگذاری فایل، بکشید و رها کنید یا مرور کنید{" "}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    فرمت‌های قابل پشتیبانی: JPEG، PNG، GIF، MP4، PDF، PSD، AI،
                    Word، PPT{" "}
                  </p>
                </div>
              </Upload.Dragger>
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{`${errors.file.message}`}</p>
              )}
            </div>
            <div className="flex items-center justify-center my-10">
              <PrimaryBtn
                style={{
                  width: "620px",
                  fontSize: "15px",
                }}
                color={"cyan"}
                htmlType={"submit"}
              >
                ثبت
              </PrimaryBtn>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
