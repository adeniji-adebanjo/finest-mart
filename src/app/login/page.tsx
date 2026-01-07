"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "@/lib/firebase";
import { useAuth } from "../providers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      Swal.fire({
        title: "Login Successful!",
        text: "You are now logged in.",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
        customClass: {
          confirmButton: "bg-green-500 text-white px-4 py-2 rounded-lg",
        },
      }).then(() => {
        login(user.email || "User");
        router.push("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Invalid email or password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login(user.displayName || user.email || "User");

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "You have logged in with Google successfully!",
      });

      router.push("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-background shadow-xl overflow-hidden border-border">
        {/* Left Side Illustrator */}
        <div className="hidden md:flex items-center justify-center bg-blue-50 p-8">
          <img
            src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1731495121/FinestMart/login_gxcue8.png"
            alt="Login"
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-3xl font-extrabold text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80 underline"
            >
              Sign up
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full rounded-lg"
            >
              <FaGoogle className="mr-2 text-red-500" />
              Login with Google
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
