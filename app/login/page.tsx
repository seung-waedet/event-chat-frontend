"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useAxios } from "@/lib/api";

const Login = () => {
  const apiInstance = useAxios();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post("/api/login", {
        email,
        password,
      });

      // Store JWT in local storage (or cookies)
      localStorage.setItem("token", response.data.token);
      document.cookie = `token=${response.data.token}`;

      // Redirect to a protected route
      router.push("/admin");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <div className="p-4 text-2xl font-bold">
              <Image
                src="/event-chat-logo.png"
                alt="Event Chat Logo"
                width={150}
                height={50}
              />
            </div>
            <p className="mt-2 text-xl text-slate-400 text-center">Login</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-2 bg-transparent rounded-full"
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Login
            </Button>
          </form>

          <Link href="/">
            <p className="mt-4 text-xs text-indigo-400 hover:text-indigo-500">
              Login with Code
            </p>
          </Link>

          <p className="mt-4 text-xs text-slate-200">
            @2024 All rights reserved
          </p>
        </div>

        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            src="/bg.jpg"
            alt="bg-image"
            // width={800}
            // height={408}
            fill={true}
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
