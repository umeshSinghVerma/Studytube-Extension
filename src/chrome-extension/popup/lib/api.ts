import { type Note, type Video, mockNotes, mockVideos } from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Fake API functions
export const api = {
  // Fetch all videos
  async getVideos(): Promise<ApiResponse<Video[]>> {
    await delay(3000)
    return {
      data: mockVideos,
      success: true,
      message: "Videos fetched successfully",
    }
  },

  // Fetch all notes
  async getAllNotes(): Promise<ApiResponse<Note[]>> {
    await delay(3000)
    return {
      data: mockNotes,
      success: true,
      message: "Notes fetched successfully",
    }
  },

  // Fetch notes for a specific video
  async getVideoNotes(videoId: string): Promise<ApiResponse<Note[]>> {
    await delay(3000)
    const videoNotes = mockNotes.filter((note) => note.videoId === videoId)
    return {
      data: videoNotes,
      success: true,
      message: `Notes for video ${videoId} fetched successfully`,
    }
  },

  // Fetch current video info
  async getCurrentVideo(): Promise<ApiResponse<Video>> {
    await delay(3000)
    return {
      data: mockVideos[0], // Simulate current video
      success: true,
      message: "Current video info fetched successfully",
    }
  },

  // Search notes
  async searchNotes(query: string): Promise<ApiResponse<Note[]>> {
    await delay(2000) // Shorter delay for search
    const filteredNotes = mockNotes.filter(
      (note) => note.description.toLowerCase().includes(query.toLowerCase()) || note.timestamp.includes(query),
    )
    return {
      data: filteredNotes,
      success: true,
      message: `Search completed for "${query}"`,
    }
  },
}
