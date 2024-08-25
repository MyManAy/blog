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
