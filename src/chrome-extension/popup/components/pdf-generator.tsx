"use client"

import type React from "react"

import { useState } from "react"
import { mockVideos, Note, Video } from "../lib/mock-data"
import { Button } from "./ui/button"

interface PDFGeneratorProps {
  notes: Note[]
  title: string
  isAllNotes?: boolean
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export function PDFDownloadButton({
  notes,
  title,
  isAllNotes = false,
  className,
  children,
  onClick,
}: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    }

    setIsGenerating(true)

    try {
      // Dynamic import to ensure client-side only
      const { jsPDF } = await import("jspdf")

      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20
      const maxWidth = pageWidth - 2 * margin
      let yPosition = margin

      // Helper function to add text with word wrapping
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
        doc.setFontSize(fontSize)
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return y + lines.length * fontSize * 0.4 // Return new Y position
      }

      // Helper function to add beautiful image placeholder with mock image
      const addImagePlaceholder = async (note: Note, x: number, y: number, width: number, height: number) => {
        try {
          // Create a beautiful image placeholder
          doc.setFillColor(240, 253, 244) // Light emerald background
          doc.rect(x, y, width, height, "F")

          // Add border
          doc.setDrawColor(16, 185, 129) // Emerald border
          doc.setLineWidth(1)
          doc.rect(x, y, width, height, "S")

          // Add image icon and styling
          doc.setFillColor(16, 185, 129) // Emerald color
          const iconSize = 20
          const iconX = x + width / 2 - iconSize / 2
          const iconY = y + height / 2 - iconSize / 2

          // Create a camera icon effect
          doc.rect(iconX, iconY, iconSize, iconSize, "F")
          doc.setFillColor(255, 255, 255)
          doc.circle(iconX + iconSize / 2, iconY + iconSize / 2, 6, "F")

          // Add timestamp badge
          doc.setFillColor(0, 0, 0, 0.8)
          const badgeWidth = 40
          const badgeHeight = 12
          doc.rect(x + width - badgeWidth - 5, y + 5, badgeWidth, badgeHeight, "F")

          doc.setTextColor(255, 255, 255)
          doc.setFontSize(8)
          doc.text(`⏱ ${note.timestamp}`, x + width - badgeWidth, y + 12)

          // Add "Click to view" text
          doc.setTextColor(16, 185, 129)
          doc.setFontSize(9)
          doc.text("📷 Click to view image", x + 5, y + height - 8)

          // Add clickable link
          doc.link(x, y, width, height, { url: note.image })

          return y + height + 10
        } catch (error) {
          console.error("Error adding image:", error)
          return y + height + 10
        }
      }

      // Beautiful Header with gradient effect
      doc.setFillColor(16, 185, 129) // Emerald color
      doc.rect(0, 0, pageWidth, 50, "F")

      // Add StudyTube logo effect
      doc.setFillColor(255, 255, 255)
      doc.circle(margin + 15, 25, 12, "F")
      doc.setFillColor(16, 185, 129)
      doc.setFontSize(10)
      doc.text("📄", margin + 12, 28)

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(28)
      doc.setFont("helvetica", "bold")
      doc.text("StudyTube", margin + 35, 30)

      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("Your YouTube Study Companion", margin + 35, 40)

      // Reset text color and position
      doc.setTextColor(0, 0, 0)
      yPosition = 70

      // Add beautiful title section
      doc.setFillColor(248, 250, 252) // Light gray background
      doc.rect(margin, yPosition, maxWidth, 25, "F")
      doc.setDrawColor(226, 232, 240)
      doc.rect(margin, yPosition, maxWidth, 25, "S")

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(30, 41, 59)
      doc.text(title, margin + 10, yPosition + 15)

      yPosition += 35

      // Add generation info with icons
      doc.setFontSize(10)
      doc.setTextColor(100, 116, 139)
      doc.text(
        `📅 Generated on ${new Date().toLocaleDateString()} • 📝 ${notes.length} notes • ⭐ StudyTube Premium`,
        margin,
        yPosition,
      )
      yPosition += 20

