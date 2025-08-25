import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Clock } from "lucide-react"

interface BuildFeedItemProps {
  user: {
    name: string
    avatar: string
    handle: string
  }
  activity: string
  timestamp: string
  likes: number
  comments: number
  project: string
}


export function BuildFeedItem({ user, activity, timestamp, likes, comments, project }: BuildFeedItemProps) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
  
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{user.name}</span>
                <span className="text-muted-foreground text-sm">{user.handle}</span>
                <Badge variant="secondary" className="text-xs">
                  {project}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground text-sm ml-auto">
                  <Clock className="w-3 h-3" />
                  {timestamp}
                </div>
              </div>
  
              <p className="text-foreground leading-relaxed">{activity}</p>
  
              <div className="flex items-center gap-6 pt-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                  <Heart className="w-4 h-4 mr-2" />
                  {likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {comments}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  