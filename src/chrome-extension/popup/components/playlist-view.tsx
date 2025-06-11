"use client"

import { Card, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { PlaylistSectionHeader } from "./playlist-section-header"
import { PlaylistItemSkeleton } from "./loading-skeleton"
import { useVideos, useAllNotes } from "../hooks/use-api"

export function PlaylistView() {
  const { videos, loading: videosLoading } = useVideos()
  const { notes, loading: notesLoading } = useAllNotes()

  const loading = videosLoading || notesLoading

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">Playlist Mode</h3>
          {!loading && (
            <Badge
              variant="secondary"
              className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0"
            >
              {videos.length} videos
            </Badge>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Playlist Header with PDF Download */}
        {loading ? (
          <Card className="mb-3 border-border/50 flex-shrink-0 overflow-hidden">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-xs font-medium text-foreground flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-12 bg-muted rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-16 bg-muted rounded animate-pulse ml-2 flex-shrink-0" />
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-16 bg-muted rounded animate-pulse" />
                <div className="h-2 w-1 bg-muted rounded animate-pulse" />
                <div className="h-2 w-20 bg-muted rounded animate-pulse" />
              </div>
            </CardHeader>
          </Card>
        ) : (
          <PlaylistSectionHeader notes={notes} videoCount={videos.length} />
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden studytube-scrollbar">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <PlaylistItemSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`p-3 rounded border overflow-hidden transition-colors ${
                    index === 0
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30"
                      : "bg-muted/50 border-border hover:bg-muted/70"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        index === 0 ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
                      }`}
                    ></div>
                    <span className="text-xs font-medium truncate">
                      {index === 0 ? "Current: " : index === 1 ? "Next: " : ""}
                      {video.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{video.notesCount} notes compiled</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
