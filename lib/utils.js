import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cnMerge(...inputs) {
  return twMerge(clsx(inputs));
}
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function cnFilter(...classes) {
  return classes.filter(Boolean).join(' ');
}

