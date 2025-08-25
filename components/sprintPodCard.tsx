import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Play, Pause } from "lucide-react"

interface SprintPodCardProps {
  title: string
  subtitle: string
  startTime: string
  participants: number
  maxParticipants: number
  isActive: boolean
}

export function SprintPodCard({
  title,
  subtitle,
  startTime,
  participants,
  maxParticipants,
  isActive,
}: SprintPodCardProps) {
  const progress = isActive ? 72 : 0 // 18 minutes left out of 25 = 72% complete

  return (
    <Card className={`${isActive ? "border-accent border-2 animate-pulse-glow" : "border-border"}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-montserrat font-bold flex items-center gap-2">
              {isActive ? (
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              ) : (
                <Clock className="w-4 h-4 text-muted-foreground" />
              )}
              {title}
            </CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{startTime}</div>
            <div className="text-xs text-muted-foreground">
              {participants}/{maxParticipants} builders
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isActive && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sprint Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(participants)].map((_, i) => (
              <Avatar key={i} className="w-8 h-8 border-2 border-background">
                <AvatarImage src={`/placeholder.svg?height=32&width=32&query=sprint participant ${i + 1}`} />
                <AvatarFallback className="text-xs">S{i + 1}</AvatarFallback>
              </Avatar>
            ))}
            {participants < maxParticipants && (
              <div className="w-8 h-8 bg-muted border-2 border-background rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>

          <Button
            variant={isActive ? "secondary" : "default"}
            disabled={isActive}
            className={isActive ? "animate-typing" : ""}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                In Progress
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Join Sprint
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
