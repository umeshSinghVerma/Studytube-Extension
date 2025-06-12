"use client"

import { useState, useEffect } from "react"
import { Search, Expand, Play, Settings, User, FileText, BookOpen, Youtube, Sparkles } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Card, CardContent } from "./components/ui/card"
import { ThemeProvider } from "./components/theme-provider"
import { ThemeToggle } from "./components/theme-toggle"
import type { FilterType } from "./components/filter-dropdown"
import { AllNotesView } from "./components/all-notes-view"
import { VideoNotesView } from "./components/video-notes-view"
// import { PlaylistView } from "./components/playlist-view"
import { LoadingSpinner } from "./components/loading-skeleton"
import { useVideos, useAllNotes } from "./hooks/use-api"
import { getCurrentVideoId, isYoutube } from "./lib/utils"

function StudyTubeExtension() {
  const [isOnYouTube, setIsOnYouTube] = useState(false)
  const [activeTab, setActiveTab] = useState("single")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all")
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>()
  const [searchLoading, setSearchLoading] = useState(false)

  // API hooks for global data
  const { videos } = useVideos()
  const { notes } = useAllNotes()

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchLoading(true)
      const timer = setTimeout(() => {
        setSearchLoading(false)
      }, 1000) // Simulate search delay
      return () => clearTimeout(timer)
    } else {
      setSearchLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    async function isYoutubeOpen() {
      const isOnYouTubeVideo = await isYoutube();
      setIsOnYouTube(!!isOnYouTubeVideo);
    }
    async function setCurrentVideo() {
      const currentVideoId = await getCurrentVideoId();
      console.log("currentVideo", currentVideoId);
      setSelectedVideoId(currentVideoId ?? undefined);
    }
    isYoutubeOpen();
    setCurrentVideo();

  }, [])

  const handleFilterChange = (filter: FilterType, videoId?: string) => {
    setCurrentFilter(filter)
    setSelectedVideoId(videoId)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  if (!isOnYouTube) {
    return (
      <div className="w-[400px] h-[600px] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/10 dark:bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-200/20 rounded-full blur-2xl"></div>

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* StudyTube Logo */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 transform rotate-3">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            StudyTube
          </h1>
          <p className="text-sm text-muted-foreground font-medium">Your YouTube Study Companion</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center max-w-xs relative z-10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-full border border-emerald-200 dark:border-emerald-800/30 shadow-lg">
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-foreground">Ready to capture knowledge</span>
            </div>
          </div>

          <p className="text-foreground text-lg leading-relaxed mb-6 font-medium">
            Open a YouTube video to start working
          </p>

          <div className="p-6 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-2xl border border-emerald-100 dark:border-emerald-800/30 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <Youtube className="w-4 h-4 text-red-500" />
                </div>
                <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Navigate to any YouTube video and this extension will help you capture, organize, and export your study
              notes with beautiful PDFs.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[400px] h-[600px] bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-card border-b border-border p-3 flex items-center gap-2 flex-shrink-0 min-w-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded flex items-center justify-center flex-shrink-0">
            <FileText className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">StudyTube</span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          {searchLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="sm" />
            </div>
          )}
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-7 pr-8 h-7 text-xs border-border focus:border-emerald-300 focus:ring-emerald-200 dark:focus:border-emerald-600 w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs"
            onClick={() => {
              window.open("https://frametagger.com/learn?v=390423", "_blank");
            }}
          >
            <Expand className="w-3 h-3" />
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-w-0">
        {/* Sidebar */}
        <div className="w-16 bg-muted/30 border-r border-border flex flex-col flex-shrink-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="flex-1">
            <TabsList className="flex flex-col h-full w-full bg-transparent p-1 gap-1">
              <TabsTrigger
                value="single"
                className="w-full h-12 flex flex-col items-center justify-center text-xs data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 hover:bg-muted"
              >
                <Play className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Video</span>
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="w-full h-12 flex flex-col items-center justify-center text-xs data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 hover:bg-muted"
              >
                <BookOpen className="w-4 h-4 mb-1" />
                <span className="text-[10px]">All</span>
              </TabsTrigger>
              {/* <TabsTrigger
                value="playlist"
                className="w-full h-12 flex flex-col items-center justify-center text-xs data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 hover:bg-muted"
              >
                <FolderOpen className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Playlist</span>
              </TabsTrigger> */}
              <TabsTrigger
                value="settings"
                className="w-full h-12 flex flex-col items-center justify-center text-xs data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 hover:bg-muted"
              >
                <Settings className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Settings</span>
              </TabsTrigger>
              <TabsTrigger
                value="user"
                className="w-full h-12 flex flex-col items-center justify-center text-xs data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 hover:bg-muted mt-auto"
              >
                <User className="w-4 h-4 mb-1" />
                <span className="text-[10px]">User</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Tabs value={activeTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsContent value="single" className="flex-1 p-4 m-0 overflow-hidden">
              <VideoNotesView
                searchQuery={searchQuery}
                currentFilter={currentFilter}
                selectedVideoId={selectedVideoId}
                onFilterChange={handleFilterChange}
              />
            </TabsContent>

            <TabsContent value="all" className="flex-1 p-4 m-0 overflow-hidden">
              <AllNotesView searchQuery={searchQuery} />
            </TabsContent>

            {/* <TabsContent value="playlist" className="flex-1 p-4 m-0 overflow-hidden">
              <PlaylistView />
            </TabsContent> */}

            <TabsContent value="settings" className="flex-1 p-4 m-0 overflow-hidden">
              <div className="h-full flex flex-col overflow-hidden">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex-shrink-0">Settings</h3>
                <div className="flex-1 overflow-y-auto overflow-x-hidden studytube-scrollbar">
                  <Card className="border-border/50">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium text-foreground">Theme</label>
                          <div className="mt-1 flex gap-2">
                            <ThemeToggle />
                            <span className="text-xs text-muted-foreground">Toggle dark/light mode</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground">Auto-capture screenshots</label>
                          <div className="mt-1">
                            <Button size="sm" variant="outline" className="text-xs h-6">
                              Enabled
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground">Export format</label>
                          <div className="mt-1">
                            <Button size="sm" variant="outline" className="text-xs h-6">
                              PDF with Images
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground">Note compilation</label>
                          <div className="mt-1">
                            <Button size="sm" variant="outline" className="text-xs h-6">
                              Auto-compile per video
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="user" className="flex-1 p-4 m-0 overflow-hidden">
              <div className="h-full flex flex-col overflow-hidden">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex-shrink-0">User Profile</h3>
                <div className="flex-1 overflow-y-auto overflow-x-hidden studytube-scrollbar">
                  <Card className="border-border/50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Study User</p>
                        <p className="text-xs text-muted-foreground">student@example.com</p>
                        <div className="mt-3 space-y-2">
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">{videos.length}</span> videos studied
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">{notes.length}</span> notes compiled
                          </div>
                        </div>
                        <Button className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7">
                          Sync Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function Popup() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="studytube-ui-theme">
      <StudyTubeExtension />
    </ThemeProvider>
  )
}
