"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginWithCode: React.FC = () => {
  const [isAnon, setIsAnon] = useState(false);

  const handleAnonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnon(event.target.checked);
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
          <form>
            <Label htmlFor="name">Name</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="text"
              id="name"
              placeholder="Enter your name"
            />
            <Label htmlFor="code">Code</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="text"
              id="code"
              placeholder="Enter your code"
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
              Submit Code
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
            // width={800}
            // height={408}
            fill={true}
          />
        </div>
      </div>
    </main>
  );
};

export default LoginWithCode;