      if (isAllNotes) {
        // Group notes by video
        const groupedNotes = notes.reduce(
          (acc, note) => {
            const video = mockVideos.find((v) => v.id === note.videoId)
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

        // Add each video section with beautiful styling
        for (const { video, notes: videoNotes } of Object.values(groupedNotes)) {
          // Check if we need a new page
          if (yPosition > pageHeight - 150) {
            doc.addPage()
            yPosition = margin
          }

          // Beautiful video section header
          doc.setFillColor(16, 185, 129) // Emerald background
          doc.rect(margin, yPosition - 5, maxWidth, 20, "F")

          doc.setFontSize(14)
          doc.setFont("helvetica", "bold")
          doc.setTextColor(255, 255, 255)
          doc.text(`🎥 ${video.title}`, margin + 5, yPosition + 8)
          yPosition += 25

          // Video info with beautiful styling
          doc.setFillColor(240, 253, 244) // Light emerald background
          doc.rect(margin, yPosition - 5, maxWidth, 15, "F")

          doc.setFontSize(9)
          doc.setTextColor(107, 114, 128)
          doc.setFont("helvetica", "normal")
          doc.text(
            `📺 ${video.channel} • ⏱ ${video.duration} • 📝 ${videoNotes.length} notes`,
            margin + 5,
            yPosition + 5,
          )
          yPosition += 20

          // Add video notes in beautiful image-description pattern
          const sortedVideoNotes = [...videoNotes].sort((a, b) => a.timestampSeconds - b.timestampSeconds)

          for (let i = 0; i < sortedVideoNotes.length; i++) {
            const note = sortedVideoNotes[i]

            // Check if we need a new page
            if (yPosition > pageHeight - 140) {
              doc.addPage()
              yPosition = margin
            }

            // Add beautiful image placeholder
            yPosition = await addImagePlaceholder(note, margin, yPosition, maxWidth, 70)

            // Add beautiful description box
            doc.setFillColor(255, 255, 255)
            doc.rect(margin, yPosition, maxWidth, 30, "F")
            doc.setDrawColor(226, 232, 240)
            doc.rect(margin, yPosition, maxWidth, 30, "S")

            // Add description with beautiful typography
            doc.setTextColor(55, 65, 81)
            doc.setFont("helvetica", "normal")
            doc.setFontSize(10)
            yPosition = addWrappedText(note.description, margin + 10, yPosition + 10, maxWidth - 20, 10)
            yPosition += 25

            // Add separator line between notes
            if (i < sortedVideoNotes.length - 1) {
              doc.setDrawColor(226, 232, 240)
              doc.setLineWidth(0.5)
              doc.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition)
              yPosition += 10
            }
          }

          yPosition += 15 // Space between videos
        }
      } else {
        // Single video notes with beautiful styling
        const sortedNotes = [...notes].sort((a, b) => a.timestampSeconds - b.timestampSeconds)

        for (let i = 0; i < sortedNotes.length; i++) {
          const note = sortedNotes[i]

          // Check if we need a new page
          if (yPosition > pageHeight - 140) {
            doc.addPage()
            yPosition = margin
          }

          // Add beautiful image placeholder
          yPosition = await addImagePlaceholder(note, margin, yPosition, maxWidth, 70)

          // Add beautiful description box
          doc.setFillColor(255, 255, 255)
          doc.rect(margin, yPosition, maxWidth, 30, "F")
          doc.setDrawColor(226, 232, 240)
          doc.rect(margin, yPosition, maxWidth, 30, "S")

          // Add description with beautiful typography
          doc.setTextColor(55, 65, 81)
          doc.setFont("helvetica", "normal")
          doc.setFontSize(10)
          yPosition = addWrappedText(note.description, margin + 10, yPosition + 10, maxWidth - 20, 10)
          yPosition += 25

          // Add separator line between notes
          if (i < sortedNotes.length - 1) {
            doc.setDrawColor(226, 232, 240)
            doc.setLineWidth(0.5)
            doc.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition)
            yPosition += 10
          }
        }
      }

      // Beautiful Footer
      const totalPages = doc.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)

        // Footer background
        doc.setFillColor(248, 250, 252)
        doc.rect(0, pageHeight - 25, pageWidth, 25, "F")

        doc.setFontSize(8)
        doc.setTextColor(100, 116, 139)
        doc.text("✨ Generated by StudyTube - Your YouTube Study Companion", pageWidth / 2, pageHeight - 15, {
          align: "center",
        })
        doc.text(`📄 Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: "right" })
        doc.text("🌟 studytube.app", margin, pageHeight - 10)
      }

      // Generate filename
      const fileName = isAllNotes
        ? `StudyTube-All-Notes-${new Date().toISOString().split("T")[0]}.pdf`
        : `StudyTube-${title.replace(/[^a-zA-Z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`

      // Save the PDF
      doc.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button size="sm" variant="outline" className={className} onClick={generatePDF} disabled={isGenerating}>
      {isGenerating ? (
        <>
          <div className="w-3 h-3 mr-1 border border-current border-t-transparent rounded-full animate-spin" />
          Generating...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
