"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  // console.log(path)
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Link href={"/"}>
        <Image src={"/logo-sidebar.png"} width={160} height={100} />
      </Link>

      <div className="mt-5">
        {menuList.map((e, i) => (
          <Link href={e.path} key={i}>
            <h2
              className={`flex gap-2 mb-2 items-center text-gray-500
              font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100
              ${path == e.path && "text-primary bg-blue-100"}
            `}
            >
              <e.icon />
              {e.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-10 p-5 flex items-center gap-2">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;


