"use client";
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  FilterComponent,
  statusColors,
  TestStatus,
} from "@/components/FilterComponent";
import DataTable from "@/components/Table";
import { RowType } from "@/lib/types/tableTypes";
import { Button } from "antd";
import { useModalAddProduct } from "@/lib/hooks/useModal";
import AddProductModal from "@/components/AddProductModal";
import "@ant-design/v5-patch-for-react-19";
import PrimaryBtn from "@/components/primeryBTN";

const tableColumns: ColumnDef<RowType, any>[] = [
  {
    accessorKey: "id",
    cell: ({ getValue }) => {
      return <p>{getValue()}</p>;
    },
    header: () => <p className=" text-xs text-[#888888]">ID</p>,
  },
  {
    accessorKey: "name",
    cell: ({ getValue }) => {
      return <p className="font-bold">{getValue()}</p>;
    },
    header: () => <p className=" text-xs text-[#888888]">کالا</p>,
  },
  {
    accessorKey: "lab",
    enableSorting: true,
    cell: ({ getValue }) => {
      return <p className="text-center">{getValue()}</p>;
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

    cell: ({ getValue }) => {
      return <p>{getValue()}</p>;
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
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "date",
    cell: ({ getValue }) => {
      return <p className="text-center">{getValue()}</p>;
    },
    header: () => (
      <p className=" text-xs text-center text-[#888888]">تاریخ درخواست</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className=" text-center text-xs text-[#888888]">وضعیت</p>,
    cell: ({ getValue }) => {
      const status = getValue() as TestStatus;
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

export default function MyTablePage() {
  const [status, setStatus] = useState("");
  const [pay, setPay] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const modal = useModalAddProduct();
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
  });
  const ButtonAddProduct = useMemo(() => {
    return (
      <PrimaryBtn color="cyan" onClick={modal.openModal}>
        ثبت کالای جدید جهت اخذ استاندارد
      </PrimaryBtn>
    );
  }, []);

  return (
    <div className="p-8" dir="rtl">
      <div className="flex flex-col flex-wrap gap-4 mb-4 items-start  rounded-3xl justify-start">
        <div className="flex items-center justify-between w-full">
          <div className="relative bg-neutral-50 py-2 pr-3 w-[400px] rounded-3xl">
            <input
              className="outline-0 border-none rounded-md w-64 text-sm"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در درخواست‌ها"
            />
          </div>
          {ButtonAddProduct}
        </div>
        <FilterComponent filters={filters} />
      </div>
      <DataTable table={table} columns={columns} />
      <AddProductModal closeModal={modal.closeModal} open={modal.open} />
    </div>
  );
}
