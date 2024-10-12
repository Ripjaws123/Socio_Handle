import { hashPassword, comparePassword } from "../helper/passHelper.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import jwt from "jsonwebtoken";

// <---------------------------------------Register------------------------------------->
export const Register = async (req, res) => {
  try {
    // Fetching the Data
    const { name, username, email, password } = req.body;
    console.log(req.body);

    // Validating the data
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "Please Fill all the Fields",
        success: false,
      });
    }

    // check if user already exists
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(401).json({
        message: "User already exists with this Email",
        success: false,
      });
    }

    // Hassing Password
    const hashedPassword = await hashPassword(password);

    // Creating User
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("savedUser------>", savedUser);
    return res.status(200).json({
      message: "Registration Successfully",
      success: true,
    });
  } catch (error) {
    // Error Displaying
    console.log("Error While Registering User", error);
    return res.status(500).json({
      message: "Error While Registering User",
      success: false,
    });
  }
};
// <---------------------------------------Registration Complete------------------------------------->

// <---------------------------------------Login------------------------------------->
export const Login = async (req, res) => {
  try {
    // Fetching the Data
    const { email, password } = req.body;
    console.log(req.body);

    // Validating the data
    if (!email || !password) {
      return res.status(401).json({
        message: "Please Fill all the Fields",
        success: false,
      });
    }

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist with this Email",
        success: false,
      });
    }

    // Checking Password
    const passMatch = await comparePassword(password, user.password);
    if (!passMatch) {
      console.log("Password Invalid");
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }

    // Generating Token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res
      .status(200)
      .cookie("token", token, { expiresIn: "7d", httpOnly: true })
      .json({
        success: true,
        message: `Login Successfully ${user.name}`,
        user,
      });
  } catch (error) {
    // Error Displaying
    console.log("Error While logging User", error);
    return res.status(500).json({
      message: "Error While Login",
      success: false,
    });
  }
};
// <---------------------------------------Login Complete------------------------------------->

// <---------------------------------------Logout------------------------------------->
export const Logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        expiresIn: new Date(Date.now()),
      })
      .json({
        message: "Logout Successfully",
        success: true,
      });
  } catch (error) {
    console.log("Error while Logout", error);
    return res.status(500).json({
      message: "Error While Logout",
      success: false,
    });
  }
};
// <---------------------------------------Logout Complete------------------------------------->

// <---------------------------------------Bookmark or not  Post------------------------------------->
export const bookmarkPost = async (req, res) => {
  try {
    const loggedInUser = req.body.id; // ID of the logged-in user
    const postId = req.params.id; // ID of the post

    console.log("Logged in user ID:", loggedInUser);
    console.log("Post ID:", postId);

    // Find the user using the ID
    const user = await User.findById(loggedInUser);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if the post has already been liked by the user
    if (user.bookmarks.includes(postId)) {
      // If the user has already liked the post, remove their like using $pull
      await User.findByIdAndUpdate(
        loggedInUser,
        { $pull: { bookmarks: postId } },
        { new: true }
      );

      return res.status(200).json({
        message: "Post Unbookmarked",
        success: true,
      });
    } else {
      // If the user hasn't liked the post, add their like using $push
      await User.findByIdAndUpdate(
        loggedInUser,
        { $push: { bookmarks: postId } },
        { new: true }
      );

      return res.status(200).json({
        message: "Post Bookmarked",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while Bookmarking the post",
      success: false,
    });
  }
};
// <---------------------------------------Bookmark or not  Post Complete------------------------------------->

// <---------------------------------------Get my Profile------------------------------------->
export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while Finding User Profile",
      success: false,
    });
  }
};
// <---------------------------------------Get my Profile Complete------------------------------------->

// <---------------------------------------Get other Profile------------------------------------->
export const getOtherProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );
    if (!otherUsers || otherUsers.length === 0) {
      return res.status(200).json({
        message: "No Other Profile Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      otherUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while Finding other Profiles",
      success: false,
    });
  }
};
// <---------------------------------------Get other Profile Complete------------------------------------->
// <---------------------------------------Follow and Unfollow User------------------------------------->
export const followUser = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; // ID of the logged-in user
    const userIdToFollow = req.params.id; // ID of the user to follow

    // Find the user to follow
    const user = await User.findById(loggedInUserId); // ID of the logged-in user (Ripon)
    const userToFollow = await User.findById(userIdToFollow); // ID of the user to follow (sumpan)

    // Check if the user to follow is already followed by the logged-in user
    if (!user.following.includes(userIdToFollow)) {
      // If the user to follow is already followed by the logged-in user, remove their follow using $pull
      await User.findByIdAndUpdate(
        loggedInUserId,
        { $push: { following: userIdToFollow } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userIdToFollow,
        { $push: { followers: loggedInUserId } },
        { new: true }
      );
    } else {
      return res.status(400).json({
        success: true,
        message: `You are already following ${userToFollow.name}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `You are now following ${userToFollow.name}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while Following User",
      success: false,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; // ID of the logged-in user
    const userIdToFollow = req.params.id; // ID of the user to follow

    // Find the user to follow
    const user = await User.findById(loggedInUserId); // ID of the logged-in user (Ripon)
    const userToFollow = await User.findById(userIdToFollow); // ID of the user to follow (sumpan)

    // Check if the user to follow is already followed by the logged-in user
    if (user.following.includes(userIdToFollow)) {
      // If the user to follow is already followed by the logged-in user, remove their follow using $pull
      await User.findByIdAndUpdate(
        loggedInUserId,
        { $pull: { following: userIdToFollow } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userIdToFollow,
        { $pull: { followers: loggedInUserId } },
        { new: true }
      );
    } else {
      return res.status(400).json({
        success: true,
        message: `${loggedInUserId.name} is not following ${userToFollow.name}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `You Just Unfollowed ${userToFollow.name}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while UnFollowing User",
      success: false,
    });
  }
};
