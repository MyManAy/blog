08/30/2024
How I Made This Blog
👨‍💻

I started coding and creating websites right about when high school started. I used to have a physical notebook where I'd document thoughts I had about the web-dev space, tasks I needed to complete, and how I'd personally developed my coding skills. It's been nearly 4 years, but I want to revisit the idea and make it in the format of a blog.

# My Inspirations

## Gille Castel 

No great idea is formed without using the paths forged by those who've come before you. My blog is no different. I only became interested in creating my own blog after seeing [Gilles Castel's Blog](https://castel.dev/). His clean and simple design and familiar markdown-like formatting make it such a pleasure to read, even if the posts are considerably longer than other tech articles. 

His attention to detail is one of a kind. From the left-hand sidebar that shows you each section of the article to the special keyboard shortcut styles that showcase his [Vim productivity hacks](https://castel.dev/post/lecture-notes-1/). Sadly, this insanely talented developer passed away in 2022, leaving behind only 4 articles on his blog. While I hardly have the skills to continue his legacy, I'd like to thank him for inspiring me and many other developers alike.

## Andrea Bergia

_Ah, a fellow tea addict_. I stumbled across [Andrea Bergia's Blog](https://andreabergia.com/) while researching blogs that use Markdown. I'd like to preface this by saying that *most* of the design of my blog is based upon his website. It seemed very simple to code up, and I needed that because the last thing I'd want to do was get stuck formatting `<div>` tags with CSS and Tailwind. Writing was my goal, not frontend design. 

While Andrea used an already existing Markdown-to-HTML compiler, I wanted to try compiling it on my own. This allowed me to have a bigger range of custimizability when it came to my CSS, although it stopped me from adding *many* markdown features just because I was too lazy (_and yes, I did kind of completely ignore the whole "writing-first goal" from before_).

# A Different System

## Static vs. Data-Heavy

The thing about blogs is that they don't require much changing data. All of the data in a blog is present before the app even gets deployed. A user changing routes and interacting with the website doesn't make any changes to the underlying data. In fact, my entire blog post is statically generated during build time, meaning no client-side _or_ any server-side data fetching. 

That's why reading a blog _feels_ so fast. You're essentially being served *raw* HTML and CSS. In fact, try [disabling Javascript](https://developer.chrome.com/docs/devtools/javascript/disable) in your browser to see this in action. The site will still run exactly the same because it is uses static rendering.

---

This is in contrast to other projects I've worked on that require *plenty* of changing data and responding to client-side actions. Take, for instance, [King of the Pack](https://kingofthepack.vercel.app/), a project I worked on fresh into the start of my summer break from 11th grade. It's a digital card collectible game that requires animations for pack opening, payment integration with the [Stripe](https://stripe.com/) API, and database communication with [Supabase](https://supabase.com/). 

```typescript
// client-side operations
const listener = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      if (flipped) onArrowClick();
      else onCardClick();
    }
  };

// server-side operations
const getCardProps = async () => {
const { data: openedPack } = await supabase
    .from("openedPack")
    .select(
    `circulationCard (
        card (
            src,
            animalName,
            rarity,
            variation,
            totalVariations
        )
    )`)
    .eq("userEmail", email!)
    .order("id", { ascending: false })
    .limit(1)
    .single();
```

To support all these features, almost every interaction the user has with the website requires data fetching, whether that be on the client or on the server. The project was actually very important in cultivating my current knowledge of different web rendering techniques.

## One Framework to rule them all 

[Next.js](https://nextjs.org/). You've heard it, you've seen it, and I would _not_ be surprised if you've used it. In my opinion, it is the *most* comprehensive full-stack Javascript framework out there. There is a reason why so many people preach the tried-and-tested technology. Heck, even the [React Documentation](https://react.dev/) recommends it over using plain React. 

The ultimate reason why it's my framework of choice is because of its versatility. It seamlessly supports all 3 big forms of rendering: static, server-side, and client-side. By default, pages are generated statically, but as soon as you require external data fetching, just add an `async` in front of your React component, and you're set. 

```javascript
// plain React
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://api.example.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// with a Next.js server component
export default async function Posts() {
  const response = await axios.get('https://api.example.com/posts');
  const posts = response.data;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

To opt-into client-side data fetching, simply put the `"use client"` directive at the top of your file. 

```javascript
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

You don't _lose_ anything, but you *gain* the freedom to render your webpage in a way that fits your data-flow the best.

# My Tech Stack

I've already explained my love for Next.js being my web framework, but what about the other technologies I used to make this blog?

## Typescript

You can use either Javascript or Typescript to write your Next.js application, but Typescript will always be my go-to choice. The only place I'd use JS is for small pieces of code that perform a single function, like something you would code up for a technical interview about a DSA question. Any more complex than that, and I'd take the extra steps \(_not like there are many_\) to set up TS in my project. It catches pesky errors, avoids unintended behavior, and does all this with very capable type inference. 

## Tailwind

Now, Tailwind styling over CSS has always been a bit more contraversial of a choice than TS vs. JS. If there's one thing I hate more than coding with JS, it's coding CSS, so I'd *love* to be able to turn off my brain while doing so. Luckily, Tailwind allows me to do exactly that. The learning curve is really not as bad as people make it out to be, and it's so much more efficient than writing plain CSS.

Plain CSS

```css
main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

article {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

header {
  font-size: 2.25rem;
  line-height: 2.5rem;
  padding-bottom: 1.25rem;
}
```

Rewritten using Tailwind

```javascript
<main className="flex min-h-screen flex-col justify-between py-20">
    <article className="flex flex-col gap-3">
        <header className={`text-4xl ${bold.className} pb-5`}>
            My Recent Posts
        </header>
    </article>
</main>
```

## Deployment

There's no point in developing a blog that no one is going to see. At that point, you're just writing notes. Now, because I use Next.js so much, the obvious choice is to deploy on [Vercel](https://vercel.com/). Developed by the same team as Next, it makes deploying my app as simple as connecting my Github repo to my domain. Also, _completely unrelated to Vercel_, but isn't it so nice to just have your own [domain](https://www.nithinmonni.com/)? 

## Developer Tools

Github, VSCode, [Dracula](https://draculatheme.com/visual-studio-code) font, and Linux. Yup, I'm just a run-of-the-mill Javascript developer. One day I hope to become one of those Vim wizards and keyboard shortcut my entire OS, but until then, these are the tools I'm sticking with.

If you're curious as to why I use Linux, I honestly can't give you a solid answer. It just _feels_ like home to me. Despite using Windows for as long as I can remember, after switching to [Arch Linux](https://archlinux.org/) this spring, I haven't found the need to go back. That being said, I have a dual-boot installation set up, so I can always fire up my Windows instance to play games or use specific software.

## Other Tools

NPM libraries _hardly_ get the same recognition as web frameworks and SaaS providers. One of them I'd like to shoutout is [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter). It's a React component that lets you render markdown code snippets in a variety of different languages with a range of highlighting themes. It would've taken _blood_, _sweat_, and _tears_ to implement syntax highlighting from scratch; I _can't_ recommend it enough. 

```javascript
<SyntaxHighlighter
    language={"typescript"}
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
```

Finally, I'd like to end with a reminder that artificial intelligence is going to take over all our jobs in 20 years. So, why not be the authors of our own demise and use AI to help us code? Up until recently, I found that using tools like ChatGPT acutally slowed down my development because prompting oftentimes took _longer_ than simply coding features myself. 

However, that changed when I started using Anthropic's newest model of [Claude AI](https://www.anthropic.com/news/claude-3-5-sonnet). This was _genuinely_ a game-changer for me. It was able to implement *functioning* pieces of code with 1 or 2 prompts, and their _"artifacts"_ let you run and test the code within the chat interface itself. If you've been hesitant to utilize AI in your code, I highly recommend Claude. 