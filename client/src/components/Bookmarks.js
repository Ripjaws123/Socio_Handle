import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Bookmarks = ({ user }) => {
  return (
    <div className="ProfileSection w-[45%] mt-4 h-full rounded-3xl bg-gray-300 flex flex-col items-center">
      {/* Profile Background */}
      <div className="profilehead  w-full ">
        {/*Hedding Bar*/}
        <div className="hedding  w-full flex items-center gap-6 pt-3 pl-4">
          <div className="w-14 h-14 flex justify-center items-center">
            <Link href={"/"}>
              <ArrowLeftOutlined className="text-2xl cursor-pointer" />
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{user?.name}</span>
          </div>
        </div>

        {/* Background Picture */}
        <div className="p-3 relative">
          <img
            src="https://media.istockphoto.com/id/944812540/photo/mountain-landscape-ponta-delgada-island-azores.jpg?s=612x612&w=0&k=20&c=mbS8X4gtJki3gGDjfC0sG3rsz7D0nls53a0b4OPXLnE="
            className="w-full h-[260px] object-cover rounded-lg"
          />

          {/* Profile Picture */}
          <div className="profilepicture items-center rounded-full ring-4 ring-slate-300 w-28 h-28 absolute -bottom-6 left-12">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="w-28 h-28 rounded-full"
            />
          </div>
        </div>
        <div className="w-full  h-10 flex items-center justify-end pr-4 ">
          <span>All BookMarked Posts</span>
        </div>

        {/* Profile Details */}
        <div className="profiledetails w-full flex flex-col items-center gap-5 border-b-2">
          <div className="flex flex-col items-center w-full justify-start px-10">
            <span className="text-lg font-semibold w-full">{user?.name}</span>
            <span className="text-sm w-full">{`@${user?.username}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
