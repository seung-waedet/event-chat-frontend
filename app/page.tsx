"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginWithCode: React.FC = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAnonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnon(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http/api/join-event-unregistered", {
        code,
        displayName: name,
        isAnon,
      });

      const event = response.data.event;
      router.push(`/events/${event._id}`);
    } catch (err) {
      setError("Invalid code or name. Please try again.");
    }
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <div className="flex items-center justify-center w-full">
              <Image
                src="/event-chat-logo.png"
                alt="Event Chat Logo"
                width={150}
                height={50}
              />
            </div>
            <p className="mt-2 text-xl text-slate-400 text-center">
              Enter your code to access event
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <p className="error text-red-500">{error}</p>}
            <Label htmlFor="name">Name</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="code">Code</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="text"
              id="code"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="isAnon"
                checked={isAnon}
                onChange={handleAnonChange}
                className="mr-2"
              />
              <Label htmlFor="isAnon">Join as Anonymous</Label>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Join Event
            </Button>
          </form>

          <Link href="/login">
            <p className="mt-4 text-xs text-indigo-400 hover:text-indigo-500">
              Login with Email and Password
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
            fill={true}
          />
        </div>
      </div>
    </main>
  );
};

export default LoginWithCode;
