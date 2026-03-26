import localFont from "next/font/local";

import FeedAdminPage from "@/components/FeedAdminPage";
import { isFeedAdminEnabled } from "@/lib/feed-admin-access";
import { getFeedPageData } from "@/lib/feed";
import type { FeedEntry, FeedProject } from "@/lib/feed";

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

type FeedAdminRouteProps = {
  projects: FeedProject[];
  entries: FeedEntry[];
};

export default function FeedAdminRoute(props: FeedAdminRouteProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <FeedAdminPage {...props} />
    </div>
  );
}

export function getServerSideProps() {
  if (!isFeedAdminEnabled()) {
    return {
      notFound: true,
    };
  }

  return {
    props: getFeedPageData(),
  };
}
