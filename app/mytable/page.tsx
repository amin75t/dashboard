"use client";
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  FilterComponent,
  statusColors,
  TestStatus,
} from "@/components/FilterComponent";
import DataTable from "@/components/Table";
import { RowType } from "@/lib/types/tableTypes";

const tableColumns: ColumnDef<RowType, any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "کالا" },
  { accessorKey: "lab", header: "آزمایشگاه تخصیص یافته" },
  { accessorKey: "hs", header: "HS Code" },
  { accessorKey: "pay", header: "پرداخت" },
  { accessorKey: "date", header: "تاریخ درخواست" },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const status = getValue() as TestStatus;
      const color = statusColors[status];
      return (
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
      );
    },
  },
  {
    accessorKey: "more",
    header: "",
    cell: ({ getValue }) => {
      return (
        <button className="text-primary-600 font-medium bg-[#EDE3C7] px-4 py-1 rounded-full text-sm">
          بیشتر
        </button>
      );
    },
  },
];
const testData = [
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

const statusOptions = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "در حال بررسی", label: "در حال بررسی" },
  { value: "شروع تست", label: "شروع تست" },
  { value: "اتمام تست", label: "اتمام تست" },
];

const payOptions = [
  { value: "", label: "همه پرداخت‌ها" },
  { value: "موفق", label: "موفق" },
  { value: "ناموفق", label: "ناموفق" },
];

const nameOptions = [
  { value: "", label: "همه کالاها" },
  ...Array.from(new Set(testData.map((row) => row.name))).map((name) => ({
    value: name,
    label: name,
  })),
];

// type RowType = (typeof testData)[0];

export default function MyTablePage() {
  const [status, setStatus] = useState("");
  const [pay, setPay] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const columns = useMemo(() => tableColumns, []);

  const filters = useMemo(
    () => [
      {
        key: "name",
        label: "نام کالا",
        options: nameOptions,
        value: name,
        onChange: setName,
      },
      {
        key: "pay",
        label: "وضعیت پرداخت",
        options: payOptions,
        value: pay,
        onChange: setPay,
      },
      {
        key: "status",
        label: "وضعیت تست",
        options: statusOptions,
        value: status,
        onChange: setStatus,
      },
    ],
    [name, pay, status]
  );

  const filteredData = useMemo(
    () =>
      testData.filter(
        (row) =>
          (status === "" || row.status === status) &&
          (pay === "" || row.pay === pay) &&
          (name === "" || row.name === name) &&
          (search === "" ||
            Object.values(row).some((val) =>
              String(val).toLowerCase().includes(search.toLowerCase())
            ))
      ),
    [status, pay, name, search]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-8" dir="rtl">
      <div className="flex flex-col flex-wrap gap-4 mb-4 items-start justify-start">
        <div className="relative bg-neutral-50 py-2 px-1 rounded-lg">
          <input
            className="outline-0 border-none rounded-md w-64 text-sm"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در درخواست‌ها"
          />
        </div>
        <FilterComponent filters={filters} />
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
}
