"use client"

import { Card, CardContent } from "../components/ui/card"
import { Clock, ImageIcon } from "lucide-react"

interface NoteCardProps {
  note: {
    id: string
    timestamp: string
    image: string
    description: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="mb-3 border-border/50 hover:border-border transition-colors overflow-hidden">
      <CardContent className="p-3">
        {/* Image */}
        <div className="w-full h-32 bg-muted rounded border overflow-hidden relative mb-3 flex-shrink-0">
          <img
            src={note.image || "/placeholder.svg?height=128&width=320"}
            alt="Video screenshot"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              target.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>

          {/* Timestamp overlay */}
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{note.timestamp}</span>
          </div>
        </div>

        {/* Description */}
        <div className="min-w-0">
          <p className="text-sm text-foreground leading-relaxed break-words">{note.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
