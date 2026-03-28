import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, locale: string = "en"): string {
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, (month || 1) - 1);

  if (!month) return year.toString();

  return date.toLocaleDateString(locale === "cs" ? "cs-CZ" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
