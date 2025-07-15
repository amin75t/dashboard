"use client";
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { FilterComponent } from "@/components/FilterComponent";
import DataTable from "@/components/Table";
import { useModalAddProduct } from "@/lib/hooks/useModal";
import AddProductModal from "@/components/AddProductModal";
import "@ant-design/v5-patch-for-react-19";
import PrimaryBtn from "@/components/primeryBTN";
import {
  nameOptions,
  payOptions,
  statusOptions,
  tableColumns,
  testData,
} from "./_tableDependency";

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
          <PrimaryBtn color="cyan" onClick={modal.openModal}>
            ثبت کالای جدید جهت اخذ استاندارد
          </PrimaryBtn>
        </div>
        <FilterComponent filters={filters} />
      </div>
      <DataTable table={table} columns={columns} />
      <AddProductModal closeModal={modal.closeModal} open={modal.open} />
    </div>
  );
}
