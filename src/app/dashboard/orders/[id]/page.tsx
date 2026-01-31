"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import {
  Package,
  ChevronLeft,
  Calendar,
  Truck,
  MapPin,
  CreditCard,
  Clock,
  ExternalLink,
  Printer,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: Timestamp;
  items: OrderItem[];
  paymentStatus: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
}

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-ght-success/10 text-ght-success",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { userId } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !userId) return;

    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", id as string);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const data = orderSnap.data() as Order;
          setOrder({ ...data, id: orderSnap.id });
        } else {
          console.error("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-64 bg-muted rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-muted rounded-3xl" />
          <div className="h-40 bg-muted rounded-3xl" />
          <div className="h-40 bg-muted rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-3xl bg-destructive/5 flex items-center justify-center mx-auto mb-6">
          <Package size={40} className="text-destructive/20" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-2">
          Order Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The order you are looking for does not exist or you don't have
          permission to view it.
        </p>
        <Button asChild className="ght-gradient text-white rounded-xl">
          <Link href="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-primary font-bold hover:gap-2 transition-all mb-2"
          >
            <ChevronLeft size={16} />
            Back to Orders
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-foreground">
              Order{" "}
              <span className="ght-text-gradient">#{order.orderNumber}</span>
            </h1>
            <Badge
              variant="secondary"
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none ${statusColors[order.status.toLowerCase()] || statusColors.pending}`}
            >
              {order.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/50 gap-2"
          >
            <Printer size={16} />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/50 gap-2"
          >
            <Download size={16} />
            Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Items & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border/50 py-4 px-6">
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex items-center gap-4 group hover:bg-secondary/10 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-muted p-2 border border-border/30 shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={item.image || "/images/placeholder.png"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline / Progress */}
          <Card className="border-border/50 shadow-lg p-8">
            <CardTitle className="text-lg mb-8">
              Order Status Timeline
            </CardTitle>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-ght-success flex items-center justify-center shadow-lg shadow-ght-success/20">
                  <Clock size={12} className="text-white" />
                </div>
                <p className="font-bold text-sm">Order Placed</p>
                <p className="text-xs text-muted-foreground">
                  {order.createdAt?.toDate().toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  We have received your order and it's being processed.
                </p>
              </div>
              <div className="relative pl-10 opacity-50">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-border flex items-center justify-center">
                  <Package size={12} className="text-muted-foreground" />
                </div>
                <p className="font-bold text-sm">Packed & Ready</p>
                <p className="text-xs text-muted-foreground">
                  Estimate: 2 days after order
                </p>
              </div>
              <div className="relative pl-10 opacity-50">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-border flex items-center justify-center">
                  <Truck size={12} className="text-muted-foreground" />
                </div>
                <p className="font-bold text-sm">Shipped</p>
                <p className="text-xs text-muted-foreground">
                  Estimate: 3-5 days after order
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Summaries */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">
                  ${(order.subtotal || order.total * 0.9).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-bold">
                  ${(order.shipping || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-bold">
                  ${(order.tax || order.total * 0.1).toFixed(2)}
                </span>
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-between">
                <span className="font-black">Total</span>
                <span className="text-2xl font-black text-primary">
                  ${order.total.toFixed(2)}
                </span>
              </div>
              <div className="pt-4 flex items-center gap-2 text-[10px] font-bold text-ght-success bg-ght-success/5 p-3 rounded-xl border border-ght-success/10">
                <CreditCard size={14} />
                PAID VIA CARD • {order.paymentStatus || "COMPLETED"}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                Shipping To
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {order.shippingAddress ? (
                <div className="text-sm space-y-1">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground mb-2">
                    Location
                  </p>
                  <p className="text-foreground">
                    {order.shippingAddress.street}
                  </p>
                  <p className="text-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-primary font-medium mt-4 pt-4 border-t border-border/50">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Standard Ground Shipping
                </p>
              )}
            </CardContent>
          </Card>

          {/* Need Help? */}
          <Card className="bg-linear-to-br from-primary to-secondary text-white border-none shadow-xl shadow-primary/20">
            <CardContent className="p-6">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                Need help with this order?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                If you have any questions or concerns regarding your order, our
                health support team is here to help.
              </p>
              <Button
                variant="secondary"
                className="w-full rounded-xl font-bold gap-2"
              >
                Contact Support
                <ExternalLink size={14} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
