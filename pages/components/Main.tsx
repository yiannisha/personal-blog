import Image from 'next/image'
import React from 'react'

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Main(props: MainProps) {
  return (
    <div className={`${props.className} px-2 sm:px-6 md:px-12 py-12`}>
        <span className="text-base">
            Mediocre generalist software engineer, with some experience in hardware stuff as well.
        </span>
        <br />
        <span className="text-base">
            I like writing code and training shitty models in my free time.
        </span>
        <br />
        <span className="text-base">
            I also do it as a job sometimes.
        </span>
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            A bit of my story:
        </span>
        <br />
        <span className="text-base">
            Started programming in high school, mostly gamedev stuff.
        </span>
        <br />
        <span className="text-base">
            Did ~14 months of military service as an EOD, learned python and got my first freelance programming job in the meantime.
        </span>
        <br />
        <span className="text-base">
            Managed to get into the <a className="underline text-green-500" href="https://www.ece.ntua.gr/en">ECE School</a> of <a className="underline text-green-500" href="https://ntua.gr/el/">NTUA</a> doing a MEng.
        </span>
        <br />
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            After 1.5 year of studying I dropped out to work full-time in different startups including my own.
        </span>
        <br />
        <span className="text-base">
            In the span of 2 years I managed to work with 4-5 different startups, and co-founding 2 of them.
        </span>
        <br />
        <span className="text-base">
            I worked in energy (pv), finance, blockchain, manufacturing, computer vision, and AI projects.
        </span>
        <br />
        <span className="text-base">
            I was basically the tech lead in every single project I worked on.
        </span>
        <br />
        <span className="text-base">
            At that time working ~12-14 hours a day was the norm. I even had a weekly 18-20 hour session on Fridays.
        </span>
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            Eventually I realised that the reason I was doing all these stuff was more out of curiosity and the need to learn new things rather than the money/lifestyle.
        </span>
        <br />
        <span className="text-base">
            I <strong>LOVE</strong> learning new things and solving problems.
        </span>
        <br />
        <span className="text-base">
            I truly believe that this is the reason I am on this planet.
        </span>
        <br />
        <span className="text-base">
            So, I eventually converged onto a single project, <a className="text-green-500 underline" href="https://nas-ai.org">NAS-AI</a> which is by far my favourite project I EVER worked on.
        </span>
        <br />
        <span className="text-base">
            But I quickly ended up doing a lot non-technical stuff, which I loved but they were an obstacle to my learning.
        </span>
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            At that time I realised that in order to do what I value most - learning and solving problems - at it&apos;s highest level, I would need to get back to the basics and focus more on learning than on doing, at least for a while.
        </span>
        <br />
        <span className="text-base">
            So, now I&apos;m back in uni, finishing my MEng and working part-time in a startup that I love.
        </span>
        <br />
        <span className="text-base">
            Everything that I learned during my time working actually helped me a lot in my studies, to the point that I&apos;m gonna graduate around the time that I would have graduated if I didn&apos;t drop out.
        </span>
        <br />
        <span className="text-base">
            I also consider doing a PhD once I graduate.
        </span>
        <br />
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            Currently working as a SWE at <a target="_blank" className="text-xl underline text-green-500" href="https://heyfire.co">HeyFIRE</a>
        </span>
        <br />
        <span className="text-base">
            Also trying to graduate NTUA.
        </span>
        <br />
        <span className="text-base">
            On my way to break into the <span className="text-violet-500 font-bold">AI research / MLOps</span> field.
        </span>
        <br />
        <hr className="my-4 w-1/2"/>
        <span className="text-base">
            Get in touch:
        </span>
        <br />
        <span className="text-base">
            <a className="text-xl underline text-green-500" href="mailto:hadjiyiannis.3@gmail.com">
                me@yiannisha.dev
            </a>
        </span>

        <div className="mt-8 w-full flex flex-col justify-start items-center">
            <Image
            className="rounded-lg"
            src="/assets/guts-berserk-guts.gif"
            alt="gif"
            width={500}
            height={500}
            />
            <span className="mt-2 text-center">
                I am obsessed with writing software, solving problems, building projects
                <br />
                and I will probably never stop doing it (and trying to get better at it) until I die.
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
            Some projects I&apos;ve worked on:
        </span>
        <br />
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://github.com/yiannisha/llm-tool/">llm-tool</a>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                A simple Python module to automatically turn your functions into definitions that can be used for LLM tool calling. Built with Rust for blazing fast string parsing.
            </li>
            <span className="text-base font-bold text-violet-500">
                Rust, Python
            </span>
        </div>
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://github.com/yiannisha/zspotify/">zspotify</a> - Top Contributor
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Spotify song downloader without injecting into the windows client
            </li>
            <li className="text-base">
                Reached #1 trending on GitHub for a week
            </li>
            <li className="text-base">
                Development stopped after cease and desist letter from Spotify
            </li>
            <span className="text-base font-bold text-violet-500">
                Python, Ffmpeg
            </span>
        </div>
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://github.com/yiannisha/AmazonScrape-2.0/">Amazon-Scraper</a>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                A command line program used for scraping data from different categories in Amazon&apos;s Movers & Shakers.
            </li>
            <span className="text-base font-bold text-violet-500">
                Python
            </span>
        </div>

        <hr className="my-4 w-full self-center"/>

        <span className="text-lg text-violet-600 font-bold underline">
            Startups I cofounded:
        </span>
        <br />
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://nas-ai.org/">NAS-AI</a> - CTO
                &nbsp;<span className="text-sm">Feb 2024 - Jul 2024</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Developed and launched a system combining hardware and software for real-time video streaming and AI object recognition, improving factory production efficiency.
                <br />
                -&gt; Managed to hit very low latency with minimal hardware and infrastructure requirements (just a single CPU VPS on Digital Ocean).
                <br />
                -&gt; Improved efficiency by eliminating the need for constant human observation.
            </li>
            <li className="text-base">
                Used Python for core algorithms, C++ for critical hardware tasks, and Rust for secure back-end services, ensuring the software was robust and scalable.
            </li>
            <li className="text-base">
                Used Docker for streamlined and automatic software deployments, enhancing system reliability and simplifying updates.
                <br />
                -&gt; Managed to deploy updates, live, on production with no downtime.
            </li>
            <span className="text-base">
                <a className="text-green-500 underline" target="_blank" href="https://github.com/Neural-Automation-Solutions/cv-bottle-detection-system">Custom computer vision bottle detection algorithm</a> developed for a client&apos;s conveyor belt. The algorithm was parametricized and optimized using bayesian optimization for each use case.
            </span>
            <br />
            <span className="text-base">
                <a className="text-green-500 underline" target="_blank" href="https://github.com/Neural-Automation-Solutions/streaming-api">Custom video streaming service</a>
            </span>
            <br />
            <span className="text-base font-bold text-violet-500">
                Python (OpenCV), Rust, ZQM, MQTT, C++, Docker, Raspberry Pi
            </span>
        </div>

        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://robinstore.gr/">RobinStore</a> - CTO
                &nbsp;<span className="text-sm">Mar 2023 - Sep 2023</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Set up and maintain cloud-based infrastructure for automated data scraping, cleaning and processing.
                <br />
                The scraping service was capable of scraping and processing all products from every single supermarket eshop in Greece at the time - every day.
            </li>
            <li className="text-base">
                Implemented a product similarity service using Image Embeddings and a Vector Database.
            </li>
            <li className="text-base">
                Developed a full-stack mobile app that users could use to find the cheapest option for each product they wanted to buy.
            </li>
            <span className="text-base">
                Won the MVP award at VAIM 2023.
            </span>
            <br />
            <span className="text-base">
                Eventually another company showed interest in acquiring the web scraping algo.
            </span>
            <br />
            <span className="text-base font-bold text-violet-500">
                Web Scraping (JS & Python), Weaviate (Vector DB), Flutter
            </span>
        </div>

        <hr className="my-4 w-full self-center"/>

        <span className="text-lg text-violet-600 font-bold underline">
            Places I worked at:
        </span>
        <br />
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://heyfire.co/">HeyFIRE</a> - Software Engineer
                &nbsp;<span className="text-sm">Feb 2024 - Present</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Manage the development of an AI Agent used by our users to automate tasks and analyse financial data.
            </li>
            <li className="text-base">
                Build and maintain a client-side caching service which reduced the load time of the app.
            </li>
            <li className="text-base">
                Develop and deploy features used by 100s users daily, including an onboarding achievement service.
            </li>
            <span className="text-base font-bold text-violet-500">
                JS, Flask, Python, LLMs
            </span>
        </div>
        
        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="underline text-green-500" target="_blank" href="https://www.iq3solar.info/?page=products">IQ3Solar</a> - Software Engineer
                &nbsp;<span className="text-sm">Oct 2023 - Feb 2024</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Set up and maintain infrastructure for the automated collection, processing and saving of the PV data.
            </li>
            <li className="text-base">
                Integrate Machine Learning algorithms into the production, including automated training and live visualization.
            </li>
            <li className="text-base">
                Build a full-stack platform for tracking, monitoring and analysing PV-related data and insights.
            </li>
            <span className="text-base font-bold text-violet-500">
                Scikit, XGBoost, Python, NextJS, R
            </span>
        </div>

        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="text-green-500 underline" target="_blank" href="https://wattz.org">Wattz</a> - Full-Stack and Blockchain Engineering
                &nbsp;<span className="text-sm">Jul 2023 - Feb 2024</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Maintain and Develop full-stack web decentralised applications.
            </li>
            <li className="text-base">
                Test, debug, maintain and develop smart contracts written in Solidity deployed on the Polygon network.
            </li>
            <li className="text-base">
                Develop processes for managing complex payment and transaction systems, combining both crypto and
                fiat transactions for users and the marketplace, ensuring a smooth and secure exchange of assets.
            </li>
            <span className="text-base font-bold text-violet-500">
                NextJS, Bun, Hardhat, Solidity
            </span>
        </div>

        <div className="px-4 mt-4">
            <span className="text-lg font-bold">
                <a className="text-green-500 underline" target="_blank" href="#">AnvetoMarketers</a> - Full-Stack Engineering Internship
                &nbsp;<span className="text-sm">Oct 2022 - Jan 2023</span>
            </span>
            <hr className="mb-2 w-1/2" />
            <li className="text-base">
                Build full-stack, reusable plugins used by other developers in the company.
            </li>
            <li className="text-base">
                Build a calendar plugin synchronized with the site admin&apos;s Google Calendar and allows site visitors to book meetings that are then automatically imported into the admin&apos;s Google Calendar.
            </li>
            <li className="text-base">
            Configurable, scalable user registration forms paired with an admin page that allows each admin (based on their role) to view and edit user data.
            </li>
            <span className="text-base font-bold text-violet-500">
                VueJS, PHP
            </span>
        </div>
    </div>
  )
}
