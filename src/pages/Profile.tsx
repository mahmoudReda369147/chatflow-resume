import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, Bell, CreditCard, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    bio: "Professional resume creator and career consultant",
    company: "TechCorp Inc.",
    position: "Senior Developer"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="shadow-medium border-2">
              <CardHeader className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary shadow-glow">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  <AvatarFallback className="text-4xl">JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription className="text-base">{userData.position}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{userData.company}</span>
                </div>
                <Button className="w-full gradient-accent shadow-glow mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 p-1 h-auto">
                <TabsTrigger value="profile" className="py-3">Profile</TabsTrigger>
                <TabsTrigger value="security" className="py-3">Security</TabsTrigger>
                <TabsTrigger value="notifications" className="py-3">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="shadow-medium border-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and bio</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input 
                          id="position" 
                          value={userData.position}
                          onChange={(e) => setUserData({...userData, position: e.target.value})}
                          className="border-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={userData.company}
                        onChange={(e) => setUserData({...userData, company: e.target.value})}
                        className="border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={userData.bio}
                        onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        className="border-2 min-h-32"
                      />
                    </div>
                    <Button className="gradient-accent shadow-glow">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="shadow-medium border-2">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="border-2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="border-2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="border-2" />
                    </div>
                    <Button className="gradient-accent shadow-glow">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="shadow-medium border-2">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="email-notif" className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="email-notif"
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="push-notif" className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                      <Switch 
                        id="push-notif"
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="updates-notif" className="text-base">Product Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about new features</p>
                      </div>
                      <Switch 
                        id="updates-notif"
                        checked={notifications.updates}
                        onCheckedChange={(checked) => setNotifications({...notifications, updates: checked})}
                      />
                    </div>
                    <Button className="gradient-accent shadow-glow">
                      <Bell className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
