  const file = await fs.readFile(`/posts/${postFile}`, "utf8");
  const lines = file.split("\n");

  const date = new Date(lines[0]);
  const title = lines[1];

  let words = 0;
  for (const line of lines) {
    for (const _word of line.split(" ")) words++;
  }

  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfTheYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const infoString = `Posted ${daysOfTheWeek[date.getDay()]}, ${
    monthsOfTheYear[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} - ${words} words, ~${Math.ceil(
    words / 200
  )} minutes`;

  lines.shift();
  lines.shift();

  type Data = (
    | {
        type:
          | "heading"
          | "sub-heading"
          | "paragraph"
          | "bold"
          | "italic"
          | "code";
        text: string;
      }
    | { type: "code-snippet"; text: string; language: string }
    | { type: "title"; text: string; info: string }
    | { type: "href"; text: string; link: string }
    | { type: "line" }
  )[][][];
    const codeSnippet = /```([A-Za-z]+)/;

    const addCodeSnippetLine = () => {
      if (dataIndex === data.length - 1) {
        if (data[dataIndex].at(-1)?.at(-1)?.type === "code-snippet") {
          const blockLength = data[dataIndex].length;
          const paragraphLength = data[dataIndex][blockLength - 1].length;

          // has to be a length 1 because code snippets can not have strongs or italics
          if (paragraphLength === 1) {
            const lastCodeSnippet = data[dataIndex][blockLength - 1][0] as {
              type: "code-snippet";
              text: string;
              language: string;
            };

            // if you put a python code snippet right after another one, they will join together
            if (lastCodeSnippet.language === matchedLanguage) {
              (data[dataIndex][blockLength - 1][0] as any).text += `\n${line}`;
            }
          }
        } else {
          data[dataIndex].push([
            { type: "code-snippet", text: line, language: matchedLanguage },
          ]);
        }
      } else
        data.push([
          [{ type: "code-snippet", text: line, language: matchedLanguage }],
        ]);
    };
    const parseBlock = (text: string) => {
      type Block = Data[0][0];
      let block: Block = [];
      let matchedCode = false;
      let matchedBold = false;
      let matchedItalics = false;
      let matchedHrefText = false;
      let expectingHrefLink = false;
      let matchedHrefLink = false;

      let built = "";
      let builtLink = "";
      for (const letter of text) {
        const isCode = letter === "`";
        const isItalics = letter === "_";
        const isBold = letter === "*";

        if (matchedCode) {
          if (isCode) {
            matchedCode = false;
            block.push({ type: "code", text: built });
            built = "";
          } else {
            built += letter;
          }
        } else if (matchedBold) {
          if (isBold) {
            matchedBold = false;
            block.push({ type: "bold", text: built });
            built = "";
          } else {
            built += letter;
          }
        } else if (matchedItalics) {
          if (isItalics) {
            matchedItalics = false;
            block.push({ type: "italic", text: built });
            built = "";
          } else {
            built += letter;
          }
        } else if (matchedHrefText) {
          if (letter === "]") {
            matchedHrefText = false;
            expectingHrefLink = true;
          } else {
            built += letter;
          }
        } else if (expectingHrefLink) {
          if (letter !== "(") {
            throw new Error("expected href link '('");
          } else {
            expectingHrefLink = false;
            matchedHrefLink = true;
          }
        } else if (matchedHrefLink) {
          if (letter === ")") {
            matchedHrefLink = false;
            block.push({ type: "href", text: built, link: builtLink });
            built = "";
            builtLink = "";
          } else {
            builtLink += letter;
          }
        } else {
          if (
            isCode ||
            isBold ||
            isItalics ||
            letter === "(" ||
            letter === "["
          ) {
            block.push({ type: "paragraph", text: built });
            built = "";
            if (isCode) matchedCode = true;
            else if (isItalics) matchedItalics = true;
            else if (isBold) matchedBold = true;
            else if (letter === "[") matchedHrefText = true;
          } else {
            built += letter;
          }
        }
      }

      const lastLetter = text[text.length - 1];
      if (
        lastLetter !== "`" &&
        lastLetter !== "*" &&
        lastLetter !== "_" &&
        lastLetter !== "]" &&
        lastLetter !== ")"
      ) {
        if (
          matchedBold ||
          matchedCode ||
          matchedItalics ||
          matchedHrefLink ||
          matchedHrefText
        ) {
          throw new Error(
            "unclosed code, bold, italics, href link, or href text"
          );
        }
        block.push({ type: "paragraph", text: built });
      }

      return block;
    };

    // empty line but inside code snippet adds newline
    if (matchedCodeSnippet && words[0] === "") {
      addCodeSnippetLine();
      continue;
    } else if (words[0] === "") {
      // otherwise, ignore empty lines
      continue;
    }

    // "```language"
    if (!matchedCodeSnippet && codeSnippet.test(words[0])) {
      matchedCodeSnippet = true;
      const language = codeSnippet.exec(words[0])![1];
      matchedLanguage = language;
      continue;
    }
