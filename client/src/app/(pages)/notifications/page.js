"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { user } = useSelector((store) => store.user);
  // checking for the Authentication
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-400">
      <span className="text-5xl font-bold">Notifications Page Under Construction</span>
    </div>
  );
};

export default Page;
