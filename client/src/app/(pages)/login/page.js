"use client";

import { XOutlined, SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getUser } from "@/app/redux/userSlice";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isloading, setisLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      console.log(formdata);
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formdata,
        {
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials: true,
        }
      );
      dispatch(getUser(response?.data?.user));
      if (response.data.success) {
        toast.success(response.data.message);
      }
      console.log("This is the response----------->", response);
      router.replace("/");
      setisLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error While Login", error);
      setisLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[60%] h-[70%] bg-slate-300 rounded-3xl flex border-slate-400 border shadow-2xl p-2">
        <div className="logo bg-yellow-200 rounded-3xl w-[40%] h-full flex justify-center items-center">
          <XOutlined className="text-9xl" />
        </div>
        <div className=" w-[60%] h-full rounded-3xl flex flex-col justify-center items-center gap-4">
          <div className="w-full flex justify-center items-center">
            <span className=" text-4xl font-bold">Login X</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-400 w-[80%] h-[80%] rounded-2xl flex flex-col justify-center items-center gap-5"
          >
            {/* Email Input */}
            <div className="email w-[90%] flex flex-col justify-center items-center">
              <span className="text-lg ">Enter the Email</span>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formdata.email}
                placeholder="Email"
                className="w-[80%] h-12 border-none  outline-none placeholder:text-slate-500 pl-4 font-medium rounded-2xl"
              />
            </div>
            {/* Password Input */}
            <div className="password w-[90%] flex flex-col justify-center items-center">
              <span className="text-lg ">Enter the Password</span>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formdata.password}
                placeholder="Password"
                className="w-[80%] h-12 border-none  outline-none placeholder:text-slate-500 pl-4 font-medium rounded-2xl"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-10 py-4 bg-blue-500 rounded-full"
              >
                {isloading ? <SyncOutlined spin /> : "Login"}
              </button>
            </div>
            <div>
              <span className="text-sm underline cursor-pointer">
                Don,t have an Account? ||
                <Link href={"/register"} className="text-blue-700">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
