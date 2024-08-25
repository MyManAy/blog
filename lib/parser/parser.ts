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
