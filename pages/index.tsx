import { useEffect, useRef, useState } from "react";
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

const songListLength = 3;

export default function Home() {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // @ts-expect-error -- IGNORE
      audioRef.current.onended = () => {
        setCurrentSong((currentSong + 1) % songListLength);
        // @ts-expect-error -- IGNORE
        audioRef.current.src = `/assets/audio/${currentSong}.mp3`;
        // @ts-expect-error -- IGNORE
        audioRef.current.play();
      }
      
      // @ts-expect-error -- IGNORE
      audioRef.current.play();
    }
  }, []);

  // Function to play the audio
  const handlePlay = () => {
    if (audioRef.current) {
      // @ts-expect-error -- IGNORE
      audioRef.current.play();
      setPaused(false);
    }
  };

  // Function to pause the audio
  const handleStop = () => {
    if (audioRef.current) {
      // @ts-expect-error -- IGNORE
      audioRef.current.pause();
      // audioRef.current.currentTime = 0; // Reset the audio to the beginning
      setPaused(true);
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-2 sm:p-4 md:p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      {/* <audio ref={audioRef} src="/assets/audio/1.mp3" autoPlay /> */}
      <main className="relative flex flex-col lg:flex-row items-start sm:items-start border border-green-500">
        {/* {
          paused ?
          <button
          className="absolute top-0 right-0 text-violet-500 font-bold bg-white"
          onClick={handlePlay}>🎵Play</button>
          :
          <button
          className="absolute top-0 right-0 text-violet-500 font-bold bg-white"
          onClick={handleStop}>🎵Stop</button>
        } */}
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
