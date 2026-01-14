import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
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

type Props = {
  blogTitle: string;
  blogPreview: string;
  blogSlug: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const mdPath = path.join(process.cwd(), "blog.md");

  let blogTitle = "Reconstructive Memory for Learning Systems";
  let blogPreview = "";

  const raw = fs.readFileSync(mdPath, "utf8");
  const titleMatch = raw.match(/^\s*Title:\s*(.+)$/m);
  if (titleMatch) blogTitle = titleMatch[1].trim();

  // Find first meaningful paragraph after the title
  const afterTitle = raw.split(/\r?\n/).slice(1).join("\n");
  const firstPara = (afterTitle.split(/\n\s*\n/).map((b) => b.trim()).find(Boolean) || "")
    .replace(/\s+/g, " ");
  blogPreview = firstPara.length > 160 ? firstPara.slice(0, 157) + "…" : firstPara;

  const blogSlug = blogTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return { props: { blogTitle, blogPreview, blogSlug } };
};

export default function BlogIndex({ blogTitle, blogPreview, blogSlug }: Props) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-violet-600">Blog</h1>
          <Link href="/" className="text-green-500 underline">Home</Link>
        </div>
        <p className="text-base text-gray-300 mb-6">Thoughts, notes, and experiments.</p>

        <ul className="space-y-4">
          <li className="border border-neutral-700 rounded p-4 hover:bg-neutral-900/60 transition">
            <Link href="/blog/hello-world" className="block">
              <span className="text-xl font-semibold text-white">Hello World</span>
              <div className="text-sm text-gray-400">A sample post to get things started.</div>
              <div className="text-xs text-gray-500 mt-1">Oct 2025</div>
            </Link>
          </li>
          <li className="border border-neutral-700 rounded p-4 hover:bg-neutral-900/60 transition">
            <Link href={`/blog/${blogSlug}`} className="block">
              <span className="text-xl font-semibold text-white">{blogTitle}</span>
              <div className="text-sm text-gray-400">{blogPreview}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</div>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
