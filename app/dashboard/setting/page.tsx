import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your blog preferences and settings.</p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Update your blog&apos;s general information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-name">Blog Name</Label>
              <Input id="blog-name" defaultValue="Inkwell" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-description">Description</Label>
              <Input id="blog-description" defaultValue="A place for creative writing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-url">Blog URL</Label>
              <Input id="blog-url" defaultValue="https://inkwell.blog" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how your blog looks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="flex gap-4">
                <Button variant="outline">Light</Button>
                <Button variant="outline">Dark</Button>
                <Button>System</Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <Input id="accent-color" type="color" defaultValue="#f43f5e" className="h-10 w-20" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates about your blog</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Comment Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when someone comments</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
