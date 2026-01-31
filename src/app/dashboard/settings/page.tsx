"use client";

import React from "react";
import {
  Bell,
  Lock,
  CreditCard,
  Eye,
  Globe,
  Trash2,
  ShieldCheck,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingItem = ({
  icon: Icon,
  title,
  description,
  action,
  badge,
}: {
  icon: any;
  title: string;
  description: string;
  action?: React.ReactNode;
  badge?: string;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/30 transition-colors group">
    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-sm text-foreground">{title}</h4>
        {badge && (
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <div>
      {action || (
        <ChevronRight size={18} className="text-muted-foreground/50" />
      )}
    </div>
  </div>
);

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-foreground">
          Account <span className="ght-text-gradient">Settings</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your notification preferences and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="bg-primary/5 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell size={20} className="text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Control how you hear from us.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-1">
            <SettingItem
              icon={Bell}
              title="Order Updates"
              description="Get notified when your order ships or reaches your door."
              action={<Switch defaultChecked />}
            />
            <SettingItem
              icon={CreditCard}
              title="Promotional Emails"
              description="Receive news about sales and new health products."
              action={<Switch defaultChecked />}
            />
            <SettingItem
              icon={Info}
              title="Health Tips & Advice"
              description="Personalized wellness advice from our experts."
              action={<Switch />}
            />
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="bg-ght-success/5 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck size={20} className="text-ght-success" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Keep your account safe and secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-1">
            <SettingItem
              icon={Lock}
              title="Change Password"
              description="Update your account password regularly."
            />
            <SettingItem
              icon={Eye}
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              badge="Recommended"
            />
            <SettingItem
              icon={Globe}
              title="Data & Privacy"
              description="Manage how your health data is used."
            />
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="border-border/50 shadow-lg lg:col-span-2">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <CardTitle className="text-lg">Account Management</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-3xl bg-destructive/5 border border-destructive/10 gap-4">
              <div>
                <h4 className="font-bold text-destructive mb-1">
                  Delete Account
                </h4>
                <p className="text-sm text-destructive/70 max-w-md">
                  Once you delete your account, all your health records, order
                  history, and preferences will be permanently removed. This
                  action cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                className="rounded-xl px-8 shadow-lg shadow-destructive/20 gap-2"
              >
                <Trash2 size={18} />
                Delete Permanently
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
