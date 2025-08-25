import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Coffee } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface RoomCardProps {
  name: string
  icon: LucideIcon
  occupants: number
  activity: string
  description: string
}

export function RoomCard({ name, icon: Icon, occupants, activity, description }: RoomCardProps) {
  const activityColors = {
    Low: "bg-muted text-muted-foreground",
    Medium: "bg-secondary/20 text-secondary-foreground",
    High: "bg-accent/20 text-accent-foreground",
    "Very High": "bg-primary/20 text-primary-foreground",
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-accent/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-montserrat font-bold text-lg">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Badge className={activityColors[activity as keyof typeof activityColors]}>{activity}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{occupants} builders</span>
          </div>

          <div className="flex -space-x-2">
            {[...Array(Math.min(occupants, 4))].map((_, i) => (
              <Avatar key={i} className="w-6 h-6 border-2 border-background">
                <AvatarImage src={`/placeholder.svg?height=24&width=24&query=builder ${i + 1}`} />
                <AvatarFallback className="text-xs">B{i + 1}</AvatarFallback>
              </Avatar>
            ))}
            {occupants > 4 && (
              <div className="w-6 h-6 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+{occupants - 4}</span>
              </div>
            )}
          </div>
        </div>

        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Coffee className="w-4 h-4 mr-2" />
          Join Room
        </Button>
      </CardContent>
    </Card>
  )
}
