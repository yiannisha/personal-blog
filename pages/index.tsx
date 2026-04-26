import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const backgroundAudio = {
  src: "/Let%27s%20run%20far%20away%20%20playlist.mp3",
  label: "Let's run far away",
};

const focusAreas = [
  "Robotics systems",
  "ML infrastructure",
  "CUDA, Rust, and performance work",
];

const selectedWork = [
  {
    title: "Research Feed",
    type: "Ongoing",
    period: "Current",
    href: "/research-feed",
    summary:
      "A running log of research notes, active projects, and work around memory, continual learning, and real-world systems.",
  },
  {
    title: "llm-tool",
    type: "Open Source",
    period: "Python + Rust",
    href: "https://github.com/yiannisha/llm-tool/",
    summary:
      "A library for turning Python functions into LLM tool definitions, with Rust used where parsing speed and low overhead matter.",
  },
  {
    title: "RobinStore",
    type: "Product",
    period: "Best MVP Award",
    href: "/old-index",
    summary:
      "A supermarket product scraping and matching system built around real-time data collection, retrieval, and embedding-based similarity.",
  },
  {
    title: "NAS-AI",
    type: "Company",
    period: "Co-Founder / CTO",
    href: "/old-index",
    summary:
      "Manufacturing-focused computer vision and streaming systems built for live production environments and edge deployment.",
  },
];

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/research-feed", label: "Research Feed" },
  { href: "/old-index", label: "Old Index" },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.35;

    const startPlayback = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAudioBlocked(false);
      } catch {
        setIsPlaying(false);
        setAudioBlocked(true);
      } finally {
        setAudioReady(true);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setAudioBlocked(false);
    };
    const handlePause = () => setIsPlaying(false);
    const unlockAudio = () => {
      if (audio.paused) {
        void startPlayback();
      }

      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    void startPlayback();
    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio, { passive: true });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020309] text-zinc-100">
      <audio
        ref={audioRef}
        src={backgroundAudio.src}
        loop
        autoPlay
        playsInline
        preload="auto"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_28%),linear-gradient(180deg,_transparent_0%,_rgba(2,3,9,0.4)_36%,_rgba(2,3,9,0.9)_100%)]" />

      <div className="fixed right-4 top-1/2 z-20 -translate-y-1/2 sm:right-6">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md">
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-[10px] uppercase tracking-[0.16em] text-zinc-200 transition hover:text-white ${
              audioBlocked
                ? "border-white/20 bg-white/10 hover:border-white/35"
                : "border-white/10 hover:border-white/25"
            }`}
            aria-label={isPlaying ? "Pause background audio" : "Play background audio"}
          >
            {isPlaying ? "II" : audioBlocked ? "Tap" : "Play"}
          </button>
          <div className="min-w-0 pr-1">
            <p className="truncate text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Audio
            </p>
            <p className="truncate text-xs text-zinc-300">{backgroundAudio.label}</p>
            <p className="text-[10px] text-zinc-600">
              {audioReady
                ? isPlaying
                  ? "live"
                  : audioBlocked
                    ? "browser blocked autoplay"
                    : "ready"
                : "loading"}
            </p>
          </div>
        </div>
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-between px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5 text-xs uppercase tracking-[0.22em] text-zinc-500">
          <span>Yiannis Hadjiyianni</span>
          <a
            href="https://github.com/yiannisha"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-200"
          >
            GitHub
          </a>
        </header>

        <section className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              ML Systems / Robotics / Performance
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] text-white sm:text-7xl">
              Dark, direct,
              <br />
              and built around the work.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              I work on robotics software, inference optimization, GPU-heavy ML
              systems, and research around continual learning, memory and (random nerd-snipe) neural combinatorial optimization for real-world operation research use cases.
            </p>

            <div className="mt-10 grid max-w-xl gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  Startups
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">3 / 0</p>
                <p className="mt-2 text-sm text-zinc-400">
                  failed startups / success stories
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  Publications
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">2 / 2</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  NeurIPS, MLSys / first-author
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative w-full max-w-[260px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
              <Image
                src="/assets/x_prof.jpg"
                alt="Portrait"
                width={400}
                height={400}
                priority
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 240px, 60vw"
                className="h-auto w-full object-cover object-center grayscale"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,9,0.02)_0%,rgba(2,3,9,0.14)_52%,rgba(2,3,9,0.48)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/25" />
            </div>

            <nav className="flex flex-col items-start gap-4 border-l border-white/10 pl-6 text-sm text-zinc-300">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="grid gap-6 border-t border-white/10 py-8 sm:grid-cols-3">
          {focusAreas.map((item) => (
            <div key={item} className="space-y-3">
              <div className="h-px w-10 bg-white/20" />
              <p className="text-sm leading-7 text-zinc-300">{item}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-white/10 py-10 sm:py-12">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Some of my work
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Project-oriented work, not just roles.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              A short list in roughly reverse chronological order, closer to the
              things I actually built or pushed forward.
            </p>
          </div>

          <div className="mt-10 grid gap-0 border-t border-white/10">
            {selectedWork.map((item) => {
              const isInternal = item.href.startsWith("/");

              return (
                <article
                  key={`${item.title}-${item.period}`}
                  className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[minmax(0,1fr)_160px]"
                >
                  <div>
                    {isInternal ? (
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-white transition hover:text-zinc-300"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-medium text-white transition hover:text-zinc-300"
                      >
                        {item.title}
                      </a>
                    )}
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                      {item.summary}
                    </p>
                  </div>

                  <div className="space-y-1 text-left sm:text-right">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                      {item.type}
                    </p>
                    <p className="text-sm text-zinc-300">{item.period}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
