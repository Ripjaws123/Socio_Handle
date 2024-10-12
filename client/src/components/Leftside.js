"use client";
import {
  BookFilled,
  ExportOutlined,
  HomeFilled,
  LogoutOutlined,
  NotificationFilled,
  ProfileFilled,
  XOutlined,
} from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { getOtherUsers, getProfile, getUser } from "@/app/redux/userSlice";
import { persistor } from "@/app/redux/store";

const Leftside = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const LogoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`);

      if (response.data.success) {
        // deleting from the states
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getProfile(null));
        // deleting from local storage
        localStorage.clear();
        // deleting from redux
        await persistor.flush();
        await persistor.purge();
        toast.success(response.data.message);
        router.replace("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error while Loging out", error);
    }
  };

  const { user } = useSelector((store) => store.user);
  return (
    <div className="leftSection w-[25%] h-[70%] absolute top-[8rem] left-0 rounded-3xl shadow-2xl bg-gray-300  flex flex-col items-center justify-center gap-9">
      <div className="topSection w-full h-[10%] flex justify-center items-center">
        <Link href={"/login"}>
          <XOutlined className="text-5xl" />
        </Link>
      </div>
      <div className="optionSection flex flex-col gap-2 w-[60%] justify-center items-center">
        <div className="home w-full flex gap-4 items-center p-2 rounded-full hover:bg-slate-400 hover:cursor-pointer ">
          <HomeFilled className="text-xl" />
          <span className="text-lg font-semibold">
            <Link href={"/"}>Home</Link>
          </span>
        </div>
        <div className="explore w-full flex gap-4 items-center p-2 rounded-full hover:bg-slate-400 hover:cursor-pointer ">
          <ExportOutlined className="text-xl" />
          <span className="text-lg font-semibold">
            <Link href={"/explore"}>Explore</Link>
          </span>
        </div>
        <div className="notify w-full flex gap-4 items-center p-2 rounded-full hover:bg-slate-400 hover:cursor-pointer ">
          <NotificationFilled className="text-xl" />
          <span className="text-lg font-semibold">
            <Link href={"/notifications"}>Notifications</Link>
          </span>
        </div>
        <div className="profile w-full flex gap-4 items-center p-2 rounded-full hover:bg-slate-400 hover:cursor-pointer ">
          <ProfileFilled className="text-xl" />
          <span className="text-lg font-semibold">
            <Link href={`/profile/${user?._id}`}>Profile</Link>
          </span>
        </div>
        <div className="bookmark w-full flex gap-4 items-center p-2 rounded-full hover:bg-slate-400 hover:cursor-pointer ">
          <BookFilled className="text-xl" />
          <span className="text-lg font-semibold">
            <Link href={"/bookmarks"}>Bookmarks</Link>
          </span>
        </div>
        <div
          onClick={LogoutHandler}
          className="logout w-full flex gap-4 items-center p-2 rounded-full hover:bg-slate-400 hover:cursor-pointer "
        >
          <LogoutOutlined className="text-xl" />
          <span className="text-lg font-semibold">Logout</span>
        </div>
      </div>
      <div className="post">
        <button className="px-12 py-2 rounded-3xl bg-blue-500 text-white font-bold">
          POST
        </button>
      </div>
    </div>
  );
};

export default Leftside;
