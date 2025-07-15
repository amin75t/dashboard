import { RowType } from "@/lib/types/tableTypes";
import { ColumnDef } from "@tanstack/react-table";
import { statusColors, TestStatus } from "@/components/FilterComponent";

import "@ant-design/v5-patch-for-react-19";
import PrimaryBtn from "@/components/primeryBTN";

export const testData = [
  {
    id: "۰۰۱",
    name: "کولر",
    lab: "LabX Tehran",
    hs: "۳۴۷۷۰۰۷۱",
    pay: "موفق",
    date: "۱۴۰۴/۳/۱",
    status: "در حال بررسی",
  },
  {
    id: "۰۰۲",
    name: "چراغ قوه",
    lab: "LabX Boushehr",
    hs: "۳۴۷۷۰۰۷۱",
    pay: "موفق",
    date: "۱۴۰۴/۲/۲۸",
    status: "در حال بررسی",
  },
  {
    id: "۰۰۳",
    name: "اسپیکر",
    lab: "LabU Shiraz",
    hs: "۳۴۷۷۰۰۷۱",
    pay: "موفق",
    date: "۱۴۰۴/۲/۲۷",
    status: "شروع تست",
  },
  {
    id: "۰۰۴",
    name: "اسکونر",
    lab: "LabM Busher",
    hs: "۳۴۷۷۰۰۷۱",
    pay: "ناموفق",
    date: "۱۴۰۴/۱/۱۳",
    status: "اتمام تست",
  },
  {
    id: "۰۰۵",
    name: "چاپی",
    lab: "LabW Tehran",
    hs: "۳۴۷۷۰۰۷۱",
    pay: "موفق",
    date: "۱۴۰۴/۱/۱۹",
    status: "اتمام تست",
  },
];

export const statusOptions = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "در حال بررسی", label: "در حال بررسی" },
  { value: "شروع تست", label: "شروع تست" },
  { value: "اتمام تست", label: "اتمام تست" },
];

export const payOptions = [
  { value: "", label: "همه پرداخت‌ها" },
  { value: "موفق", label: "موفق" },
  { value: "ناموفق", label: "ناموفق" },
];

export const nameOptions = [
  { value: "", label: "همه کالاها" },
  ...Array.from(new Set(testData.map((row) => row.name))).map((name) => ({
    value: name,
    label: name,
  })),
];

export const tableColumns: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: "id",
    cell: (info) => {
      return <p>{`${info.getValue()}`}</p>;
    },
    header: () => <p className=" text-xs text-[#888888]">ID</p>,
  },
  {
    accessorKey: "name",
    cell: (info) => {
      return <p className="font-bold">{`${info.getValue()}`}</p>;
    },
    header: () => <p className=" text-xs text-[#888888]">کالا</p>,
  },
  {
    accessorKey: "lab",
    enableSorting: true,
    cell: (info) => {
      return <p className="text-center">{`${info.getValue()}`}</p>;
    },
    header: () => (
      <p className="text-center cursor-pointer text-xs text-[#888888]">
        آزمایشگاه تخصیص یافته
      </p>
    ),
  },
  {
    accessorKey: "hs",
    enableSorting: true,

    cell: (info) => {
      return <p>{`${info.getValue()}`}</p>;
    },
    header: () => <p className=" text-xs text-[#888888]">HS Code</p>,
  },
  {
    accessorKey: "pay",
    enableSorting: true,
    header: ({ column }) => {
      return (
        <p
          className="cursor-pointer text-xs text-[#888888] flex items-center"
          onClick={column.getToggleSortingHandler()}
        >
          پرداخت
        </p>
      );
    },
    cell: (info) => <p>{`${info.getValue()}`}</p>,
  },
  {
    accessorKey: "date",
    cell: (info) => {
      return <p className="text-center">{`${info.getValue()}`}</p>;
    },
    header: () => (
      <p className=" text-xs text-center text-[#888888]">تاریخ درخواست</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className=" text-center text-xs text-[#888888]">وضعیت</p>,
    cell: (info) => {
      const status = info.getValue() as TestStatus;
      const color = statusColors[status];
      return (
        <div className="flex items-center justify-center">
          <div
            className="w-fit py-0.5 px-2 rounded-xl"
            style={{ backgroundColor: color.bg }}
          >
            <p
              className={`px-2 py-1 rounded-full text-xs`}
              style={{
                color: color.textColor,
              }}
            >
              {status}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "more",
    header: "",
    cell: () => {
      return (
        <PrimaryBtn
          style={{
            backgroundColor: "#E1D4AD",
          }}
        >
          بیشتر
        </PrimaryBtn>
        // <button className="text-primary-600 font-medium bg-[#EDE3C7] px-4 py-1 rounded-full text-sm">
        //   بیشتر
        // </button>
      );
    },
  },
];
