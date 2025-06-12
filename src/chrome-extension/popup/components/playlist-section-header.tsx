"use client"

import { Download } from "lucide-react"
import { Card, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { PDFDownloadButton } from "./pdf-generator"
import type { Note } from "../lib/mock-data"

interface PlaylistSectionHeaderProps {
  notes: Note[]
  videoCount: number
}

export function PlaylistSectionHeader({ notes, videoCount }: PlaylistSectionHeaderProps) {
  return (
    <Card className="mb-3 border-border/50 flex-shrink-0 overflow-hidden">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-xs font-medium text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="truncate">Playlist Notes</span>
            <Badge
              variant="secondary"
              className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0"
            >
              {videoCount} videos
            </Badge>
          </div>
          <PDFDownloadButton
            notes={notes}
            title="Playlist Notes"
            isAllNotes={true}
            className="text-xs h-6 px-2 border border-border hover:bg-muted rounded text-foreground ml-2 flex-shrink-0 flex gap-2"
          >
            <div className="flex gap-1">
              <Download className="w-3 h-3 mr-1" />
              <span>PDF</span>
            </div>
          </PDFDownloadButton>
        </CardTitle>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>{notes.length} total notes</span>
          <span>•</span>
          <span>Multiple videos</span>
        </div>
      </CardHeader>
    </Card>
  )
}
