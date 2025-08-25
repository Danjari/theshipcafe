"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Coffee, Clock, Users, Volume2, VolumeX, Camera, LogOut, Send, MoreHorizontal } from "lucide-react"

interface Participant {
  id: string
  name: string
  avatar: string
  status: string
  activity: string
  focusLevel: string
  isOnline: boolean
  isYou?: boolean
}

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: string
}

interface RoomInteriorProps {
  roomName: string
  roomIcon: React.ReactNode
  participants: Participant[]
  onLeaveRoom: () => void
}

export function RoomInterior({ roomName, roomIcon, participants, onLeaveRoom }: RoomInteriorProps) {
  const [ambientSounds, setAmbientSounds] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [messages] = useState<ChatMessage[]>([
    { id: "1", user: "Sarah Chen", message: "Anyone tried the new React 19 features yet?", timestamp: "2:31 PM" },
    {
      id: "2",
      user: "David Kim",
      message: "The concurrent features are game-changing for our app",
      timestamp: "2:32 PM",
    },
    {
      id: "3",
      user: "Alex Rodriguez",
      message: "Just finished the API docs, linking them in the chat",
      timestamp: "2:33 PM",
    },
    { id: "4", user: "Emma Wilson", message: "Sarah, want to pair on that component library?", timestamp: "2:33 PM" },
    { id: "5", user: "Sarah Chen", message: "Let's hop on a quick call", timestamp: "2:34 PM" },
  ])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message to the server
      setChatMessage("")
    }
  }

  const getFocusLevelColor = (level: string) => {
    switch (level) {
      case "Deep Focus":
        return "bg-red-500/20 text-red-700 border-red-200"
      case "In Flow":
        return "bg-green-500/20 text-green-700 border-green-200"
      case "Collaborating":
        return "bg-blue-500/20 text-blue-700 border-blue-200"
      case "Taking Break":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-200"
      case "Stepping Away":
        return "bg-gray-500/20 text-gray-700 border-gray-200"
      case "Busy":
        return "bg-orange-500/20 text-orange-700 border-orange-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getOnlineStatus = (participant: Participant) => {
    if (!participant.isOnline) return "bg-gray-400"
    if (participant.focusLevel === "Busy") return "bg-red-500"
    if (participant.focusLevel === "Stepping Away") return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Room Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">{roomIcon}</div>
              <div>
                <h1 className="font-montserrat font-bold text-xl flex items-center gap-2">
                  {roomName}
                  <Badge variant="secondary" className="text-xs">
                    Focused & Collaborative
                  </Badge>
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    2:34 PM
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {participants.length} builders • 3 active • 5 projects shipping
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={ambientSounds ? "default" : "outline"}
                size="sm"
                onClick={() => setAmbientSounds(!ambientSounds)}
                className="gap-2"
              >
                {ambientSounds ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                Café Sounds: {ambientSounds ? "ON" : "OFF"}
              </Button>
              <Button variant="outline" size="sm" onClick={onLeaveRoom} className="gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                Leave Room
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Workspace Area */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {participants.map((participant) => (
                <Card
                  key={participant.id}
                  className={`relative transition-all duration-300 hover:shadow-lg ${
                    participant.isYou ? "ring-2 ring-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getOnlineStatus(participant)}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-semibold">{participant.name}</CardTitle>
                          {participant.isYou && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs mt-1 ${getFocusLevelColor(participant.focusLevel)}`}
                        >
                          {participant.focusLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Now Working On:</p>
                      <p className="text-sm font-medium">{participant.status}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Activity:</p>
                      <p className="text-sm">{participant.activity}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-montserrat font-bold">{roomName} Chat</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {participants.filter((p) => p.isOnline).length} members online
                </p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{message.user}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-0">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs gap-1 bg-transparent">
                      <Coffee className="w-3 h-3" />
                      Update Status
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs gap-1 bg-transparent">
                      <Camera className="w-3 h-3" />
                      Screenshot
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs gap-1 bg-transparent">
                      <Coffee className="w-3 h-3" />
                      Start Break
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs gap-1 bg-transparent">
                      <MoreHorizontal className="w-3 h-3" />
                      More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
