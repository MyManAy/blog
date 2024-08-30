import { Mulish } from "next/font/google";
import { getArticleInfoShortened } from "@/lib/utils";
import { promises as fs } from "fs";
import parseMarkdown from "@/lib/parser/parser";
import Link from "next/link";
const bold = Mulish({ weight: "800", subsets: ["latin"] });

export const dynamic = "force-static";

type Posts = {
  title: string;
  date: Date;
  emoji: string;
  route: string;
};

export default async function Home() {
  const postsDirectory =
    process.env.VERCEL_ENV === "production" ? `./public/posts` : `/posts`;
  const fileNames = await fs.readdir(postsDirectory);

  let posts = [];
  for (const file in fileNames) {
    const data = await parseMarkdown(file);
    const title = data[0][0][0];
    if (title.type !== "title") {
      throw new Error(
        "title expected as first element of parsed markdown data"
      );
    }
    console.log(file.replace(".md", ""));

    posts.push({
      title: title.text,
      date: title.date,
      emoji: title.emoji,
      route: file.replace(".md", ""),
    });
  }

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <main className="flex min-h-screen flex-col justify-between py-20">
      <article className="flex flex-col gap-3">
        <header className={`text-4xl ${bold.className} pb-5`}>
          My Recent Posts
        </header>
        {posts.map((item) => (
          <Link
            href={`/post/${item.route}`}
            className="h-10 rounded-md flex flex-col justify-center transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
          >
            <div className="flex flex-row gap-2 pl-2">
              <div className="text-xl">{`${getArticleInfoShortened(
                item.date
              )} - `}</div>
              <header className={`text-xl ${bold.className}`}>
                {`${item.emoji} ${item.title}`}
              </header>
            </div>
          </Link>
        ))}
      </article>
    </main>
  );
}
