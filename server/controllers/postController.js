import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

// <---------------------------------------Create Post------------------------------------->
export const createPost = async (req, res) => {
  try {
    // Fetching the Data
    const { id, description } = req.body;

    // validating the data
    if (!description) {
      return res.status(401).json({
        message: "Please Fill the Field",
        success: false,
      });
    }
    // Creating the User
    const user = await User.findById(id).select("-password"); 

    // creating post
    const newPost = new Post({
      userId: id,
      userDetails:user,
      description,
    });
    const savePost = await newPost.save();
    console.log("Save Post", savePost);
    return res.status(201).json({
      message: "Post Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error While Creating Post", error);
    return res.status(500).json({
      message: "Error While Creating Post",
      success: false,
    });
  }
};
// <---------------------------------------Create Post complete------------------------------------->

// <---------------------------------------Delete Post------------------------------------->

export const deletePost = async (req, res) => {
  try {
    // Fetching the Post from the Params Data
    const { id } = req.params;

    // checking if the Post exists
    const post = await Post.findById(id);

    // validating the data
    if (!post) {
      console.log("post Does not exist", error);
      return res.status(401).json({
        message: "Post does not exist",
        success: false,
      });
    }

    // Deleting the Post
    await post.deleteOne();

    return res.status(201).json({
      message: "Post Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error While Deleting Post", error);
    return res.status(500).json({
      message: "Error While Deleting Post",
      success: false,
    });
  }
};
// <---------------------------------------Delete Post complete------------------------------------->

// <---------------------------------------Like or not  Post------------------------------------->

export const likeOrDislikePost = async (req, res) => {
  try {
    const loggedInUser = req.body.id; // ID of the logged-in user
    const postId = req.params.id; // ID of the post

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post does not exist",
        success: false,
      });
    }

    // Check if the post has already been liked by the user
    if (post.like.includes(loggedInUser)) {
      // If the user has already liked the post, remove their like using $pull
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { like: loggedInUser } },
        { new: true }
      );

      return res.status(200).json({
        message: "Post disliked",
        success: true,
      });
    } else {
      // If the user hasn't liked the post, add their like using $push
      await Post.findByIdAndUpdate(
        postId,
        { $push: { like: loggedInUser } },
        { new: true }
      );

      return res.status(200).json({
        message: "Post liked",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while liking or disliking the post",
      success: false,
    });
  }
};
// <---------------------------------------Like or not Post complete------------------------------------->

// <---------------------------------------Get Users Post------------------------------------->
export const getUserPost = async (req, res) => {
  try {
    const id = req.params.id; // ID of the user whose posts are to be fetched

    // Step 1: Fetch the logged-in user's details
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // Fetching the Log in user Posts
    const userPosts = await Post.find({userId: id})

    // Checking the Posts
    if(!userPosts || userPosts.length === 0){
      return res.status(404).json({
        message: "No Posts Found",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Posts fetched successfully",
        success: true,
        posts: userPosts,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching dynamic user posts",
      success: false,
    });
  }
}
// <---------------------------------------Get All Post------------------------------------->
export const getAllPost = async (req, res) => {
  try {
    const id = req.params.id; // ID of the logged-in user

    // Step 1: Fetch the logged-in user's details (including their following list)
    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Step 2: Fetch the logged-in user's posts
    const loggedInUserPosts = await Post.find({ userId: id });

    // Step 3: Fetch posts of the users the logged-in user is following (in parallel)
    const followingsPosts = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Post.find({ userId: otherUserId });
      })
    );

    // Step 4: Combine the logged-in user's posts and the posts of the followed users
    const allPosts = [...loggedInUserPosts, ...followingsPosts.flat()]; // Flatten followingsPosts

    // Step 5: Return the combined posts
    return res.status(200).json({
      success: true,
      posts: allPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching All the posts",
      success: false,
    });
  }
};
// <---------------------------------------Get All Post complete------------------------------------->

// <-------------------------------------------Get Following Post------------------------------------------->
export const getFollowingPost = async (req, res) => {
  try {
    const id = req.params.id; // ID of the logged-in user

    // Step 1: Fetch the logged-in user's details (including their following list)
    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Step 3: Fetch posts of the users the logged-in user is following (in parallel)
    const followingsPosts = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Post.find({ userId: otherUserId });
      })
    );

    // Step 4: Flatten the array of posts
    const allPosts = [].concat(...followingsPosts.flat());

    // Step 5: Return the posts of the followed users
    return res.status(200).json({
      success: true,
      posts: allPosts,
    });
  } catch (error) {
    console.error("Error fetching following posts:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the following posts",
      success: false,
    });
  }
};
