"use client"

import { useAllNotes, useVideos } from "../hooks/use-api"
import { Note, Video } from "../lib/mock-data"
import { VideoAccordionSkeleton } from "./loading-skeleton"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { VideoAccordion } from "./video-accordion"



interface AllNotesViewProps {
  searchQuery?: string
}

export function AllNotesView({ searchQuery }: AllNotesViewProps) {
  const { notes, loading: notesLoading } = useAllNotes()
  const { videos, loading: videosLoading } = useVideos()

  const loading = notesLoading || videosLoading

  // Filter notes by search query if provided
  const filteredNotes = searchQuery
    ? notes.filter(
      (note) =>
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) || note.timestamp.includes(searchQuery),
    )
    : notes

  // Group notes by video
  const groupedNotes = filteredNotes.reduce(
    (acc, note) => {
      const video = videos.find((v) => v.id === note.videoId)
      if (video) {
        if (!acc[video.id]) {
          acc[video.id] = { video, notes: [] }
        }
        acc[video.id].notes.push(note)
      }
      return acc
    },
    {} as Record<string, { video: Video; notes: Note[] }>,
  )

  // Sort by most recent video activity
  const sortedGroups = Object.values(groupedNotes).sort((a: any, b: any) => {
    const aLatest = Math.max(...a.notes.map((n: Note) => new Date(n.createdAt).getTime()))
    const bLatest = Math.max(...b.notes.map((n: Note) => new Date(n.createdAt).getTime()))
    return bLatest - aLatest
  })

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">All Notes</h3>
          {!loading && (
            <Badge
              variant="secondary"
              className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0"
            >
              {filteredNotes.length} total
            </Badge>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 studytube-scrollbar">
        {loading ? (
          <div className="min-w-0">
            {Array.from({ length: 3 }).map((_, index) => (
              <VideoAccordionSkeleton key={index} />
            ))}
          </div>
        ) : sortedGroups.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-sm">
                {searchQuery ? `No notes found for "${searchQuery}"` : "No notes found"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="min-w-0">
            <div className="min-w-0">
              {(sortedGroups as { video: any; notes: any }[]).map(({ video, notes: videoNotes }) => (
                <VideoAccordion key={video.id} video={video} notes={videoNotes} />
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
