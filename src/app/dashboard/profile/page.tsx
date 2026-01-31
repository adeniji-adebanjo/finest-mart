"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/providers";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Save,
  Edit2,
  Camera,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { username } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: username.split(" ")[0] || "",
    lastName: username.split(" ")[1] || "",
    email: "[EMAIL_ADDRESS]", // Mock email
    phone: "+234 (800) 123-4567",
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    Swal.fire({
      title: "Profile Updated",
      text: "Your profile information has been saved successfully.",
      icon: "success",
      confirmButtonColor: "#27a89a",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-foreground">
          My <span className="ght-text-gradient">Profile</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <div className="h-24 bg-primary/10 w-full" />
            <CardContent className="p-6 text-center -mt-12">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-3xl ght-gradient border-4 border-background flex items-center justify-center text-white text-3xl font-black shadow-xl">
                  {username.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-xl shadow-lg border border-border/50 hover:bg-secondary/50 transition-colors">
                  <Camera size={16} className="text-primary" />
                </button>
              </div>
              <h3 className="text-xl font-black text-foreground">{username}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Member since Jan 2026
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <p className="text-sm font-bold text-ght-success">Active</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Level
                  </p>
                  <p className="text-sm font-bold text-amber-500">Gold Tier</p>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar size={16} className="text-primary" />
                  <span>Last login: Today 10:45 AM</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield size={16} className="text-ght-success" />
                  <span>Security Score: High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Edit Form */}
        <div className="xl:col-span-2">
          <Card className="border-border/50 shadow-lg h-full">
            <CardHeader className="flex flex-row gap-2 border-b border-border/50">
              <div className="flex-1">
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>
                  Update your contact details below.
                </CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "ghost"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2 rounded-xl"
              >
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <Edit2 size={16} /> Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <form onSubmit={handleUpdate}>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      First Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="firstName"
                        disabled={!isEditing}
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="rounded-xl border-border/50 bg-secondary/20"
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      disabled={!isEditing}
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="rounded-xl border-border/50 bg-secondary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="rounded-xl border-border/50 bg-secondary/20"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="rounded-xl border-border/50 bg-secondary/20"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 h-4 w-4" />
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                    <Shield size={14} /> Security Preferences
                  </h4>
                  <div className="space-y-4 bg-primary/5 p-6 rounded-3xl border border-primary/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Secure your account with 2FA protection
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-primary/20 text-primary"
                      >
                        Enable
                      </Button>
                    </div>
                    <Separator className="bg-primary/10" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          Manage Active Sessions
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Log out from other devices
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-primary/20 text-primary"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter className="bg-muted/30 border-t border-border/50 p-6 flex justify-end">
                  <Button
                    type="submit"
                    className="ght-gradient text-white rounded-xl shadow-lg px-8 gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
