import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Fira_Code, Mulish } from "next/font/google";
const firaCode = Fira_Code({ subsets: ["latin"] });
const bold = Mulish({ weight: "800", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between py-20">
      <article className="flex flex-col gap-10">
        <div>
          <header className={`text-4xl ${bold.className}`}>
            My Love/Hate Relationship With Vercel
          </header>
          <div className="font-thin pt-2 opacity-50">
            Posted Tuesday, Aug 20, 2024 - 200 words, ~2 minutes
          </div>
        </div>

        <div className="text-lg font-light opacity-80">
          As a developer, finding the perfect platform to deploy your projects
          is like finding the right tool for a complex task—it can make or break
          your workflow. When I first discovered Vercel, it felt like a breath
          of fresh air.
        </div>

        <h1 className="text-3xl font-bold">
          The Beauty of Vercel's User Experience
        </h1>

        <div>
          <div className="flex flex-col gap-y-6 text-lg font-light opacity-80">
            <h2 className="text-2xl font-bold">A Seamless Workflow</h2>
            <div>
              Vercel is designed with developers in mind, and it shows. From the
              moment you sign up, the platform guides you through the deployment
              process with an ease that's almost addictive. Whether you're
              deploying a static site, a serverless function, or a complex{" "}
              <a
                className="text-[#1565c0] no-underline transition-all ease-in duration-200 hover:underline"
                href="https://nextjs.org/"
              >
                Next.js
              </a>{" "}
              application, Vercel has streamlined the experience so that even a
              novice can get their project live with minimal friction.
            </div>

            <div>
              One of the standout features is the automatic deployment from
              GitHub. Just push your changes to the main branch, and Vercel
              handles the rest. There's no need for manual configuration or
              tedious setups—Vercel's smart enough to recognize your project's
              framework and adjust accordingly. This level of automation is a{" "}
              <b className={bold.className}>game-changer</b> for productivity,
              allowing me to focus more on writing code and less on managing
              deployments. The dashboard is another area where Vercel shines.
              It's clean, intuitive, and provides all the necessary information
              at a glance.
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-6 text-lg font-light opacity-80">
            <h2 className="text-2xl font-bold">Developer Focused Features</h2>

            <div>
              I can monitor my deployments,
              <code className="px-2 py-1 text-inherit bg-stone-200 rounded text-sm">
                view logs
              </code>
              , and manage environments without jumping through hoops. The
              thoughtful design makes it a pleasure to use, turning what could
              be a stressful part of development into something I actually look
              forward to.
            </div>

            <SyntaxHighlighter
              language="typescript"
              style={dracula}
              codeTagProps={{
                style: { ...firaCode.style, scrollPaddingLeft: "0.5em" },
              }}
              wrapLongLines
            >
              {`const summaryRanges = (nums: number[]) => {
  let ranges: string[] = [];
  let start = 0;

  if (nums.length === 0) return [];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] + 1) {
      if (i <= start + 1) ranges.push(nums[start].toString());
      else ranges.push(\`\${nums[start]}->\${nums[i - 1]}\`);
      start = i;
    }
  }

  if (start === nums.length - 1) ranges.push(nums[start].toString());
  else ranges.push(\`\${nums[start]}->\${nums[nums.length - 1]}\`);

  return ranges;
};`}
            </SyntaxHighlighter>
          </div>
        </div>

        <h1 className="text-3xl font-bold">
          The Frustration of Vercel's Pricing
        </h1>

        <div>
          <div className="flex flex-col gap-y-6 text-lg font-light opacity-80">
            <div>
              However, this love affair hits a snag when it comes to Vercel's
              pricing. For small projects or personal use, the free tier is
              generous. But as soon as your needs scale even slightly, the costs
              can escalate quickly. The leap from the free tier to the Pro plan
              feels steep, and for many developers, it might be hard to justify
              the expense, especially for side projects or smaller clients.
            </div>

            <div>
              The pricing model is based on bandwidth and build execution, which
              can be a double-edged sword. On the one hand, it's great that
              you're only paying for what you use. On the other hand, it can be
              difficult to predict how much you'll end up spending, especially
              if your project experiences sudden traffic spikes or requires
              frequent builds. The lack of a more granular or customizable
              pricing option can make it challenging to manage costs
              effectively.
            </div>

            <hr className="border-stone-950" />

            <div>
              What's particularly frustrating is that many of the features that
              make Vercel so appealing, such as advanced analytics or enhanced
              build performance, are locked behind the higher pricing tiers. It
              feels like you're being teased with all these fantastic tools,
              only to realize that accessing them will cost you significantly
              more.
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">The Love/Hate Balance</h1>
          <div className="flex flex-col gap-y-6 text-lg font-light opacity-80 pt-8">
            <div>
              So where does that leave me? Vercel is still my go-to platform for
              many projects because, quite simply, it works beautifully. The
              user experience is unparalleled, and the time it saves me is
              invaluable. But every time I hit a pricing wall, I'm reminded that
              this relationship isn't perfect.
            </div>

            <div>
              In the end, my love/hate relationship with Vercel is a balancing
              act. I adore the ease of use, the thoughtful design, and the power
              it gives me as a developer. Yet, I can't ignore the frustration
              that comes with the pricing model. It's a platform that's almost
              perfect—almost. ♥️
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
