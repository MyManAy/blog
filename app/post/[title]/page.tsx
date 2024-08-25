import parseMarkdown from "@/lib/parser/parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Fira_Code, Mulish } from "next/font/google";
const firaCode = Fira_Code({ subsets: ["latin"] });
const bold = Mulish({ weight: "800", subsets: ["latin"] });
import { promises as fs } from "fs";

export async function generateStaticParams() {
  const posts = await fs.readdir("./public/posts");

  return posts.map((item) => ({ title: item.replace(".md", "") }));
}

export default async function Home({
  params: { title },
}: {
  params: { title: string };
}) {
  const parsed = await parseMarkdown(title + ".md");
  if (parsed[0][0][0].type !== "title")
    throw new Error("First item has to include title and date");
  return (
    <main className="flex min-h-screen flex-col justify-between py-20">
      <article className="flex flex-col gap-10">
        {parsed.map((item, index) => {
          if (item[0][0].type === "title") {
            return (
              <div key={index}>
                <header className={`text-4xl ${bold.className}`}>
                  {item[0][0].text}
                </header>
                <div className="font-thin pt-2 opacity-50">
                  {item[0][0].info}
                </div>
              </div>
            );
          } else if (item[0][0].type === "heading") {
            return (
              <h1 key={index} className="text-3xl font-bold">
                {item[0][0].text}
              </h1>
            );
          } else {
            console.log("yes");
            return (
              <div
                key={index}
                className="flex flex-col gap-y-6 text-lg font-light opacity-80"
              >
                {item.map((item, index) => {
                  if (item[0].type === "sub-heading") {
                    return (
                      <h2 key={index} className="text-2xl font-bold">
                        {item[0].text}
                      </h2>
                    );
                  } else if (item[0].type === "code-snippet") {
                    return (
                      <SyntaxHighlighter
                        language={item[0].language}
                        key={index}
                        style={dracula}
                        codeTagProps={{
                          style: {
                            ...firaCode.style,
                            scrollPaddingLeft: "0.5em",
                          },
                        }}
                        wrapLongLines
                      >
                        {item[0].text}
                      </SyntaxHighlighter>
                    );
                  } else if (item[0].type === "line") {
                    return <hr className="border-stone-950" />;
                  } else {
                    return (
                      <div key={index}>
                        {item.map((item) => {
                          if (item.type === "paragraph") {
                            return <span>{item.text}</span>;
                          } else if (item.type === "href") {
                            return (
                              <a
                                className="text-[#1565c0] no-underline transition-all ease-in duration-200 hover:underline"
                                href={item.link}
                              >
                                {item.text}
                              </a>
                            );
                          } else if (item.type === "bold") {
                            return (
                              <b className={bold.className}>{item.text}</b>
                            );
                          } else if (item.type === "italic") {
                            return <i>{item.text}</i>;
                          } else if (item.type === "code") {
                            return (
                              <code className="px-2 py-1 text-inherit bg-stone-200 rounded text-sm">
                                {item.text}
                              </code>
                            );
                          }
                        })}
                      </div>
                    );
                  }
                })}
              </div>
            );
          }
        })}
      </article>
    </main>
  );
}
