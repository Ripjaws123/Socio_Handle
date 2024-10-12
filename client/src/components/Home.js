"use client";

import React, { useEffect } from "react";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import Feed from "./Feed";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useGetOtherUsers from "@/hooks/useGetOtherUsers";
import useGetMyPosts from "@/hooks/useGetMyPosts";

const Home = () => {
  // Obtaining other data
  const { user, otherUsers } = useSelector((store) => store.user);
  const router = useRouter();

  // checking for the Authentication
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, []);

  // Obtaining my data
  const id = user?._id;
  useGetOtherUsers(id);
  useGetMyPosts(id);

  return (
    <div className="w-full h-full flex justify-evenly items-center">
      <Leftside />
      <Feed />
      <Rightside otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
