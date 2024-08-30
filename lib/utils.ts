import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const getArticleInfo = (date: Date, words: number) =>
  `Posted ${daysOfTheWeek[date.getDay()]}, ${
    monthsOfTheYear[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} - ${words} words, ~${Math.ceil(
    words / 200
  )} minutes`;

export const getArticleInfoShortened = (date: Date) =>
  `${
    monthsOfTheYear[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
