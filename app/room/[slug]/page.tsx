"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { RoomInterior } from "@/components/roomInterior"
import { Code } from "lucide-react"
import Image from "next/image"

const roomData = {
  "frontend-table": {
    name: "Frontend Table",
    icon: <Code className="w-6 h-6 text-primary" />,
    participants: [
      {
        id: "you",
        name: "You",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "User authentication flow",
        activity: "Typing...",
        focusLevel: "Deep Focus",
        isOnline: true,
        isYou: true,
      },
      {
        id: "sarah",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "React component library",
        activity: "Just shipped: Button component",
        focusLevel: "In Flow",
        isOnline: true,
      },
      {
        id: "alex",
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "API integration",
        activity: "Taking a coffee break ☕",
        focusLevel: "Taking Break",
        isOnline: true,
      },
      {
        id: "maya",
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "Dashboard redesign",
        activity: "Last active: 5 min ago",
        focusLevel: "Stepping Away",
        isOnline: false,
      },
      {
        id: "david",
        name: "David Kim",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "Performance optimization",
        activity: "Just committed: Bundle size reduced by 15%",
        focusLevel: "Deep Focus",
        isOnline: true,
      },
      {
        id: "emma",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "State management refactor",
        activity: "Pair programming with Sarah",
        focusLevel: "Collaborating",
        isOnline: true,
      },
      {
        id: "marcus",
        name: "Marcus Johnson",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "Responsive design fixes",
        activity: "In a meeting",
        focusLevel: "Busy",
        isOnline: true,
      },
      {
        id: "lisa",
        name: "Lisa Zhang",
        avatar: "/placeholder.svg?height=48&width=48",
        status: "Testing suite",
        activity: "Just shipped: Unit tests for auth module",
        focusLevel: "In Flow",
        isOnline: true,
      },
    ],
  },
}

export default function RoomPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const roomSlug = params.slug as string
  const room = roomData[roomSlug as keyof typeof roomData]

  useEffect(() => {
    // Simulate loading animation
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleLeaveRoom = () => {
    router.push("/")
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <button onClick={() => router.push("/")} className="text-primary hover:underline">
            Return to dashboard
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto animate-bounce" />
          <div className="space-y-2">
            <h2 className="font-montserrat font-bold text-2xl">Welcome to the {room.name}! ☕</h2>
            <p className="text-muted-foreground">Finding you a cozy spot...</p>
          </div>
          <div className="w-64 mx-auto">
            <div className="bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{loadingProgress}%</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <RoomInterior
      roomName={room.name}
      roomIcon={room.icon}
      participants={room.participants}
      onLeaveRoom={handleLeaveRoom}
    />
  )
}
