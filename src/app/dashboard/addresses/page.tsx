"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  MoreVertical,
  Edit2,
  Trash2,
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
import { Badge } from "@/components/ui/badge";

const mockAddresses = [
  {
    id: "1",
    type: "Home",
    isDefault: true,
    firstName: "John",
    lastName: "Doe",
    street: "123 Health Way",
    city: "Wellness City",
    state: "CA",
    zipCode: "90210",
    phone: "+1 (555) 000-0000",
  },
  {
    id: "2",
    type: "Work",
    isDefault: false,
    firstName: "John",
    lastName: "Doe",
    street: "500 Medical Plaza, Suite 100",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 (555) 111-2222",
  },
];

export default function AddressesPage() {
  const [addresses] = useState(mockAddresses);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">
            My <span className="ght-text-gradient">Addresses</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your shipping and billing locations.
          </p>
        </div>
        <Button className="ght-gradient text-white rounded-xl shadow-lg gap-2">
          <Plus size={18} />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`border-border/50 shadow-lg relative overflow-hidden group ${address.isDefault ? "ring-2 ring-primary ring-offset-2" : ""}`}
          >
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-border/50 bg-secondary/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                  {address.type === "Home" ? (
                    <Home size={16} />
                  ) : (
                    <Briefcase size={16} />
                  )}
                </div>
                <CardTitle className="text-base font-bold">
                  {address.type}
                </CardTitle>
                {address.isDefault && (
                  <Badge className="bg-ght-success/10 text-ght-success border-none text-[10px] uppercase font-bold px-2 py-0">
                    Default
                  </Badge>
                )}
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical size={18} />
              </button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-1 text-sm">
                <p className="font-bold text-base mb-2">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-muted-foreground">{address.street}</p>
                <p className="text-muted-foreground">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-muted-foreground mt-4 block font-medium">
                  Phone:{" "}
                  <span className="text-foreground">{address.phone}</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 border-t border-border/50 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 rounded-lg gap-2 hover:bg-white text-muted-foreground hover:text-primary"
              >
                <Edit2 size={14} /> Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 rounded-lg gap-2 hover:bg-white text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} /> Remove
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Slot */}
        <button className="border-2 border-dashed border-border/50 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/30 hover:bg-primary/5 transition-all group min-h-[200px]">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Plus size={24} />
          </div>
          <p className="font-bold text-muted-foreground group-hover:text-primary transition-colors">
            Add another address
          </p>
        </button>
      </div>
    </div>
  );
}
