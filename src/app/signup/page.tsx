"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "@/lib/firebase";
import { useAuth } from "../providers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// Icons
import { FaGoogle } from "react-icons/fa";

export const dynamic = "force-dynamic";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password, username } = formData;

    try {
      // Firebase sign-up
      await createUserWithEmailAndPassword(auth, email, password);
      // Login context update
      login(username);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Your account has been created successfully!",
      });

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login(user.displayName || user.email || "User");

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "You have signed up with Google successfully!",
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-background rounded-2xl shadow-xl overflow-hidden border-border">
        {/* Left Content */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50">
          <Link
            href="/"
            className="text-3xl font-bold mb-8 text-center text-foreground"
          >
            Finest<span className="text-yellow-500">Mart</span>
          </Link>
          <img
            src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948865/FinestMart/delivery-man_c4rwd4.png"
            alt="Delivery Man"
            className="max-w-full h-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-3xl font-extrabold text-foreground mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full"
            >
              {loading ? "Creating Account..." : "Sign Up"}
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
              onClick={handleGoogleSignUp}
              className="w-full rounded-full"
            >
              <FaGoogle className="mr-2 text-red-500" />
              Sign Up with Google
            </Button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
