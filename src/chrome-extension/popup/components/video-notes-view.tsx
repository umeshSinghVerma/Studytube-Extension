"use client"

import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Plus, FileText } from "lucide-react"
import { Button } from "../components/ui/button"
import { NoteCard } from "./note-card"
import { VideoSectionHeader } from "./video-section-header"
import { FilterDropdown, type FilterType } from "./filter-dropdown"
import { VideoHeaderSkeleton, NoteCardSkeleton } from "./loading-skeleton"
import { useCurrentVideo, useVideoNotes } from "../hooks/use-api"
import { useMemo } from "react"

interface VideoNotesViewProps {
  searchQuery: string
  currentFilter: FilterType
  selectedVideoId?: string
  onFilterChange: (filter: FilterType, videoId?: string) => void
}

export function VideoNotesView({ searchQuery, currentFilter, selectedVideoId, onFilterChange }: VideoNotesViewProps) {
  const { video: currentVideo, loading: videoLoading } = useCurrentVideo()
  const { notes, loading: notesLoading } = useVideoNotes(currentVideo?.id || "")

  const loading = videoLoading || notesLoading

  // Filter and search logic
  const filteredNotes = useMemo(() => {
    let filteredNotes = notes

    // Apply search filter
    if (searchQuery.trim()) {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.description.toLowerCase().includes(searchQuery.toLowerCase()) || note.timestamp.includes(searchQuery),
      )
    }

    // Apply other filters
    switch (currentFilter) {
      case "recent":
        filteredNotes = [...filteredNotes].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break
      case "oldest":
        filteredNotes = [...filteredNotes].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        break
      default:
        filteredNotes = [...filteredNotes].sort((a, b) => a.timestampSeconds - b.timestampSeconds)
    }

    return filteredNotes
  }, [notes, searchQuery, currentFilter])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">Video Notes</h3>
          {!loading && (
            <Badge
              variant="secondary"
              className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0"
            >
              {filteredNotes.length} notes
            </Badge>
          )}
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <FilterDropdown
            currentFilter={currentFilter}
            selectedVideoId={selectedVideoId}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Info Header with PDF Download */}
        {loading ? (
          <VideoHeaderSkeleton />
        ) : currentVideo ? (
          <VideoSectionHeader video={currentVideo} notes={filteredNotes} title={currentVideo.title} />
        ) : null}

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 studytube-scrollbar">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <NoteCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredNotes.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-2">
                  {searchQuery ? `No notes found for "${searchQuery}"` : "No notes available for this video yet"}
                </p>
                <p className="text-muted-foreground text-xs mb-4">Start taking screenshot notes while watching</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8">
                  <Plus className="w-3 h-3 mr-1" />
                  Take First Note
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
