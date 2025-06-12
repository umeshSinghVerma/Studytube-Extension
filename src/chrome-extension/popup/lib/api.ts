/* global chrome */
import { type Note, type Video } from "./mock-data"
import { getAllData, getCurrentVideoId } from "./utils"

// Simulate API delay
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export async function getPlaylistVideoList(playListId: string) {
  const bodyContent = JSON.stringify({
    "playListId": playListId
  });

  try {
    const response = await fetch("https://extension-server-pi.vercel.app/getPlayListVideoList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyContent,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e, "error in fetching playlist videos");
    return null;
  }
}

// Fake API functions
export const api = {
  // Fetch all videos
  async getVideos(): Promise<ApiResponse<Video[]>> {
    const allData = await getAllData();
    const videos = allData?.videos ?? [];
    return {
      data: videos,
      success: true,
      message: "Videos fetched successfully",
    }
  },

  // Fetch all notes
  async getAllNotes(): Promise<ApiResponse<Note[]>> {
    const allData = await getAllData();
    const notes = allData?.notes ?? [];
    return {
      data: notes,
      success: true,
      message: "Notes fetched successfully",
    }
  },

  // Fetch notes for a specific video
  async getVideoNotes(videoId: string): Promise<ApiResponse<Note[]>> {
    const allData = await getAllData();
    const notes: Note[] = allData?.notes ?? [];
    const videoNotes = notes.filter((note) => note.videoId === videoId)
    console.log("all Data ", allData, notes, videoNotes);
    return {
      data: videoNotes,
      success: true,
      message: `Notes for video ${videoId} fetched successfully`,
    }
  },

  // Fetch current video info
  async getCurrentVideo(): Promise<ApiResponse<Video>> {
    const videoId = await getCurrentVideoId();
    const allData = await getAllData();
    console.log("all data ",allData);
    const videos: Video[] = allData?.videos ?? [];
    const videoNotes = videos.filter((video) => video.id === videoId)

    return {
      data: videoNotes[0],
      success: true,
      message: "Current video info fetched successfully",
    }
  },

  // Search notes
  async searchNotes(query: string): Promise<ApiResponse<Note[]>> {
    const allData = await getAllData();
    const notes: Note[] = allData?.notes ?? [];
    const filteredNotes = notes.filter(
      (note) => note.description.toLowerCase().includes(query.toLowerCase()) || note.timestamp.includes(query),
    )
    return {
      data: filteredNotes,
      success: true,
      message: `Search completed for "${query}"`,
    }
  },
}
