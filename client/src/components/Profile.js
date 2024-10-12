import { POST_API_END_POINT } from "@/utils/constant";
import {
  ArrowLeftOutlined,
  BookOutlined,
  DeleteOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = ({ user, profile, FollowUnfollow, DeletePost, LikeOrDislike, BookmarkPost, id }) => {
  const [userPosts, setUserPosts] = useState([]);
  const isFollowing = user?.following?.includes(profile?._id);
  const userId = user?._id;
  const profileId = profile?._id;
  const isMyProfile = userId === profileId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${POST_API_END_POINT}/getpost/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.data.success) {
          setUserPosts(response.data.posts);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error While Fetching Profile", error);
        toast.error(error.response.data.message);
      }
    };
    fetchProfile();
  }, [id]);

  return (
    <div className="ProfileSection relative w-[45%] mt-4 h-full rounded-3xl bg-gray-300 flex flex-col items-center">
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
            <span className="text-xl font-semibold">
              {isMyProfile ? "My Profile" : profile?.name}
            </span>
            <span className="text-sm">{userPosts?.length} Posts</span>
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
          {isMyProfile ? (
            <button className="h-10 px-6 bg-blue-500 text-white text-lg font-semibold rounded-3xl">
              <Link href={"/editprofile"}>Edit Profile</Link>
            </button>
          ) : (
            <button
              onClick={FollowUnfollow}
              className={`h-10 px-6 ${
                isFollowing ? "bg-red-500" : "bg-slate-500"
              } text-white text-lg font-semibold rounded-3xl`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* Profile Details */}
        <div className="profiledetails w-full flex flex-col items-center gap-5 border-b-2">
          <div className="flex flex-col items-center w-full justify-start px-10">
            <span className="text-lg font-semibold w-full">
              {profile?.name}
            </span>
            <span className="text-sm w-full">{`@${profile?.username}`}</span>
          </div>
          <div className="py-6 border-t-2 w-full flex justify-center">
            <span>Hey there This is my profile bio here find</span>
          </div>
        </div>

        {/* Posts */}
        {userPosts == 0 ? (
          <span className="w-full h-[30%] flex items-center justify-center text-2xl">
            No Posts
          </span>
        ) : (
          userPosts?.map((post) => (
            <div
              key={post?._id}
              className="posts w-full px-4 pt-4 pb-10 border-b-2"
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
                  {post?.like?.includes(userId) ? (
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
                {userId === post?.userId && (
                  <div onClick={() => DeletePost(post?._id)}>
                    <DeleteOutlined className=" cursor-pointer text-lg" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
