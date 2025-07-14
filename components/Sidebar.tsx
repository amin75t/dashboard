"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils/className";

type SidebarItem = {
  label: string;
  icon: JSX.Element;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "میزکار",
    icon: <Image alt="icon" src="/icons/Vector.svg" width={20} height={20} />,
    href: "/",
  },
  {
    label: "پرداخت",
    icon: <Image alt="icon" src="/icons/Vector.svg" width={20} height={20} />,
    href: "/payments",
  },
  {
    label: "مدارک و گواهی‌ها",
    icon: <Image alt="icon" src="/icons/Vector.svg" width={20} height={20} />,
    href: "/documents",
  },
  {
    label: "اعلان‌ها",
    icon: <Bell className="w-5 h-5 text-gray-600" />,
    href: "/notifications",
  },
  {
    label: "پشتیبانی",
    icon: <Image alt="icon" src="/icons/suport.svg" width={20} height={20} />,
    href: "/support",
  },
  {
    label: "حساب کاربری",
    icon: <Settings className="w-5 h-5 text-gray-600" />,
    href: "/account",
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("/dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      dir="rtl"
      className={cn(
        "flex flex-col justify-between h-screen py-6 px-2 bg-white border-l border-gray-200 transition-width duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div>
        <div
          className={cn(
            "flex items-center mb-10 transition-opacity duration-300",
            collapsed ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="w-10 h-10 bg-[#E8D9B7] rounded-full" />
          <span className="mr-2 text-lg font-bold text-[#20B9C5]">
            اسم برند
          </span>
        </div>

        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setActive(item.href)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-colors duration-200",
                  collapsed ? "justify-center" : "",
                  active === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.icon}
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("flex items-center", collapsed?" justify-center":" justify-between")}>
        <Link
          href="/logout"
          className={cn(
            "flex blok items-center gap-2 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100",
            collapsed ? "justify-center hidden" : ""
          )}
        >
          <span className="text-sm text-center block text-gray-700">
            {!collapsed && "خروج از حساب"}
          </span>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 p-2 rounded-full hover:bg-gray-200 transition"
          aria-label={collapsed ? "باز کردن سایدبار" : "بستن سایدبار"}
        >
          <div
            className={cn(
              "w-4 h-4 border-t-2 border-r-2 transform transition-transform",
              collapsed ? "rotate-230" : " rotate-45"
            )}
          />
        </button>
      </div>
    </aside>
  );
}
