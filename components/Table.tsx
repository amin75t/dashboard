// "use client";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// import { useMemo, useState } from "react";
// import { FilterComponent } from "./FilterComponent";
// import { TableFilter } from "@/lib/types/tableTypes";

// type TableProps<T> = {
//   columns: ColumnDef<T, any>[];
//   data: T[];
//   filters?: TableFilter[];
//   search?: {
//     value: string;
//     onChange: (val: string) => void;
//     placeholder?: string;
//   };
//   emptyText?: string;
//   onRowClick?: (row: T, index: number) => void;
// };

// export function Table<T extends Record<string, any>>({
//   columns,
//   data,
//   filters,
//   search,
//   emptyText = "داده‌ای وجود ندارد",
//   onRowClick,
// }: TableProps<T>) {
//   const [globalFilter, setGlobalFilter] = useState("");

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   return (
//     <div
//       dir="rtl"
//       className="w-full bg-white rounded-xl shadow-sm overflow-x-auto p-4"
//     >
//       {(filters?.length || search) && (
//         <div className="flex flex-col flex-wrap gap-4 mb-4 items-start justify-start">
//           {search && (
//             <div className="relative bg-neutral-50 py-2 px-1 rounded-lg">
//               <input
//                 className="outline-0 border-none rounded-md w-64 text-sm"
//                 type="text"
//                 value={search.value}
//                 onChange={(e) => search.onChange(e.target.value)}
//                 placeholder={search.placeholder || "جستجو..."}
//               />
//               <svg
//                 className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </div>
//           )}
//           {filters && <FilterComponent filters={filters} />}
//         </div>
//       )}

//       <table className="w-full text-right border-separate border-spacing-y-2">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   className="py-2 px-3 font-bold text-gray-700 text-sm"
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//               <th className="py-2 px-3" />
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={columns.length + 1}
//                 className="text-center py-8 text-gray-400"
//               >
//                 {emptyText}
//               </td>
//             </tr>
//           ) : (
//             table.getRowModel().rows.map((row, rowIndex) => (
//               <tr
//                 key={row.id}
//                 onClick={
//                   onRowClick
//                     ? () => onRowClick(row.original, rowIndex)
//                     : undefined
//                 }
//                 className="rounded-xl cursor-pointer"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="py-2 px-3 text-sm whitespace-nowrap"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//                 <td className="py-2 px-3">
//                   <button className="text-primary-600 font-medium bg-[#EDE3C7] px-4 py-1 rounded-full text-sm">
//                     بیشتر
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";
import React from "react";
import { ColumnDef, flexRender, Table as ReactTable } from "@tanstack/react-table";
import { RowType } from "@/lib/types/tableTypes";

type Props<T> = {
  table: ReactTable<T>;
  columns: ColumnDef<RowType>[];
};

export default function DataTable<T>({ table, columns }: Props<T>) {
  return (
    <table className="w-full text-right border-separate border-spacing-y-2 bg-white rounded-xl shadow-sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="py-2 px-3 font-bold text-gray-700 text-sm"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
            <th className="py-2 px-3" />
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-8 text-gray-400"
            >
              داده‌ای وجود ندارد
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="rounded-xl cursor-pointer">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-2 px-3 text-sm whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="py-2 px-3">
                <button className="text-primary-600 font-medium bg-[#EDE3C7] px-4 py-1 rounded-full text-sm">
                  بیشتر
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
