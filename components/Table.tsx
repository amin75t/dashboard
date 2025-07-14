"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from "@tanstack/react-table";
import { RowType } from "@/lib/types/tableTypes";

type Props<T> = {
  table: ReactTable<T>;
  columns: ColumnDef<RowType>[];
};

export default function DataTable<T>({ table, columns }: Props<T>) {
  return (
    <table className="w-full text-right border-separate border-spacing-y-2 bg-white rounded-xl shadow-sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="py-2 px-3 font-bold text-gray-700 text-sm"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody >
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
          table.getRowModel().rows.map((row) => {
            const isSpecial = row.getValue("status") == "در حال بررسی";
            return (
              <tr
                style={{
                  backgroundColor: isSpecial ? "#FCFAF0" : "#F7F7F7",
                }}
                key={row.id}
                className="rounded-xl cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="py-2  px-3 text-sm whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
