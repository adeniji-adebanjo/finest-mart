"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import {
  Package,
  Search,
  Filter,
  ChevronRight,
  Clock,
  MapPin,
  Truck,
  ShoppingBag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
}

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-ght-success/10 text-ght-success",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function OrdersPage() {
  const { userId, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-foreground">
          My <span className="ght-text-gradient">Orders</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your recent GHT purchases.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by order number..."
            className="pl-11 rounded-xl border-border/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl border-border/50 gap-2">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 w-full bg-muted rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <CardHeader className="bg-primary/5 border-b border-border/50 flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white shadow-sm items-center justify-center text-primary">
                    <Package size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-black">
                      Order #{order.orderNumber}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Placed on {order.createdAt?.toDate().toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none ${statusColors[order.status.toLowerCase()] || statusColors.pending}`}
                  >
                    {order.status}
                  </Badge>
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-primary hover:text-primary/80"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="h-16 w-16 rounded-xl bg-muted/50 p-2 border border-border/30 shrink-0 relative group-hover:scale-105 transition-transform duration-500"
                      >
                        <Image
                          src={item.image || "/images/placeholder.png"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-contain"
                        />
                        {item.quantity > 1 && (
                          <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="h-16 w-16 rounded-xl bg-primary/5 flex items-center justify-center text-xs font-bold text-primary border border-primary/10">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row md:flex-col justify-between md:text-right items-center md:items-end">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">
                        Total Amount
                      </p>
                      <p className="text-2xl font-black text-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9 text-xs"
                      >
                        Track Order
                      </Button>
                      <Button
                        size="sm"
                        className="ght-gradient text-white rounded-xl h-9 text-xs"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="bg-muted/30 px-6 py-3 border-t border-border/20 flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <Clock size={12} className="text-primary" />
                  Estimated Delivery: Dec 12, 2026
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <Truck size={12} className="text-primary" />
                  Carrier: GHT Logistics
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 border-dashed border-2 bg-transparent text-center p-12 lg:p-20">
          <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-primary/20" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">
            No orders found
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8">
            You haven&apos;t placed any orders yet. Explore our store to find
            health and wellness essentials.
          </p>
          <Button
            asChild
            className="ght-gradient text-white px-8 rounded-xl h-12 shadow-lg"
          >
            <Link href="/products">Browse Store</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
