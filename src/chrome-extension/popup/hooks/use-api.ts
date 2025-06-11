"use client"

import { useState, useEffect } from "react"
import { api } from "../lib/api"
import type { Note, Video } from "../lib/mock-data"

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await api.getVideos()
        if (response.success) {
          setVideos(response.data)
        } else {
          setError(response.message || "Failed to fetch videos")
        }
      } catch (err) {
        setError("Network error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return { videos, loading, error }
}

export function useAllNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const response = await api.getAllNotes()
        if (response.success) {
          setNotes(response.data)
        } else {
          setError(response.message || "Failed to fetch notes")
        }
      } catch (err) {
        setError("Network error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return { notes, loading, error }
}

export function useVideoNotes(videoId: string) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideoNotes = async () => {
      try {
        setLoading(true)
        const response = await api.getVideoNotes(videoId)
        if (response.success) {
          setNotes(response.data)
        } else {
          setError(response.message || "Failed to fetch video notes")
        }
      } catch (err) {
        setError("Network error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (videoId) {
      fetchVideoNotes()
    }
  }, [videoId])

  return { notes, loading, error }
}

export function useCurrentVideo() {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentVideo = async () => {
      try {
        setLoading(true)
        const response = await api.getCurrentVideo()
        if (response.success) {
          setVideo(response.data)
        } else {
          setError(response.message || "Failed to fetch current video")
        }
      } catch (err) {
        setError("Network error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentVideo()
  }, [])

  return { video, loading, error }
}

export function useSearch() {
  const [results, setResults] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await api.searchNotes(query)
      if (response.success) {
        setResults(response.data)
      } else {
        setError(response.message || "Search failed")
      }
    } catch (err) {
      setError("Search error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, search }
}
