"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight, Download } from "lucide-react"

import { NoteCard } from "./note-card"
import { PDFDownloadButton } from "./pdf-generator"
import { Note, Video } from "../lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface VideoAccordionProps {
  video: Video
  notes: Note[]
}

export function VideoAccordion({ video, notes }: VideoAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortedNotes = [...notes].sort((a, b) => a.timestampSeconds - b.timestampSeconds)

  const handlePDFClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mb-4">
      <Card className="border-border/50 overflow-hidden">
        {/* Accordion Header */}
        <CardHeader className="p-3 pb-2 cursor-pointer hover:bg-muted/50 transition-colors" onClick={toggleAccordion}>
          <CardTitle className="text-xs font-medium text-foreground">
            <div className="flex items-center justify-between w-full min-w-0">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {isOpen ? (
                  <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                )}
                <span className="truncate flex-1 min-w-0 pr-2">{video.title}</span>
                <Badge
                  variant="outline"
                  className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 flex-shrink-0"
                >
                  {notes.length}
                </Badge>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <PDFDownloadButton
                  notes={sortedNotes}
                  title={video.title}
                  isAllNotes={false}
                  className="text-xs h-6 px-2 border border-border hover:bg-muted rounded text-foreground"
                  onClick={handlePDFClick}
                >
                  <Download className="w-3 h-3 mr-1" />
                  PDF
                </PDFDownloadButton>
              </div>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground ml-5 truncate">
            <span className="truncate">{video.channel}</span>
            <span className="flex-shrink-0">•</span>
            <span className="flex-shrink-0">{video.duration}</span>
          </div>
        </CardHeader>

        {/* Accordion Content */}
        {isOpen && (
          <CardContent className="p-3 pt-0 border-t border-border/30">
            <div className="space-y-3">
              {sortedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
