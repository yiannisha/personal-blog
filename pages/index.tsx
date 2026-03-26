import localFont from "next/font/local";

import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="relative flex flex-col lg:flex-row items-start sm:items-start border border-green-500">
        {/* Navigation links: above the card on mobile, to the right of the card on desktop */}
        <div className="order-1 lg:order-2 w-full lg:w-auto px-2 pt-4 lg:pt-8 lg:pl-2 flex lg:block justify-center">
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <Link
              href="/blog"
              className="text-green-500 underline"
            >
              Blogs
            </Link>
            <Link
              href="/research-feed"
              className="text-green-500 underline"
            >
              Feed & Active Projects
            </Link>
          </div>
        </div>

        <Sidebar className="order-2 lg:order-1 w-full lg:w-1/3 xl:w-1/4" />
        <Main className="order-3 lg:order-3 w-full lg:w-2/3 xl:w-3/4" />
      </main>
    </div>
  );
}
