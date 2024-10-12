"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Leftside from "@/components/Leftside";
import Rightside from "@/components/Rightside";
import Bookmarks from "@/components/Bookmarks";

const Page = () => {
  const router = useRouter();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-evenly items-center">
      <Leftside />
      <Bookmarks user={user} />
      <Rightside />
    </div>
  );
};

export default Page;
