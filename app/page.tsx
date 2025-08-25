"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coffee, Users, Zap, Rocket, Code, Palette, Server, Bot, Play } from "lucide-react"
import { useRouter } from "next/router"
import { RoomCard } from "@/components/roomCard"
import { BuildFeedItem } from "@/components/buildFeedItem"
import { SprintPodCard } from "@/components/sprintPodCard"
import Image from "next/image"

export default function HomePage() {
  const [currentView, setCurrentView] = useState("dashboard")
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-float">
                <Coffee className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-montserrat font-black text-xl text-foreground">The Ship Café</h1>
                <p className="text-sm text-muted-foreground">Where builders ship together ☕</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant={currentView === "dashboard" ? "default" : "ghost"}
                onClick={() => setCurrentView("dashboard")}
                className="font-medium"
              >
                Dashboard
              </Button>
              <Button
                variant={currentView === "rooms" ? "default" : "ghost"}
                onClick={() => setCurrentView("rooms")}
                className="font-medium"
              >
                Rooms
              </Button>
              <Button
                variant={currentView === "feed" ? "default" : "ghost"}
                onClick={() => setCurrentView("feed")}
                className="font-medium"
              >
                Build Feed
              </Button>
              <Button
                variant={currentView === "sprints" ? "default" : "ghost"}
                onClick={() => setCurrentView("sprints")}
                className="font-medium"
              >
                Sprint Pods
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>KB</AvatarFallback>
              </Avatar>
              <Button variant="secondary" size="sm">
                <Rocket className="w-4 h-4 mr-2" />
                Ship It!
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "rooms" && <RoomsView />}
        {currentView === "feed" && <BuildFeedView />}
        {currentView === "sprints" && <SprintPodsView />}
      </main>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Hero Section with Kiwi */}
      <section className="text-center py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-background rounded-3xl"></div>
        <div className="relative z-10">
          <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-6" />
          <h2 className="font-montserrat font-black text-4xl md:text-6xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to The Ship Café
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Where builders, makers, and creators come together to ship amazing projects. Grab a virtual coffee and let&apos;s
            build something incredible! ☕
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold animate-pulse-glow">
              <Coffee className="w-5 h-5 mr-2" />
              Join a Room
            </Button>
            <Button variant="secondary" size="lg" className="font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Start Sprint
            </Button>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <Card className="border-2 border-accent/20">
        <CardHeader>
          <CardTitle className="font-montserrat font-bold flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            Now Working On
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Building The Ship Café Platform</h3>
              <p className="text-muted-foreground">Virtual co-work space for builders</p>
            </div>
            <Badge variant="secondary" className="animate-typing">
              In Progress
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">127</div>
            <div className="text-sm text-muted-foreground">Active Builders</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Coffee className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">Active Rooms</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Zap className="w-8 h-8 mx-auto mb-2 text-accent" />
            <div className="text-2xl font-bold">23</div>
            <div className="text-sm text-muted-foreground">Sprints Today</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Rocket className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Projects Shipped</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RoomsView() {
  const router = useRouter()

  const rooms = [
    {
      name: "Frontend Table",
      icon: Code,
      occupants: 12,
      activity: "High",
      description: "React, Vue, Angular builders",
      slug: "frontend-table",
    },
    {
      name: "AI Corner",
      icon: Bot,
      occupants: 8,
      activity: "Medium",
      description: "ML, AI, and automation projects",
      slug: "ai-corner",
    },
    {
      name: "Design Booth",
      icon: Palette,
      occupants: 6,
      activity: "Low",
      description: "UI/UX designers and creatives",
      slug: "design-booth",
    },
    {
      name: "Backend Bar",
      icon: Server,
      occupants: 15,
      activity: "High",
      description: "APIs, databases, and infrastructure",
      slug: "backend-bar",
    },
    {
      name: "Indie Hackers",
      icon: Rocket,
      occupants: 20,
      activity: "Very High",
      description: "Solo builders and entrepreneurs",
      slug: "indie-hackers",
    },
  ]

  const handleJoinRoom = (slug: string) => {
    router.push(`/room/${slug}`)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-montserrat font-black text-3xl mb-4">Choose Your Table</h2>
        <p className="text-muted-foreground mb-8">Find your tribe and start building together</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.name} onClick={() => handleJoinRoom(room.slug)} className="cursor-pointer">
            <RoomCard {...room} />
          </div>
        ))}
      </div>

      <Card className="border-dashed border-2 border-muted-foreground/30">
        <CardContent className="text-center py-12">
          <Coffee className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">Create Private Room</h3>
          <p className="text-muted-foreground mb-4">Start your own focused workspace</p>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function BuildFeedView() {
  const feedItems = [
    {
      user: { name: "Alex Chen", avatar: "/placeholder.svg?height=40&width=40", handle: "@alexbuilds" },
      activity: "Just shipped a new feature for my SaaS dashboard! 🚀",
      timestamp: "2 minutes ago",
      likes: 12,
      comments: 3,
      project: "TaskFlow Pro",
    },
    {
      user: { name: "Sarah Kim", avatar: "/placeholder.svg?height=40&width=40", handle: "@sarahdesigns" },
      activity: "Working on some sick animations for the landing page ✨",
      timestamp: "15 minutes ago",
      likes: 8,
      comments: 1,
      project: "Portfolio Redesign",
    },
    {
      user: { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=40&width=40", handle: "@mikedev" },
      activity: "Finally got the API performance optimized. 50% faster queries! 💪",
      timestamp: "1 hour ago",
      likes: 24,
      comments: 7,
      project: "E-commerce Backend",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-montserrat font-black text-3xl mb-2">Build Feed</h2>
          <p className="text-muted-foreground">See what the community is shipping</p>
        </div>
        <Button className="animate-pulse-glow">
          <Rocket className="w-4 h-4 mr-2" />
          Share Update
        </Button>
      </div>

      <div className="space-y-6">
        {feedItems.map((item, index) => (
          <BuildFeedItem key={index} {...item} />
        ))}
      </div>

      <div className="text-center py-8">
        <Button variant="outline" size="lg">
          Load More Updates
        </Button>
      </div>
    </div>
  )
}

function SprintPodsView() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-montserrat font-black text-3xl mb-4">Sprint Pods</h2>
        <p className="text-muted-foreground mb-8">50-minute focused work sessions with fellow builders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SprintPodCard
          title="Next Sprint Starting"
          subtitle="Join 3 other builders for a focused session"
          startTime="2 minutes"
          participants={3}
          maxParticipants={4}
          isActive={false}
        />

        <SprintPodCard
          title="Active Sprint"
          subtitle="Frontend focus session in progress"
          startTime="18 minutes left"
          participants={4}
          maxParticipants={4}
          isActive={true}
        />
      </div>

      <Card className="text-center">
        <CardContent className="py-12">
          <div className="max-w-md mx-auto">
            <Zap className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h3 className="font-montserrat font-bold text-xl mb-4">How Sprint Pods Work</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span>Join a pod with up to 3 other builders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span>Work focused for 50 minutes together</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span>Share progress in 2-minute show & tell</span>
              </div>
            </div>
            <Button size="lg" className="mt-6 w-full" onClick={() => router.push("/sprint")}>
              <Play className="w-5 h-5 mr-2" />
              Join Next Sprint
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
