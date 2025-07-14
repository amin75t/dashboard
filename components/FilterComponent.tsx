import { TableFilter } from "@/lib/types/tableTypes";
import { ChevronDown, Package, Calendar, CreditCard } from "lucide-react";
import React, { useState } from "react";

export enum TestStatus {
  UnderReview = "در حال بررسی",
  TestStarted = "شروع تست",
  TestCompleted = "اتمام تست",
}
// const statusColors: Record<TestStatus, string> = {
//   [TestStatus.UnderReview]: "#FABB05", // زرد
//   [TestStatus.TestStarted]: "#34A853", // سبز
//   [TestStatus.TestCompleted]: "#4285F4", // آبی
// };

interface FilterComponentProps {
  filters: TableFilter[];
}
export const FilterComponent = React.memo(function FilterComponent({
  filters,
}: FilterComponentProps) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const getIconForKey = (key: string) => {
    switch (key) {
      case "name":
        return Package;
      case "pay":
        return CreditCard;
      case "status":
        return Calendar;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((filter) => {
        const IconComponent = getIconForKey(filter.key);
        const selectedOption = filter.options.find(
          (opt) => opt.value === filter.value
        );

        return (
          <div key={filter.key} className="relative">
            <button
              className="w-[250px] rounded-[4.5px] border-gray-300 px-3 py-2 bg-white flex items-center gap-2 min-w-[140px] text-sm text-gray-800 hover:border-gray-400 transition-colors"
              onClick={() =>
                setDropdownOpen(dropdownOpen === filter.key ? null : filter.key)
              }
              type="button"
            >
              {IconComponent && (
                <IconComponent className="w-4 h-4 text-gray-500" />
              )}
              <span className="flex-1 text-right">
                {selectedOption?.label || filter.label}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  dropdownOpen === filter.key ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen === filter.key && (
              <div className="absolute w-[250px] z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px] text-sm">
                {filter.options.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-right ${
                      filter.value === option.value
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-800"
                    }`}
                    onClick={() => {
                      filter.onChange(option.value);
                      setDropdownOpen(null);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

