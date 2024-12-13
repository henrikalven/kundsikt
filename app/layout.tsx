"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Sidebar } from "@/components/sidebar";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className={plusJakartaSans.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="container mx-auto p-6 sm:p-8 max-w-5xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
