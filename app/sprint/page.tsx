"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Coffee,
  Users,
  Rocket,
  Mic,
  Video,
  Share,
  HelpCircle,
  CheckCircle,
  Heart,
  ThumbsUp,
  ArrowRight,
  Play,
} from "lucide-react"
import Image from "next/image"

type SprintPhase = "matching" | "introduction" | "countdown" | "active" | "break" | "showTell" | "continue" | "complete"

export default function SprintPage() {
  const [phase, setPhase] = useState<SprintPhase>("matching")
  const [timeLeft, setTimeLeft] = useState(50 * 60) // 50 minutes in seconds
  const [matchingProgress, setMatchingProgress] = useState(0)
  const [teamGoal, setTeamGoal] = useState("")
  const [personalGoal, setPersonalGoal] = useState("")
  const [currentPresenter, setCurrentPresenter] = useState(0)
  const [continueVotes, setContinueVotes] = useState({ you: false, jake: false, priya: false, tom: false })

  // Simulate matching process
  useEffect(() => {
    if (phase === "matching") {
      const interval = setInterval(() => {
        setMatchingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setPhase("introduction"), 1000)
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [phase])

  // Timer countdown
  useEffect(() => {
    if (phase === "active" && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPhase("break")
            return 5 * 60 // 5 minute break
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [phase, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const teamMembers = [
    {
      name: "You",
      role: "Full-stack Dev",
      project: "Authentication system",
      progress: 75,
      status: "Deep Focus",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Jake Smith",
      role: "React Dev",
      project: "Dashboard components",
      progress: 60,
      status: "In Flow",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Priya Patel",
      role: "UI Designer",
      project: "User flow designs",
      progress: 90,
      status: "Designing",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Tom Chen",
      role: "Backend Dev",
      project: "API optimization",
      progress: 40,
      status: "Debugging",
      avatar: "/placeholder.svg?height=120&width=120",
    },
  ]

  if (phase === "matching") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-4" />
            <CardTitle className="font-montserrat font-bold text-2xl">Finding your perfect sprint team... 🚀</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <div className="w-24 h-24 mx-auto border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
              <Coffee className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent" />
            </div>

            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-sm">Looking for: React developers, Similar timezone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Skill level: Mix of experience</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Project compatibility: High</span>
              </div>
            </div>

            <Progress value={matchingProgress} className="h-3" />

            <p className="text-sm text-muted-foreground">Usually 15-45 seconds</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (phase === "introduction") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-4 animate-bounce" />
            <h1 className="font-montserrat font-black text-3xl mb-2">Perfect team assembled! Let&apos;s ship together ☕</h1>
            <p className="text-muted-foreground">50 minutes of focused collaboration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className={index === 0 ? "border-accent border-2" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Working on:</span> {member.project}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Team Goal Setting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  What do you want to accomplish together in 50 minutes?
                </label>
                <Input
                  placeholder="Help each other ship something meaningful"
                  value={teamGoal}
                  onChange={(e) => setTeamGoal(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your individual goal:</label>
                <Input
                  placeholder="Get auth flow working"
                  value={personalGoal}
                  onChange={(e) => setPersonalGoal(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" onClick={() => setPhase("countdown")} className="animate-pulse-glow">
              <Rocket className="w-5 h-5 mr-2" />
              Start Sprint Session
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "countdown") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-6" />
            <h2 className="font-montserrat font-bold text-2xl mb-4">Ready to ship together! 🚀</h2>
            <div className="text-6xl font-black text-accent mb-6 animate-pulse">3</div>
            <p className="text-muted-foreground mb-6">Team &quot;Code & Coffee&quot; ☕</p>
            <Button size="lg" onClick={() => setPhase("active")} className="w-full">
              <Play className="w-5 h-5 mr-2" />
              Begin Sprint
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (phase === "active") {
    return (
      <div className="min-h-screen bg-background p-4">
        {/* Header */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black text-accent">{formatTime(timeLeft)}</div>
              <div>
                <h2 className="font-semibold">Focused Work Session</h2>
                <p className="text-sm text-muted-foreground">4 builders • All cameras ON</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Team Goal</p>
              <p className="text-xs text-muted-foreground">Help each other ship something meaningful</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className={`${index === 0 ? "border-accent border-2" : ""} relative overflow-hidden`}>
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant={member.status === "Deep Focus" ? "default" : "secondary"} className="text-xs">
                        {member.status}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <div className="w-6 h-6 bg-background/80 rounded-full flex items-center justify-center">
                        <Mic className="w-3 h-3" />
                      </div>
                      <div className="w-6 h-6 bg-background/80 rounded-full flex items-center justify-center">
                        <Video className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white font-medium text-sm">{member.name}</p>
                      <p className="text-white/80 text-xs">{member.project}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={member.progress} className="h-1 flex-1" />
                        <span className="text-white/80 text-xs">{member.progress}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Screen Share
              </Button>
                <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Need Help
              </Button>
              <Button variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Update Progress
              </Button>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Team Chat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">J</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        <span className="font-medium">Jake:</span> Anyone want to pair on this component?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">P</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        <span className="font-medium">Priya:</span> Just finished the user flows, want to see them?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">T</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        <span className="font-medium">Tom:</span> API optimization is going well, 40% faster now
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Input placeholder="Type a message..." className="text-sm" />
                </div>

                <div className="border-t pt-4 space-y-2">
                  <h4 className="font-medium text-sm">Team Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Overall</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "break") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-2xl text-center">
          <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-6" />
          <h2 className="font-montserrat font-black text-3xl mb-4">Time to connect and celebrate! ☕</h2>
          <div className="text-2xl font-bold text-accent mb-8">Break: {formatTime(timeLeft)}</div>

          <Card className="mb-8">
            <CardContent className="py-8">
              <h3 className="font-semibold text-lg mb-4">What did you accomplish?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.progress}% complete</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button size="lg" onClick={() => setPhase("showTell")} className="animate-pulse-glow">
            <ArrowRight className="w-5 h-5 mr-2" />
            Start Show & Tell
          </Button>
        </div>
      </div>
    )
  }

  if (phase === "showTell") {
    const presenter = teamMembers[currentPresenter]

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-montserrat font-black text-3xl mb-2">Show & Tell Time</h2>
            <p className="text-muted-foreground">2 minutes each to share your progress</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Presenter Spotlight */}
            <div className="lg:col-span-2">
              <Card className="border-accent border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{presenter.name} - Presenting</CardTitle>
                    <Badge variant="secondary">1:45 remaining</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg mb-4 relative">
                    <Image
                      src={presenter.avatar || "/placeholder.svg"}
                      alt={presenter.name}
                      className="w-full h-full object-cover rounded-lg"
                      width={100}
                      height={100}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium">{presenter.project}</p>
                      <Progress value={presenter.progress} className="h-2 mt-2" />
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground">
                    &quot;{presenter.project} completed and ready for testing&quot;
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Audience */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teamMembers
                    .filter((_, i) => i !== currentPresenter)
                    .map((member, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name}</span>
                        <div className="flex gap-1 ml-auto">
                          <ThumbsUp className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                          <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                          <Rocket className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer" />
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={() => {
                    if (currentPresenter < teamMembers.length - 1) {
                      setCurrentPresenter(currentPresenter + 1)
                    } else {
                      setPhase("continue")
                    }
                  }}
                >
                  {currentPresenter < teamMembers.length - 1 ? "Next Presenter" : "Finish Show & Tell"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "continue") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-2xl text-center">
          <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-6" />
          <h2 className="font-montserrat font-black text-3xl mb-4">Amazing work, team! Want to keep going? 🚀</h2>

          <Card className="mb-8">
            <CardContent className="py-8">
              <h3 className="font-semibold text-lg mb-6">Sprint Results</h3>
              <div className="grid grid-cols-2 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-accent">50</div>
                  <div className="text-sm text-muted-foreground">Minutes focused</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">4</div>
                  <div className="text-sm text-muted-foreground">Features shipped</div>
                </div>
              </div>

              <div className="space-y-3 text-left">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <Badge variant="secondary">{member.project}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Continue with this team?</h3>
            <div className="flex justify-center gap-8">
              <Button size="lg" onClick={() => setPhase("complete")} className="animate-pulse-glow">
                <Rocket className="w-5 h-5 mr-2" />
                Start Another Session
              </Button>
              <Button variant="outline" size="lg" onClick={() => setPhase("complete")}>
                End Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl text-center">
        <Image src="/kiwi.png" alt="Kiwi" width={100} height={100} className="mx-auto mb-6 animate-bounce" />
        <h2 className="font-montserrat font-black text-3xl mb-4">Incredible collaboration! 🎉</h2>

        <Card className="mb-8">
          <CardContent className="py-8">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <div className="text-2xl font-bold text-accent">50</div>
                <div className="text-sm text-muted-foreground">Minutes focused</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-sm text-muted-foreground">Builders collaborated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Participation</div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <Badge variant="secondary" className="px-4 py-2">
                Perfect Sprint
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Team Bond
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Ship Master
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button size="lg" className="w-full">
            <Users className="w-5 h-5 mr-2" />
            Save Team as Favorites
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent">
            <Share className="w-5 h-5 mr-2" />
            Share Progress to Build Feed
          </Button>
        </div>
      </div>
    </div>
  )
}
