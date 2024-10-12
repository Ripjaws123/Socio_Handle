import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

const app = express();

// config
dotenv.config();
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

// middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

// Api routes
app.use("/auth", userRoute);
app.use("/post", postRoute);

const Port = process.env.PORT || 5000;
dbConnect();

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

app.get("/", (req, res) => {
  return res.send("Server is Running 🚀");
});
