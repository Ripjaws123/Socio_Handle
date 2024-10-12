"use client";

import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Rightside = ({ otherUsers }) => {
  return (
    <div className="rightSection absolute top-0 right-0 w-[25%] mt-4 h-[90%] rounded-3xl shadow-lg  bg-gray-300 flex flex-col items-center gap-11">
      <div className="search w-[86%] h-14 mt-5 rounded-full bg-slate-400 shadow-lg flex gap-4 justify-center items-center">
        <SearchOutlined className="text-xl invert" />
        <input
          type="text"
          placeholder="Search"
          className="w-[80%] h-[50%] border-none bg-transparent outline-none placeholder:text-slate-50 font-medium"
        />
      </div>
      <div className="follow bg-slate-400 shadow-lg w-[92%] rounded-xl ">
        {/* Heading */}
        <div className="text-3xl font-bold mt-3 px-3">Who to Follow</div>
        <div className="followUsers w-full flex justify-center py-4">
          <div className="w-[90%] overflow-y-auto rounded-lg  ">
            {otherUsers?.map((user) => {
              return (
                <div
                  key={user?._id}
                  className="profileCard flex items-center justify-between gap-2 px-4 py-2"
                >
                  <div className="profile flex items-center gap-4">
                    <div className="image">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="profile"
                        className="w-[45px] h-[45px] rounded-full object-cover"
                      />
                    </div>
                    <div className="name flex flex-col">
                      <span className="font-semibold">{user?.name}</span>
                      <span className="text-sm">{`@${user?.username}`}</span>
                    </div>
                  </div>
                  <div className="followlink">
                    <Link href={`/profile/${user?._id}`}>
                      <button className="px-4 py-2 rounded-3xl bg-blue-500 text-white font-bold">
                        Profile
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightside;
