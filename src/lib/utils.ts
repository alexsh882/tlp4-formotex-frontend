import { format } from "@formkit/tempo";
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

export function formatDateUTC(date: string): string {  
  return format({
    date: date,
    format: "DD-MM-YYYY",
    tz: "America/Argentina/Buenos_Aires",
  });
}