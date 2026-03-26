import Image from 'next/image'
import React from 'react'

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Main(props: MainProps) {
  return (
    <div className={`${props.className} px-2 sm:px-6 md:px-12 py-12`}>
        <span className="text-4xl font-bold text-violet-600">
            ML, RUST, ROBOTICS, CUDA
        </span>
        <br />
        <br />
        <span className="text-base">
            I&apos;m a software engineer mostly focused on ML systems, robotics software, inference optimization, and low-level performance work.
        </span>
        <br />
        <span className="text-base">
            Right now I work at <a href="https://www.toolsforhumanity.com/" className="underline text-green-500">Tools for Humanity</a> as an ML and Rust engineer, working on robotics, optimizing GPU kernels, and building ML pipelines for Jetsons.
        </span>
        <br />
        <span className="text-base">
            I also do independent research around memory, continual learning, and real-world OR problems.
            You can find some of my research work on my <a href="/research-feed" className="underline text-green-500" target="_blank" rel="noreferrer">personal research feed</a> and {/* Synkrasis Labs */} <a href="https://synkrasis-labs.com/" className="underline text-green-500" target="_blank" rel="noreferrer">Synkrasis Labs</a>.
        </span>
        <br />
        <span className="text-base font-bold text-violet-500 w-full text-center flex justify-center items-center mt-2">
            I AM OBSESSED WITH&nbsp;<a href="https://living-factory.org" target="_blank" className="text-green-500 underline">WAREHOUSES AND FACTORIES</a>
        </span>
        <br />

        <div className="mt-8 w-full flex flex-col justify-start items-center">
            <Image
            className="rounded-lg"
            src="/assets/guts-berserk-guts.gif"
            alt="gif"
            width={500}
            height={500}
            />
            <span className="mt-2 text-center">
                I am obsessed with writing software, solving hard problems, building systems
                <br />
                and I will probably keep doing it until I die.
            </span>
            <span className="mt-2 text-center">
                <span className="md:whitespace-nowrap">
                    I FOUND MY CRAFT AND MY CRAFT HAS FOUND ME
                </span>
                <br />
                <span className="md:whitespace-nowrap">
                    MY ONLY GOAL IN LIFE SHALL BE TO MASTER IT
                </span>
                <br />
            </span>
        </div>

        <hr className="my-4 w-full self-center"/>

        <span className="text-lg text-violet-600 font-bold underline">
            Work Experience
        </span>
        <br />
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" rel="noreferrer" href="https://www.toolsforhumanity.com/">Tools for Humanity</a> - ML &amp; Rust Engineer
                &nbsp;<span className="text-sm">Mar 2026 - Present</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Working on robotics systems, ML infrastructure, and performance-critical software.
            </li>
            <li className="text-base">
                Optimizing GPU kernels and ML pipelines for Jetson deployments.
            </li>
            <li className="text-base">
                Building Rust and ML systems around real-world robotics constraints.
            </li>
            <span className="text-base font-bold text-violet-500">
                Rust, CUDA/C++, PyTorch, Jetson, Robotics
            </span>
        </div>

        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" rel="noreferrer" href="https://progressiverobotics.ai/">Progressive Robotics</a> - Machine Learning &amp; Robotics Engineer
                &nbsp;<span className="text-sm">Oct 2025 - Mar 2026</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Optimized CPU-bound RL environments, decreasing training time by around 2x.
            </li>
            <li className="text-base">
                Implemented GPU-optimized physics heuristic algorithms in CUDA to enable GPU-native training.
            </li>
            <li className="text-base">
                Designed the pretraining stack, synthetic data generation pipelines, and transformer-based physics-aware models.
            </li>
            <span className="text-base font-bold text-violet-500">
                PyTorch, CUDA/C++, Airflow, Zarr, GCP
            </span>
        </div>

        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" rel="noreferrer" href="https://delian.ai/">Delian Alliance Industries</a> - Backend/Infra &amp; Robotics Software Engineer
                &nbsp;<span className="text-sm">Feb 2025 - Oct 2025</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Designed and implemented the teleoperation streaming stack from scratch, lowering latency to ~150ms while making the stream much smoother.
            </li>
            <li className="text-base">
                Built custom monitoring / service management infrastructure for deployed devices.
            </li>
            <li className="text-base">
                Maintained the core gRPC library used across Olympus services and optimized detection models for NVIDIA Jetson deployments.
            </li>
            <span className="text-base font-bold text-violet-500">
                C++, Python, gRPC, ROS2, TensorRT, WebRTC, mediasoup, gstreamer
            </span>
        </div>
        
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                NAS-AI - Co-Founder &amp; CTO
                &nbsp;<span className="text-sm">Feb 2024 - Jun 2024</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Designed and deployed a real-time video streaming and object recognition product for manufacturing lines.
            </li>
            <li className="text-base">
                Improved client efficiency and reduced waste using edge-deployed CV algorithms.
            </li>
            <li className="text-base">
                Built a lightweight robotics stack and a custom OTA update service for deployed devices.
            </li>
            <span className="text-base font-bold text-violet-500">
                Python (OpenCV), Rust, MQTT, ZQM, C++, Docker, Raspberry Pi
            </span>
        </div>
        
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" rel="noreferrer" href="https://www.iq3solar.info/">IQ3Solar</a> - Full-Stack &amp; Data Engineer
                &nbsp;<span className="text-sm">Jul 2023 - Jan 2024</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Automated collection, processing, and storage of PV data.
            </li>
            <li className="text-base">
                Deployed ML algorithms with automated retraining and finetuning for individual systems.
            </li>
            <li className="text-base">
                Built a full-stack platform for tracking, monitoring, and analyzing PV-related data.
            </li>
            <span className="text-base font-bold text-violet-500">
                Python, XGBoost, AWS
            </span>
        </div>

        <hr className="my-4 w-full self-center"/>

        <span className="text-lg text-violet-600 font-bold underline">
            A Bit Of My Story
        </span>
        <br />
        <span className="text-base">
            Started programming in high school, mostly through gamedev and minecraft mods.
        </span>
        <br />
        <span className="text-base">
            Did ~14 months of military service as an EOD, learned python in parallel, and got my first freelance programming work in the meantime.
        </span>
        <br />
        <span className="text-base">
            Then I got into the <a className="underline text-green-500" href="https://www.ece.ntua.gr/en">ECE School</a> of <a className="underline text-green-500" href="https://ntua.gr/el/">NTUA</a> doing a MEng.
        </span>
        <br />
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            After around 1.5 years of studying I dropped out to work full-time in startups.
        </span>
        <br />
        <span className="text-base">
            I ended up working across energy, robotics, manufacturing, computer vision, AI systems, and infrastructure, while also co-founding companies and leading technical work.
        </span>
        <br />
        <span className="text-base">
            Eventually I realized the real constant was not startups or products, it was the need to learn hard things and solve problems at a high level.
        </span>
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            That&apos;s basically what I optimize for now.
        </span>
        <br />
        <span className="text-base">
            ML, robotics, systems, CUDA, research, and problems that force me to get better.
        </span>
        <br />
        <span className="text-base">
            Also still trying to finish NTUA at some point.
        </span>
        <br />
        <span className="text-base">
            PhD is not out of the question either.
        </span>

        <hr className="my-4 w-full self-center"/>

        <span className="text-lg text-violet-600 font-bold underline">
            Some projects I&apos;ve worked on:
        </span>
        <br />
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" rel="noreferrer" href="https://github.com/yiannisha/llm-tool/">llm-tool</a>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                A Python module that automatically turns functions into definitions for LLM tool calling.
            </li>
            <li className="text-base">
                Built with Rust for fast string parsing and low overhead.
            </li>
            <span className="text-base font-bold text-violet-500">
                Rust, Python
            </span>
        </div>
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" rel="noreferrer" href="https://github.com/yiannisha/zspotify/">zspotify</a> - Top Contributor
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Spotify song downloader without injecting into the Windows client.
            </li>
            <li className="text-base">
                Reached #1 trending on GitHub for a week.
            </li>
            <li className="text-base">
                Development stopped after a cease and desist letter from Spotify.
            </li>
            <span className="text-base font-bold text-violet-500">
                Python, Ffmpeg
            </span>
        </div>
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                RobinStore - Best MVP Award
                &nbsp;<span className="text-sm">Mar 2023</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Automated supermarket product scraping tool with real-time accurate data from all over Greece.
            </li>
            <li className="text-base">
                Proprietary product matching based on image and text embedding similarity.
            </li>
            <li className="text-base">
                Won Best MVP at the VAIM 2023 startup competition.
            </li>
            <span className="text-base font-bold text-violet-500">
                Python, JS, Embeddings
            </span>
        </div>

        <hr className="my-4 w-full self-center"/>

        <span className="text-base">
            Get in touch:
        </span>
        <br />
        <span className="text-base">
            <a className="text-xl underline text-green-500" href="mailto:hadjiyiannis.3@gmail.com">
                me@yiannisha.dev
            </a>
        </span>
    </div>
  )
}
