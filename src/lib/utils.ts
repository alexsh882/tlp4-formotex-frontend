import { Format, format } from "@formkit/tempo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<A>(func: (...args: A[]) => void, secs: number) {
  let stop = false;
  return (...args: A[]) => {
    if (!stop) func(...args);
    stop = true;
    setTimeout(() => {
      stop = false;
    }, secs);
  };
}

export function formatDateTimeUTC(date: string): string {
  console.log(date);

  return format({
    date: date,
    format: "DD-MM-YYYY HH:mm",
    tz: "America/Argentina/Buenos_Aires",
  });
}

export function formatDateUTC(date: string | Date): string {
  return format({
    date: date,
    format: "DD-MM-YYYY",
    tz: "America/Argentina/Buenos_Aires",
  });
}

export function formatDateToString(date: string | Date, type?: Format): string {
  return format({
    date: date,
    format: type ?? "full",
    tz: "America/Argentina/Buenos_Aires",
  });
}
