"use client"

import { Download } from "lucide-react"
import { Card, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { PDFDownloadButton } from "./pdf-generator"
import type { Note, Video } from "../lib/mock-data"

interface VideoSectionHeaderProps {
  video: Video
  notes: Note[]
  title: string
}

export function VideoSectionHeader({ video, notes, title }: VideoSectionHeaderProps) {
  return (
    <Card className="mb-3 border-border/50 flex-shrink-0 overflow-hidden">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-xs font-medium text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="truncate">{video.title}</span>
            <Badge
              variant="secondary"
              className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0"
            >
              {notes.length} notes
            </Badge>
          </div>
          <PDFDownloadButton
            notes={notes}
            title={title}
            isAllNotes={false}
            className="text-xs h-6 px-2 border border-border hover:bg-muted rounded text-foreground ml-2 flex-shrink-0"
          >
            <Download className="w-3 h-3 mr-1" />
            PDF
          </PDFDownloadButton>
        </CardTitle>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>Duration: {video.duration}</span>
          <span>•</span>
          <span className="truncate">Channel: {video.channel}</span>
        </div>
      </CardHeader>
    </Card>
  )
}
