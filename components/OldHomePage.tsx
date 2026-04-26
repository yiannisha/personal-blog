import localFont from "next/font/local";
import Link from "next/link";

import Sidebar from "../pages/components/Sidebar";
import Main from "../pages/components/Main";

const geistSans = localFont({
  src: "../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../pages/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function OldHomePage() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="relative flex flex-col items-start border border-green-500 sm:items-start lg:flex-row">
        <div className="order-1 flex w-full justify-center px-2 pt-4 lg:order-2 lg:block lg:w-auto lg:pl-2 lg:pt-8">
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <Link href="/blog" className="text-green-500 underline">
              Blogs
            </Link>
            <Link href="/research-feed" className="text-green-500 underline">
              Feed &amp; Active Projects
            </Link>
          </div>
        </div>

        <Sidebar className="order-2 h-full w-full lg:order-1 lg:w-1/3 xl:w-1/4" />
        <Main className="order-3 w-full lg:order-3 lg:w-2/3 xl:w-3/4" />
      </main>
    </div>
  );
}
