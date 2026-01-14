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
          <h1 className="text-3xl font-bold text-violet-600">Reconstructive Memory for Learning Systems (v0)</h1>
          <div className="flex gap-4">
            <Link href="/blog" className="text-green-500 underline">All Posts</Link>
            <Link href="/" className="text-green-500 underline">Home</Link>
          </div>
        </div>
        <article className="prose prose-invert max-w-none">
          <p className="text-sm text-gray-500">Jan 2026</p>
          <p>
            Modern learning systems are getting increasingly better at reasoning, planning and acting however solutions aiming to represent their memory are becoming increasingly patchworked: longer context windows, vector databases, “reflection” summaries, replay buffers, world models, knowledge graphs.
Even though all of these components might help, there seems to be some standard failure modes: drift (context rot), brittle recall, confabulation, false overconfident “memories” that don’t survive scrutiny.
          </p>
          <br />
          <p>
            I believe it is important for the future of the ML field that the memory problem is not implicitly solved, but clearly defined, formalized, tested and evaluated.
          </p>
          <br />
          <p>
            The magic thing about ML is that many times you can just look back at how humans work for the solution.
          </p>
          <br />
          <p>
            The following is a Cognitive Science - based approach for framing the memory problem for learning systems.
          </p>
          {/* QUOTE */}
          <br />
          <p className="w-full text-center italic border-l-4 border-gray-600 pl-4 text-green-500">
            “Treat memory in learning systems as reconstructive inference”
          </p>
          {/* END QUOTE */}
          <br />
          <br />
          <p className="underline text-green-500">
            Reconstructive Memory in Cognitive Science
          </p>
          <p>
            A practical (and proven) way to understand human memory is as lossy compressions plus reconstruction. We store a compressed trace of experience (not every pixel and token) and later we reconstruct what we need for the current situation.
          </p>
          <br />
          <p>
            Reconstruction uses three ingredients:
          </p>
          <ul>
            <li><span className="underline text-green-500">Cue</span>: whatever the system uses as a handle to decide what to retrieve and how to interpret it (a question, a goal, the current situation)</li>
            <li><span className="underline text-green-500">Trace</span>: whatever was stored</li>
            <li><span className="underline text-green-500">Schema</span>: the learned structure that tells us what’s typical, causal, or relevant</li>
          </ul>
          <br />
          <p>
            From this perspective, distortions aren’t mysterious. If the trace is missing detail, reconstruction will lean more on the schema. If the cue is leading or adversarial, it can steer the reconstruction. If provenance (i.e. “where did this come from?”) is unclear, the reconstructed output can feel confident without being verifiable.
          </p>
          <br />
          <p className="underline text-green-500">Formalization</p>
          <p>
            With that lens, we can name the minimal pieces involved in recall and make the reconstruction problem explicit.
          </p>
          <br />
          <p className="underline text-green-500">Components</p>
          <ul>
            <li>
              <span className="underline text-green-500">Episodic trace z</span> : what was stored from past experience (often compressed).
              <div className="text-gray-400">Represents long-term memory</div>
              <div className="mt-2">Examples:</div>
              <ul className="list-disc pl-6">
                <li>LLM agents: retrieved documents, tool logs, chat history chunks</li>
                <li>Perception / robotics: sensor snapshots, map fragments</li>
                <li>VLMs / VLAs: short clips, keyframes, latent summaries of observations</li>
                <li>RL: replay buffer samples, trajectories</li>
              </ul>
            </li>
            <br />
            <li>
              <span className="underline text-green-500">Schema / prior s</span> : the learned structure that interprets traces and fills gaps.
              <div className="text-gray-400">Represents “intuition”: what the system believes is typical, causal or likely.</div>
              <div className="mt-2">Examples:</div>
              <ul className="list-disc pl-6">
                <li>Model parameters / weights</li>
                <li>Learned world model or transition model</li>
                <li>Learned task abstractions and skills</li>
                <li>Knowledge graphs</li>
                <li>Distilled summaries</li>
              </ul>
            </li>
            <br />
            <li>
              <span className="underline text-green-500">Cue c</span> : the current question/goal + context that triggers recall and shapes what gets reconstructed.
              <div className="text-gray-400">Represents working memory: it decides what’s relevant right now</div>
              <div className="mt-2">Examples:</div>
              <ul className="list-disc pl-6">
                <li>User prompt / query</li>
                <li>Current robot state and observation</li>
                <li>Planner subgoal</li>
                <li>A detected anomaly that triggers an investigation</li>
              </ul>
            </li>
            <br />
            <li>
              <span className="underline text-green-500">Reconstruction x</span> : the “memory content” the system produces for reasoning and action.
              <div className="text-gray-400">The usable belief derived from the trace.</div>
            </li>
          </ul>
          <br />
          <p>
            Under this framing, recall is not “read memory -&gt; output”. It’s closer to inference:
          </p>
          <pre className="bg-neutral-900/60 text-green-400 rounded p-3 overflow-x-auto"><code>p(x | z, s, c)</code></pre>
          <p>
            Meaning: the system forms a belief x by combining:
          </p>
          <ul className="list-disc pl-6">
            <li>evidence from stored traces <span className="underline text-green-500">z</span>,</li>
            <li>learned structure <span className="underline text-green-500">s</span>,</li>
            <li>and the current cue <span className="underline text-green-500">c</span> that determines what to retrieve and how to interpret it</li>
          </ul>
          <br />
          <p>This small equation forces a useful question:</p>
          <br />
          <p className="w-full italic border-l-4 border-gray-600 pl-4 text-green-500">
            When a system “remembers”, how much of that output is trace-grounded, and how much is the schema filling in the blanks?
          </p>
          <br />
          <p>
            Extending the proposed formalization and investigating the questions forced will help us:
          </p>
          <ul className="list-disc pl-6">
            <li>create a taxonomy of failure modes</li>
            <li>derive evaluation protocols that score not only correctness, but grounding, uncertainty, and provenance.</li>
          </ul>
          <br />
          <p className="underline text-green-500">Epilogue</p>
          <p>
            This post is meant as a gentle starting point, not a closed theory. The goal is to make one thing explicit: memory in learning systems is already reconstructive in practise, and we should treat it as a first-class research problem rather than an implicit byproduct of scaling context windows or bolting on retrieval.
          </p>
          <br />
          <p>
            In a follow-up, I want to turn this framing into something operational:
          </p>
          <ul className="list-disc pl-6">
            <li>a concrete taxonomy of failure modes (schema-dominant reconstruction, trace fragmentation, provenance collapse)</li>
            <li>evaluation protocols that score not only correctness, but grounding, uncertainty, and provenance.</li>
          </ul>
          <br />
          <p>
            If this framing resonates and you’re working on long-horizon agents, robotics, or continual learning, I’d love to compare notes; especially on where current systems fail in the wild, and what would count as a benchmark for “memory that stays useful over time”.
          </p>
        </article>
      </main>
    </div>
  );
}
