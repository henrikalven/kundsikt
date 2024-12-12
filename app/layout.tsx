"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <html lang="no">
      <body className={plusJakartaSans.className}>
        <Sidebar onExpandedChange={setSidebarExpanded} />
        <div className="flex h-screen overflow-hidden">
          <div className={cn("flex-1 overflow-auto transition-all duration-300", sidebarExpanded ? "ml-64" : "ml-16")}>
            <main className="container mx-auto p-6 sm:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
