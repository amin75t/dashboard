"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/className";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { LucideProps } from "lucide-react";

type SidebarItem = {
  label: string;
  icon: JSX.Element;
  href: string;
};
type IconProps = {
  name: keyof typeof dynamicIconImports;
} & Omit<LucideProps, "ref">;

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = dynamic(dynamicIconImports[name]);
  return <IconComponent {...props} />;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "میزکار",
    icon: <Icon className="w-5 h-5" name="layout-grid" />,
    href: "/dashboard",
  },
  {
    label: "پرداخت",
    icon: <Icon className="w-5 h-5" name="credit-card" />,
    href: "/payments",
  },
  {
    label: "مدارک و گواهی‌ها",
    icon: <Icon className="w-5 h-5" name="files" />,
    href: "/documents",
  },
  {
    label: "اعلان‌ها",
    icon: <Icon className="w-5 h-5" name="bell" />,
    href: "/notifications",
  },
  {
    label: "پشتیبانی",
    icon: <Icon className="w-5 h-5" name="help-circle" />,
    href: "/support",
  },
  {
    label: "حساب کاربری",
    icon: <Icon className="w-5 h-5" name="settings" />,
    href: "/account",
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("/dashboard");

  return (
    <aside dir="rtl" className="w-64 h-screen bg-[#F8F8F8] flex flex-col justify-between py-6 px-4 rounded-r-3xl border-l border-gray-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-[#E8D9B7] rounded-full" />
          <span className="text-primary font-bold text-lg">اسم برند</span>
        </div>

        {/* Items */}
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setActive(item.href)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                  active === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-2">
        <Link
          href="/logout"
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600"
        >
          خروج از حساب
        </Link>
      </div>
    </aside>
  );
}
