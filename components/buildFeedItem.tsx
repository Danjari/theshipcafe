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
