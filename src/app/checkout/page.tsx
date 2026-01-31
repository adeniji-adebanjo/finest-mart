"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Truck,
  ShieldCheck,
  Package,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Lock,
} from "lucide-react";
import { useCart, useAuth } from "@/app/providers";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";

const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, discount, couponCode, clearCart } = useCart();
  const { isLoggedIn, username, userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [paymentData, setPaymentData] = useState({
    method: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      router.push("/cart");
    }
  }, [cartItems, router, isSubmitting]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    try {
      const orderNumber = `GHT-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData = {
        orderNumber,
        userId: userId || "guest",
        customerName: `${shippingData.firstName} ${shippingData.lastName}`,
        email: shippingData.email,
        items: cartItems,
        subtotal,
        shipping,
        tax,
        discount,
        total,
        status: "pending",
        paymentStatus: "paid", // Mock payment as paid
        paymentMethod: paymentData.method,
        shippingAddress: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          street: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          zipCode: shippingData.zipCode,
          country: "USA", // Default for now
          phone: shippingData.phone,
        },
        createdAt: serverTimestamp(),
      };

      // Save to Firestore if needed (optional for guest, but we'll do it anyway for record)
      await addDoc(collection(db, "orders"), orderData);

      setIsSubmitting(false);

      Swal.fire({
        title: "Order Placed Successfully!",
        text: `Order #${orderNumber} has been received. Thank you for choosing GHT!`,
        icon: "success",
        confirmButtonColor: "#27a89a",
      }).then(() => {
        clearCart();
        router.push(`/checkout/success?id=${orderNumber}`);
      });
    } catch (error) {
      console.error("Order submission error:", error);
      setIsSubmitting(false);
      Swal.fire({
        title: "Order Failed",
        text: "Something went wrong while processing your order. Please try again.",
        icon: "error",
        confirmButtonColor: "#27a89a",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-4 -ml-2 text-muted-foreground hover:text-primary"
          >
            <Link href="/cart">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-black text-foreground">
            Secure <span className="ght-text-gradient">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicator */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
              <div className="relative z-10 flex justify-between items-center bg-transparent">
                {STEPS.map((step, idx) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        idx <= currentStep
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      {idx < currentStep ? <CheckCircle2 size={20} /> : idx + 1}
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${idx <= currentStep ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="border-border/50 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 0 && <Truck className="text-primary" />}
                  {currentStep === 1 && <CreditCard className="text-primary" />}
                  {currentStep === 2 && <Package className="text-primary" />}
                  {STEPS[currentStep]} Details
                </CardTitle>
                <CardDescription>
                  {currentStep === 0 &&
                    "Where should we send your health essentials?"}
                  {currentStep === 1 && "Select your preferred payment method."}
                  {currentStep === 2 &&
                    "Double-check your order before confirming."}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {/* Shipping Step */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingData.firstName}
                        onChange={handleShippingChange}
                        placeholder="John"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingData.lastName}
                        onChange={handleShippingChange}
                        placeholder="Doe"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingData.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        placeholder="123 Health Way"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        placeholder="Wellness City"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          placeholder="CA"
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={shippingData.zipCode}
                          onChange={handleShippingChange}
                          placeholder="90210"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <RadioGroup
                      defaultValue="card"
                      onValueChange={(val) =>
                        setPaymentData({ ...paymentData, method: val })
                      }
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Label
                          htmlFor="card"
                          className={`flex flex-col items-center justify-between rounded-2xl border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all ${
                            paymentData.method === "card"
                              ? "border-primary bg-primary/5"
                              : "border-muted"
                          }`}
                        >
                          <RadioGroupItem
                            value="card"
                            id="card"
                            className="sr-only"
                          />
                          <CreditCard className="mb-3 h-6 w-6 text-primary" />
                          <span className="font-bold">Credit Card</span>
                        </Label>
                        <Label
                          htmlFor="paypal"
                          className={`flex flex-col items-center justify-between rounded-2xl border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all ${
                            paymentData.method === "paypal"
                              ? "border-primary bg-primary/5"
                              : "border-muted"
                          }`}
                        >
                          <RadioGroupItem
                            value="paypal"
                            id="paypal"
                            className="sr-only"
                          />
                          <Image
                            src="/images/paypal-logo.svg"
                            alt="PayPal"
                            width={80}
                            height={20}
                            className="mb-3 grayscale opacity-70"
                          />
                          <span className="font-bold text-muted-foreground">
                            PayPal
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentData.method === "card" && (
                      <div className="space-y-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={paymentData.cardName}
                            onChange={handlePaymentChange}
                            placeholder="John Doe"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="0000 0000 0000 0000"
                              className="rounded-xl pr-12"
                            />
                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              value={paymentData.expiry}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={paymentData.cvv}
                              onChange={handlePaymentChange}
                              placeholder="***"
                              className="rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Review Step */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                          <MapPin size={14} /> Shipping to
                        </h4>
                        <div className="text-sm space-y-1 bg-muted/30 p-4 rounded-2xl border border-border/50">
                          <p className="font-bold">
                            {shippingData.firstName} {shippingData.lastName}
                          </p>
                          <p className="text-muted-foreground">
                            {shippingData.address}
                          </p>
                          <p className="text-muted-foreground">
                            {shippingData.city}, {shippingData.state}{" "}
                            {shippingData.zipCode}
                          </p>
                          <p className="text-muted-foreground">
                            {shippingData.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                          <CreditCard size={14} /> Payment Method
                        </h4>
                        <div className="text-sm bg-muted/30 p-4 rounded-2xl border border-border/50 h-[106px] flex flex-col justify-center">
                          <p className="font-bold capitalize">
                            {paymentData.method} Payment
                          </p>
                          {paymentData.method === "card" && (
                            <p className="text-muted-foreground leading-relaxed">
                              Ending in{" "}
                              {paymentData.cardNumber.slice(-4) || "****"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/50">
                      <h4 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest mb-4">
                        <Package size={14} /> Review Items
                      </h4>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 bg-muted/20 p-3 rounded-xl border border-border/30"
                          >
                            <div className="h-12 w-12 rounded-lg bg-white p-1 shrink-0 border border-border/50">
                              <Image
                                src={item.image || "/images/placeholder.png"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-muted/30 border-t border-border/50 p-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0 || isSubmitting}
                  className="rounded-xl"
                >
                  Back
                </Button>
                {currentStep < 2 ? (
                  <Button
                    onClick={nextStep}
                    className="ght-gradient text-white rounded-xl shadow-lg px-8"
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="ght-gradient-ocean text-white rounded-xl shadow-lg px-8 relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        Place Order ${total.toFixed(2)}
                        <CheckCircle2 className="ml-2 h-4 w-4 transform group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="flex items-center justify-center gap-6 text-muted-foreground py-4">
              <div className="flex items-center gap-1.5 text-xs">
                <ShieldCheck size={14} className="text-ght-success" />
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Lock size={14} className="text-ght-success" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Card className="border-border/50 shadow-lg overflow-hidden">
                <CardHeader className="bg-secondary/10 border-b border-border/50">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span
                        className={`font-bold ${shipping === 0 ? "text-ght-success" : ""}`}
                      >
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-bold">${tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-ght-success font-bold">
                        <span>Discount ({couponCode})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-between text-lg font-black pt-2">
                    <span>Total</span>
                    <span className="ght-text-gradient">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="bg-primary/5 p-4 flex flex-col items-center gap-2">
                  <p className="text-[10px] text-muted-foreground text-center">
                    By placing your order, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline hover:text-primary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </CardFooter>
              </Card>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-2xl border border-border/50 shadow-sm flex flex-col items-center text-center gap-2">
                  <Truck size={24} className="text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Fast Delivery
                  </p>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border/50 shadow-sm flex flex-col items-center text-center gap-2">
                  <ShieldCheck size={24} className="text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Quality Assured
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 rounded-2xl p-4 flex items-start gap-3 border border-primary/20">
                <AlertCircle
                  size={20}
                  className="text-primary shrink-0 mt-0.5"
                />
                <p className="text-xs text-primary/80 leading-relaxed font-medium">
                  <strong>Need help?</strong> Our wellness experts are available
                  24/7 to assist with your order. Call us at 1-800-GHT-WELL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
