import localFont from "next/font/local";
import Link from "next/link";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function HelloWorldPost() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-violet-600">Hello World</h1>
          <div className="flex gap-4">
            <Link href="/blog" className="text-green-500 underline">All Posts</Link>
            <Link href="/" className="text-green-500 underline">Home</Link>
          </div>
        </div>
        <article className="prose prose-invert max-w-none">
          <p className="text-sm text-gray-500">Oct 2025</p>
          <p>
            This is a sample blog post written in the same overall style as the home page. I&apos;ll use this space to share updates, notes, and occasional deep-dives into things I&apos;m learning or building.
          </p>
          <p>
            Topics I like lately: CUDA, Rust, LLM agents, GPU architecture, and stats. Expect experiments, breakdowns, and maybe some rants.
          </p>
          <p>
            More posts coming soon.
          </p>
        </article>
      </main>
    </div>
  );
}

