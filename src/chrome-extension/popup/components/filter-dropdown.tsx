"use client"
import { Check, Filter } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { mockVideos } from "../lib/mock-data"

export type FilterType = "all" | "video" | "recent" | "oldest"

interface FilterDropdownProps {
  currentFilter: FilterType
  selectedVideoId?: string
  onFilterChange: (filter: FilterType, videoId?: string) => void
}

export function FilterDropdown({ currentFilter, selectedVideoId, onFilterChange }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="text-xs h-6 px-2">
          <Filter className="w-3 h-3 mr-1" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs">Filter Notes</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-xs" onClick={() => onFilterChange("all")}>
          <Check className={`w-3 h-3 mr-2 ${currentFilter === "all" ? "opacity-100" : "opacity-0"}`} />
          All Notes
        </DropdownMenuItem>

        <DropdownMenuItem className="text-xs" onClick={() => onFilterChange("recent")}>
          <Check className={`w-3 h-3 mr-2 ${currentFilter === "recent" ? "opacity-100" : "opacity-0"}`} />
          Most Recent
        </DropdownMenuItem>

        <DropdownMenuItem className="text-xs" onClick={() => onFilterChange("oldest")}>
          <Check className={`w-3 h-3 mr-2 ${currentFilter === "oldest" ? "opacity-100" : "opacity-0"}`} />
          Oldest First
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs">By Video</DropdownMenuLabel>

        {mockVideos.map((video) => (
          <DropdownMenuItem key={video.id} className="text-xs" onClick={() => onFilterChange("video", video.id)}>
            <Check
              className={`w-3 h-3 mr-2 ${currentFilter === "video" && selectedVideoId === video.id ? "opacity-100" : "opacity-0"}`}
            />
            {video.title.length > 25 ? `${video.title.substring(0, 25)}...` : video.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
