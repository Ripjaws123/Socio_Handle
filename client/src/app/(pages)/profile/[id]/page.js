"use client";

import React from "react";
import Leftside from "@/components/Leftside";
import Rightside from "@/components/Rightside";
import Profile from "@/components/Profile";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT, POST_API_END_POINT } from "@/utils/constant";
import useGetProfile from "@/hooks/useGetProfile";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { followandUnfollow } from "@/app/redux/userSlice";
import { setRefresh } from "@/app/redux/postSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const { user, profile, otherUsers } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.post);
  const { id } = useParams();
  const router = useRouter();

  // checking for the Authentication
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, []);

  // Getting the Users Profile
  useGetProfile(id);

 

  // Follow and Unfollow User
  const FollowUnfollow = async () => {
    if (user.following.includes(id)) {
      try {
        const response = await axios.post(
          `${USER_API_END_POINT}/unfollow/${id}`,
          { id: user?._id },
          {
            withCredentials: true,
          }
        );
        dispatch(followandUnfollow(id));
        dispatch(setRefresh());
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error While UnFollowing User", error);
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(
          `${USER_API_END_POINT}/follow/${id}`,
          { id: user?._id },
          {
            withCredentials: true,
          }
        );
        dispatch(followandUnfollow(id));
        dispatch(setRefresh());
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error While Following User", error);
        toast.error(error.response.data.message);
      }
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


  return (
    <div className="w-full h-full flex justify-evenly items-center">
      <Leftside />
      <Profile
        profile={profile}
        user={user}
        FollowUnfollow={FollowUnfollow}
        DeletePost={DeletePost}
        LikeOrDislike={LikeOrDislike}
        BookmarkPost={BookmarkPost}

        posts={posts}
        id={id}
      />
      <Rightside otherUsers={otherUsers} />
    </div>
  );
};

export default Page;
