import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/app/redux/postSlice";
const useGetMyPosts = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.post);
  const { isActive } = useSelector((store) => store.post);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get(
        `${POST_API_END_POINT}/getallposts/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllPosts(response.data.posts));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FollowUser = async () => {
    try {
      const response = await axios.get(
        `${POST_API_END_POINT}/getfollowingposts/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllPosts(response.data.posts));
      console.log("Following Users Posts", response.data);
    } catch (error) {
      console.log("Error while Fetching Following Tweet", error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchMyPosts();
    } else {
      FollowUser();
    }
  }, [isActive, refresh]);
};

export default useGetMyPosts;
