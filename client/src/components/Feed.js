"use client";

import {
  BookOutlined,
  DeleteOutlined,
  FileImageOutlined,
  LikeFilled,
  LikeOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { POST_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { getAllPosts, getIsActive, setRefresh } from "@/app/redux/postSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [isloading, setisLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.post);
  const { isActive } = useSelector((store) => store.post);
  const id = user?._id;

  const handleChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  // Getting Posts
  const handleSubmit = async () => {
    try {
      setisLoading(true);
      const response = await axios.post(
        `${POST_API_END_POINT}/createpost`,
        { description, id },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log("Post Created------>", response);
        toast.success(response.data.message);
      }
      dispatch(setRefresh());
      setisLoading(false);
      setDescription("");
    } catch (error) {
      console.log("Error while posting", error);
      toast.error(error.response.data.message);
      setisLoading(false);
    }
  };

  // Lik and Dislike Post
  const LikeOrDislike = async (id) => {
    try {
      const response = await axios.put(
        `${POST_API_END_POINT}/likepost/${id}`,
        { id: id },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log("liked post", response.data);
        toast.success(response.data.message);
        dispatch(setRefresh());
      }
    } catch (error) {
      console.log("Error while posting", error);
      toast.error(error.response.data.message);
    }
  };

  // Bookmark POst
  const BookmarkPost = async (id) => {
    const userId = user?._id;
    try {
      const response = await axios.put(
        `${USER_API_END_POINT}/bookmarkpost/${id}`,
        { id: userId },
        {
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
      if (response.data.success) {
        console.log("Bookmarked post", response.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error while Bookmarking", error);
      toast.error(error.response.data.message);
    }
  };

  // Delete Post
  const DeletePost = async (id) => {
    try {
      const response = await axios.delete(
        `${POST_API_END_POINT}/deletepost/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log("Deleted Post", response.data);
        toast.success(response.data.message);
        dispatch(setRefresh());
      }
    } catch (error) {
      console.log("Error while Deleting Post", error);
      toast.error(error.response.data.message);
    }
  };

  const ForYou = () => {
    dispatch(getIsActive(true));
  };

  const Following = () => {
    dispatch(getIsActive(false));
  };
  return (
    <div className="MiddleSection w-[45%] relative mt-4 h-full rounded-3xl bg-gray-300 flex flex-col items-center">
      <div className="profilesection  w-full rounded-t-3xl border-b-2 px-3">
        <div className="bar w-full h-14 flex justify-center items-center border-b-2">
          <div
            onClick={ForYou}
            className={`left w-[50%] h-full flex justify-center items-center ${
              isActive ? "border-b-4 border-sky-500" : null
            } border-r-2 cursor-pointer hover:bg-slate-400 rounded-tl-xl`}
          >
            <span>For Your</span>
          </div>
          <div
            onClick={Following}
            className={`Right w-[50%] h-full flex justify-center items-center ${
              !isActive ? "border-b-4 border-sky-500" : null
            } cursor-pointer hover:bg-slate-400 rounded-tr-xl`}
          >
            <span>Followings</span>
          </div>
        </div>
        <div className="posting w-full">
          <div className="userdetails flex gap-4 px-3 py-4 border-b-2">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="profile"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <input
              name="description"
              value={description}
              onChange={handleChange}
              type="text"
              placeholder="Whats Happening Now??"
              className="w-[80%]  border-none bg-transparent outline-none placeholder:text-slate-400 text-lg font-medium "
            />
          </div>
          <div className="option flex items-center justify-between px-4 py-3">
            <div>
              <FileImageOutlined className="text-xl" />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="px-8 py-2 rounded-full bg-blue-500 text-white"
              >
                {isloading ? <SyncOutlined spin /> : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}

      {posts?.map((post) => {
        return (
          <div
            key={post?._id}
            className="posts w-full h-full px-4 pt-4 pb-10 border-b-2"
          >
            <div className="userinfo flex gap-5">
              <div className="image">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="profile"
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
              </div>
              <div className="username">
                <div className="flex gap-3  items-center">
                  <span className="font-semibold">
                    {post?.userDetails[0]?.name}
                  </span>
                  <span>{`@${post?.userDetails[0]?.username}`}</span>
                  <span className="text-xs">2min ago</span>
                </div>
                <div>
                  <span>{post?.description}</span>
                </div>
              </div>
            </div>
            <div className="options w-full  px-10 py-3 flex mt-4 justify-between items-center bg-slate-400 rounded-full">
              <div
                onClick={() => LikeOrDislike(post?._id)}
                className=" flex gap-1 items-center justify-center cursor-pointer"
              >
                {post?.like?.includes(id) ? (
                  <LikeFilled className=" cursor-pointer text-lg" />
                ) : (
                  <LikeOutlined className=" cursor-pointer text-lg" />
                )}
                <span>{post?.like?.length}</span>
              </div>
              <div
                onClick={() => BookmarkPost(post?._id)}
                className=" flex gap-2 items-center justify-center"
              >
                <BookOutlined className=" cursor-pointer text-lg" />
                <span>{user?.bookmarks?.length}</span>
              </div>
              {id === post?.userId && (
                <div onClick={() => DeletePost(post?._id)}>
                  <DeleteOutlined className=" cursor-pointer text-lg" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
