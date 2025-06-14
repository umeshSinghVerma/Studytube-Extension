/* global chrome */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BackendResponse, Note, Video } from "./mock-data";
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

function formatTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const hh = h > 0 ? `${h.toString().padStart(2, "0")}:` : ""
  const mm = m.toString().padStart(2, "0")
  const ss = s.toString().padStart(2, "0")
  return `${hh}${mm}:${ss}`
}

export function transformBackendData(
  backendData: BackendResponse
): { videos: Video[]; notes: Note[] } {
  const videos: Video[] = []
  const notes: Note[] = []

  console.log("backend data ", backendData);

  Object.entries(backendData).forEach(([videoId, videoData]) => {
    const { heading, updatedAt, data, channelName, videoDuration } = videoData

    videos.push({
      id: videoId,
      title: heading,
      channel: channelName,
      duration: videoDuration,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      notesCount: data.length,
    })

    data.forEach((noteData, index) => {
      notes.push({
        id: `${videoId}-${index}`,
        videoId,
        timestamp: formatTimestamp(noteData.timestamp),
        timestampSeconds: noteData.timestamp,
        image: noteData.imgUrl,
        description: noteData.imgText?.trim() || "",
        createdAt: updatedAt.replace(/"/g, "") || new Date().toISOString(),
      })
    })
  })
  console.log("videos ", videos, "notes", notes);

  return { videos, notes }
}

export async function getAllData(): Promise<{ videos: Video[]; notes: Note[] }> {
  try {
    await new Promise<void>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, () => resolve());
    });

    const result = await new Promise<{ userData?: BackendResponse }>((resolve) => {
      chrome.storage.local.get("userData", (items: { userData?: BackendResponse }) => {
        resolve(items);
      });
    });

    const userData = result.userData || {};
    const data = transformBackendData(userData);
    return { videos: data.videos, notes: data.notes };
  } catch (error) {
    console.error(error);
    return { videos: [], notes: [] };
  }
}

export async function getCurrentVideoId(): Promise<string | null> {
  const tabs = await new Promise<chrome.tabs.Tab[]>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(tabs);
      }
    });
  });

  const pageUrl = tabs[0]?.url;
  if (pageUrl && pageUrl.includes("youtube.com/watch")) {
    const queryParameters = pageUrl.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    return urlParameters.get("v");
  }

  return null;
}
