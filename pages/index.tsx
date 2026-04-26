import Image from "next/image";
import Link from "next/link";
import katex from "katex";
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
    title: "Orb",
    company: "Tools for Humanity",
    period: "Current",
    model: "orb",
    summary:
      "ML and systems work around the Orb stack, spanning robotics-adjacent software, deployment-heavy inference paths, and performance-sensitive infrastructure.",
  },
  {
    title: "Custom GPU-Palletizing RL Environments",
    company: "Progressive Robotics",
    period: "2025 - 2026",
    model: "stack",
    summary:
      "Designed and optimized custom reinforcement learning environments for palletizing, pushing CPU bottlenecks onto the GPU and making training loops materially faster.",
  },
  {
    title: "Teleoperation Infrastructure",
    company: "Delian",
    period: "2025",
    model: "frame",
    summary:
      "Built the low-latency teleoperation stack for deployed systems, including streaming, service orchestration, and the infrastructure needed to keep the loop responsive.",
  },
  {
    title: "NVision",
    company: "NAS-AI (Co-Founder / CTO)",
    period: "2024",
    model: "beam",
    summary:
      "A manufacturing computer vision system built for live production lines, focused on edge deployment, real-time streaming, and practical operational value.",
  },
  {
    title: "Robin",
    company: "RobinStore (Co-Founder / CTO)",
    period: "2023",
    model: "grid",
    summary:
      "A supermarket product scraping and matching system for large-scale catalog retrieval, normalization, and embedding-based product similarity.",
  },
];

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/research-feed", label: "Research Feed" },
  { href: "/old-index", label: "Old Index" },
];

const lifeObjectiveEquation = katex.renderToString(
  String.raw`\max_\pi \; \mathbb{E}_\pi \left[\sum_t \gamma^t \mathbf{1}\{\text{shipped}_t\}\,\text{HumanUtility}_t\right]`,
  {
    displayMode: true,
    throwOnError: false,
  },
);

const realizedReturnEquation = katex.renderToString(
  String.raw`\sum_t \gamma^t \mathbf{1}\{\text{shipped}_t = 1 \;\wedge\; \text{HumanUtility}_t > 0\}`,
  {
    displayMode: false,
    throwOnError: false,
  },
);

function WorkModel({ type }: { type: string }) {
  if (type === "orb") {
    return (
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.92),rgba(126,147,255,0.42)_18%,rgba(33,44,90,0.7)_48%,rgba(4,6,16,0.08)_74%)] shadow-[0_0_60px_rgba(117,136,255,0.24)]" />
        <div className="absolute inset-x-4 bottom-1 h-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(113,134,255,0.3),transparent_70%)] blur-md" />
      </div>
    );
  }

  if (type === "stack") {
    return (
      <div className="relative h-24 w-24 [perspective:900px]">
        <div className="absolute left-3 top-10 h-11 w-14 -rotate-[24deg] rounded-lg border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(132,225,255,0.4),rgba(19,33,53,0.9))] shadow-[0_10px_40px_rgba(62,177,255,0.15)] [transform:rotateX(68deg)_rotateZ(-14deg)]" />
        <div className="absolute left-7 top-6 h-11 w-14 -rotate-[24deg] rounded-lg border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(132,225,255,0.32),rgba(16,25,43,0.92))] [transform:rotateX(68deg)_rotateZ(-14deg)]" />
        <div className="absolute left-11 top-2 h-11 w-14 -rotate-[24deg] rounded-lg border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(132,225,255,0.24),rgba(13,19,35,0.96))] [transform:rotateX(68deg)_rotateZ(-14deg)]" />
      </div>
    );
  }

  if (type === "frame") {
    return (
      <div className="relative h-24 w-24 [perspective:900px]">
        <div className="absolute left-5 top-4 h-14 w-14 rounded-sm border border-white/20 [transform:rotateX(58deg)_rotateY(-18deg)]" />
        <div className="absolute left-8 top-8 h-14 w-14 rounded-sm border border-white/10 [transform:rotateX(58deg)_rotateY(-18deg)]" />
        <div className="absolute left-5 top-4 h-14 w-14 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_60%)] [transform:rotateX(58deg)_rotateY(-18deg)]" />
      </div>
    );
  }

  if (type === "beam") {
    return (
      <div className="relative h-24 w-24 [perspective:900px]">
        <div className="absolute left-8 top-3 h-18 w-8 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,161,97,0.46)_22%,rgba(58,22,11,0.94)_100%)] shadow-[0_0_40px_rgba(255,138,76,0.2)] [transform:rotateX(62deg)_rotateZ(20deg)]" />
        <div className="absolute left-4 top-14 h-px w-16 bg-white/10" />
      </div>
    );
  }

  return (
    <div className="relative h-24 w-24 [perspective:900px]">
      <div className="absolute left-4 top-4 grid grid-cols-3 gap-1 [transform:rotateX(58deg)_rotateZ(-18deg)]">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-4 w-4 rounded-sm border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(18,22,35,0.92))]"
          />
        ))}
      </div>
    </div>
  );
}

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
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yiannisha"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yiannis-hadjiyianni-36294b1b1/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-200"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/yiannisha"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-200"
            >
              X
            </a>
          </div>
        </header>

        <section className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              ML Systems / Robotics / Performance
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] text-white sm:text-7xl">
              i care about
              <br />
              building things that matter.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              i work on robotics software, inference optimization, GPU-heavy ML
              systems, and research around continual learning, memory and (random nerd-snipe) neural combinatorial optimization for real-world operation research use cases.
            </p>

            <div className="mt-8 max-w-3xl border-l border-white/10 pl-5">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">
                Life Objective
              </p>
              <p className="mt-3 text-base text-zinc-300">
                My life&apos;s RL objective is
              </p>
              <div
                className="mt-4 overflow-x-auto text-zinc-100 [&_.katex-display]:my-0 [&_.katex]:text-[1.02rem] [&_.mord]:text-zinc-100"
                dangerouslySetInnerHTML={{ __html: lifeObjectiveEquation }}
              />
              <p className="mt-4 text-base leading-8 text-zinc-300 sm:text-lg">
                ship things that matter, over a long horizon.
              </p>
            </div>

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
              Some of my work
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              realized return so far.
            </p>
            <div className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
              <span>the discounted sum of things where </span>
              <span
                className="mx-1 text-zinc-300 [&_.katex]:text-[0.98rem]"
                dangerouslySetInnerHTML={{ __html: realizedReturnEquation }}
              />
            </div>
          </div>

          <div className="mt-10 grid gap-0 border-t border-white/10">
            {selectedWork.map((item) => {
              return (
                <article
                  key={`${item.title}-${item.period}`}
                  className="grid gap-6 border-b border-white/10 py-6 sm:grid-cols-[96px_minmax(0,1fr)_160px] sm:items-center"
                >
                  <div className="flex items-center justify-start sm:justify-center">
                    <WorkModel type={item.model} />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-zinc-500">
                      {item.company}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                      {item.summary}
                    </p>
                  </div>

                  <div className="space-y-1 text-left sm:text-right">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                      Project
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
