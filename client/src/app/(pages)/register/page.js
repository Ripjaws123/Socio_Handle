"use client";

import { XOutlined, SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getUser } from "@/app/redux/userSlice";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formdata, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isloading, setisLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      console.log(formdata);
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formdata,
        {
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials: true,
        }
      );
      dispatch(getUser(response?.data?.user))
      if (response.data.success) {
        toast.success(response.data.message);
      }
      console.log("This is the response----------->", response);
      setisLoading(false);
      router.replace("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error While Register", error);
      setisLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen  flex justify-center items-center">
      <div className="w-[60%] h-[70%] bg-slate-300 rounded-3xl flex shadow-2xl p-2 border-slate-400 border">
        <div className="logo bg-yellow-200 rounded-3xl w-[40%] h-full flex justify-center items-center">
          <XOutlined className="text-9xl" />
        </div>
        <div className=" w-[60%] h-full rounded-3xl flex flex-col justify-center items-center gap-4">
          <div className="w-full flex justify-center items-center">
            <span className=" text-4xl font-bold">Register X</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-400 w-[80%] h-[80%] rounded-2xl flex flex-col justify-center items-center gap-3"
          >
            {/* Name Section */}
            <div className="username w-[90%] flex flex-col justify-center items-center">
              <span className="text-lg ">Enter the Name</span>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formdata.name}
                placeholder="Name"
                className="w-[80%] h-8 border-none  outline-none placeholder:text-slate-500 pl-4 font-medium rounded-2xl"
              />
            </div>
            {/* Username Section */}
            <div className="username w-[90%] flex flex-col justify-center items-center">
              <span className="text-lg ">Enter the Username</span>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formdata.username}
                placeholder="Username"
                className="w-[80%] h-8 border-none  outline-none placeholder:text-slate-500 pl-4 font-medium rounded-2xl"
              />
            </div>
            {/* Email Section */}
            <div className="email w-[90%] flex flex-col justify-center items-center">
              <span className="text-lg ">Enter the Email</span>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formdata.email}
                placeholder="Email"
                className="w-[80%] h-8 border-none  outline-none placeholder:text-slate-500 pl-4 font-medium rounded-2xl"
              />
            </div>
            {/* Password Section */}
            <div className="password w-[90%] flex flex-col justify-center items-center">
              <span className="text-lg ">Enter the Password</span>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formdata.password}
                placeholder="Password"
                className="w-[80%] h-8 border-none  outline-none placeholder:text-slate-500 pl-4 font-medium rounded-2xl"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-10 py-2 bg-blue-500 rounded-full"
              >
                {isloading ? <SyncOutlined spin /> : "Register"}
              </button>
            </div>
            <div>
              <span className="text-sm underline cursor-pointer">
                Already have an Account? ||
                <Link href={"/login"} className="text-blue-700">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
