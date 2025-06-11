/* global chrome */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function isYoutube(): Promise<boolean> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url?.includes("youtube.com/watch") ?? false;
  } catch (error) {
    console.error("Error checking if current tab is YouTube:", error);
    return false;
  }
}
