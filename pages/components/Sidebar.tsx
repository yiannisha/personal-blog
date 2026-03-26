import React from 'react'
import Image from 'next/image'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar(props: SidebarProps) {
  return (
    <div className={`${props.className} border border-red h-full p-4 pt-8 flex flex-col justify-center items-center`}>
        <Image
          className="dark:invert rounded-full"
          src="/assets/x_prof.jpg"
          alt="Me"
          width={180}
          height={38}
          priority
        />
        <span className="text-base text-center my-4">
            yiannisha&nbsp;
            <a
            className="text-green-500 underline"
            href="https://github.com/yiannisha"
            target="_blank"
            >
                Github
            </a>
        </span>

        <hr className="border-white w-full" />

        <span className="text-base text-center my-4">STATS</span>
        <span className="text-base text-center my-4 flex flex-row items-center">
            <span className="text-green-500 underline cursor-pointer">3</span>
            &nbsp;FAILED STARTUPS
        </span>
        <span className="text-base text-center my-4 flex flex-row items-center">
            <span className="text-blue-500 underline cursor-pointer">0</span>
            &nbsp;SUCCESS STORIES
        </span>
        <span className="text-base text-center my-4 flex flex-row items-center underline">
            COUNTLESS MORE FAILURES
        </span>

        <span className="text-base text-center my-4 mb-2 flex flex-row items-center underline">
            CURRENT OBSESSIONS
        </span>
        <span className="text-base text-center mb-4 flex flex-row items-center">
            ML&RL, CUDA, RUST, GPU&nbsp;Architecture,
            <br />
            real-world operations research problems for warehouses and factories,
            <br />
            continual learning, memory systems and robotic agents
        </span>

        <span className="text-base text-center my-4 mb-2 flex flex-row items-center underline">
            THINGS IM GOOD AT
        </span>
        <span className="text-base text-center mb-4 flex flex-row items-center">
            -
        </span>
    </div>
  )
}
