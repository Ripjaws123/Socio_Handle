import express from "express";
import {
  Register,
  Login,
  Logout,
  bookmarkPost,
  getMyProfile,
  getOtherProfile,
  followUser,
  unfollowUser
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.put("/bookmarkpost/:id", isAuthorized, bookmarkPost);
router.get("/getprofile/:id", isAuthorized, getMyProfile);
router.get("/getotherprofile/:id", isAuthorized, getOtherProfile);
router.post("/follow/:id", isAuthorized, followUser);
router.post("/unfollow/:id", isAuthorized, unfollowUser);

export default router;
