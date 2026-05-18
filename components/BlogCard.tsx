import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Eye } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  views: number;
  tags: string[];
  coverImage?: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  readTime,
  views,
  tags,
  coverImage,
}: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {coverImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/dashboard/blogs/${id}/edit`}>
          <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author.name}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {views}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
