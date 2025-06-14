"use client"

import { useState } from "react"
import { Document, Page, Text, View, Image, Link, StyleSheet, Font } from '@react-pdf/renderer'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { mockVideos, Note, Video } from "../lib/mock-data"
import { Button } from "./ui/button"
import Oswald from './Oswald.ttf'

interface PDFGeneratorProps {
  notes: Note[]
  title: string
  isAllNotes?: boolean
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

Font.register({
  family: 'Oswald',
  src: Oswald
});

const SUPABASE_GREEN = '#3ECF8E';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Times-Roman',
  },
  header: {
    backgroundColor: SUPABASE_GREEN,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 35,
    color: 'white',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Oswald',
  },
  content: {
    padding: 35,
    paddingTop: 20,
  },
  card: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  image: {
    marginVertical: 10,
    marginHorizontal: 'auto',
    width: 400,
    maxHeight: 300,
    objectFit: 'contain',
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 38,
    left: 35,
    color: 'grey',
  },
  branding: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    right: 35,
    color: 'grey',
    textAlign: 'right',
  },
})

const MyDocument = ({ notes, title, isAllNotes }: { notes: Note[], title: string, isAllNotes: boolean }) => {
  const groupedNotes = isAllNotes ? notes.reduce(
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
  ) : null

  return (
    <Document>
      <Page size="LEGAL" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <View style={styles.content}>
          {(isAllNotes && groupedNotes)
            ? Object.values(groupedNotes).map(({ video, notes: videoNotes }) => (
              <View key={video.id} wrap={false}>
                {videoNotes
                  .sort((a, b) => a.timestampSeconds - b.timestampSeconds)
                  .map(note => (
                    <View key={note.id} style={styles.card}>
                      <Link src={`https://youtube.com/watch?v=${note.videoId}&t=${note.timestampSeconds}s`}>
                        <Image src={note.image} style={styles.image} />
                      </Link>
                      <Text style={styles.text}>{note.description}</Text>
                    </View>
                  ))}
              </View>
            ))
            : notes
              .sort((a, b) => a.timestampSeconds - b.timestampSeconds)
              .map(note => (
                <View key={note.id} style={styles.card}>
                  <Link src={`https://youtube.com/watch?v=${note.videoId}&t=${note.timestampSeconds}s`}>
                    <Image src={note.image} style={styles.image} />
                  </Link>
                  <Text style={styles.text}>{note.description}</Text>
                </View>
              ))}
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />

        <View style={styles.branding} fixed>
          <Image
            style={{ height: "18px", width: "18px", marginBottom: 2, display:"flex" ,gap:"5px" }}
            src="/logo.png"
          />
          <Link src="https://studytube-beta.vercel.app/">
            Created Using StudyTube
          </Link>
        </View>
      </Page>
    </Document>
  );
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

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    }
    setIsGenerating(true)
  }

  const fileName = isAllNotes
    ? `StudyTube-All-Notes-${new Date().toISOString().split("T")[0]}.pdf`
    : `StudyTube-${title.replace(/[^a-zA-Z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`

  return (
    <Button size="sm" variant="outline" className={className} onClick={handleClick} disabled={isGenerating}>
      {isGenerating ? (
        <PDFDownloadLink
          document={<MyDocument notes={notes} title={title} isAllNotes={isAllNotes} />}
          fileName={fileName}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {({ loading }) => (
            <div className="flex gap-1 items-center">
              <div className="w-3 h-3 mr-1 border border-current border-t-transparent rounded-full animate-spin" />
              {loading ? 'Preparing...' : 'Generating...'}
            </div>
          )}
        </PDFDownloadLink>
      ) : (
        <PDFDownloadLink
          document={<MyDocument notes={notes} title={title} isAllNotes={isAllNotes} />}
          fileName={fileName}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {({ loading }) => (loading ? 'Preparing...' : children)}
        </PDFDownloadLink>
      )}
    </Button>
  )
}