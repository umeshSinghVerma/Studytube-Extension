"use client"

import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"

export function VideoHeaderSkeleton() {
  return (
    <Card className="mb-3 border-border/50 flex-shrink-0 overflow-hidden">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-4 w-8 rounded-full" />
          </div>
          <Skeleton className="h-6 w-16 ml-2 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-2 w-1" />
          <Skeleton className="h-2 w-24" />
        </div>
      </CardHeader>
    </Card>
  )
}

export function NoteCardSkeleton() {
  return (
    <Card className="mb-3 border-border/50 overflow-hidden">
      <CardContent className="p-3">
        {/* Image skeleton */}
        <Skeleton className="w-full h-32 rounded mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

export function VideoAccordionSkeleton() {
  return (
    <div className="mb-4">
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="p-3 pb-2">
          <div className="flex items-center justify-between w-full min-w-0">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Skeleton className="w-3 h-3 flex-shrink-0" />
              <Skeleton className="h-3 w-40 flex-1" />
              <Skeleton className="h-4 w-6 rounded-full flex-shrink-0" />
            </div>
            <Skeleton className="h-6 w-12 ml-2 flex-shrink-0" />
          </div>
          <div className="flex items-center gap-2 ml-5 mt-2">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-2 w-1" />
            <Skeleton className="h-2 w-12" />
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export function PlaylistItemSkeleton() {
  return (
    <div className="p-3 rounded border bg-muted/50 border-border">
      <div className="flex items-center gap-2 min-w-0">
        <Skeleton className="w-2 h-2 rounded-full flex-shrink-0" />
        <Skeleton className="h-3 w-32 flex-1" />
      </div>
      <Skeleton className="h-2 w-20 mt-1" />
    </div>
  )
}

export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
  )
}

export function FullPageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground mt-3">Loading your study notes...</p>
      </div>
    </div>
  )
}
