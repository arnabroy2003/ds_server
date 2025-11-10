import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose";

const app = express()

app.get("/", (req, res) => {
  res.send("🚀 DS Server is live and running perfectly on Vercel!");
});

app.get("/check-db", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    let status = "";

    switch (state) {
      case 0:
        status = "🔴 Disconnected";
        break;
      case 1:
        status = "🟢 Connected";
        break;
      case 2:
        status = "🟡 Connecting...";
        break;
      case 3:
        status = "🟠 Disconnecting...";
        break;
      default:
        status = "❓ Unknown";
    }

    res.send(`Database Status: ${status}`);
  } catch (error) {
    res.status(500).send(`❌ Error: ${error.message}`);
  }
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],
    credentials: true
}))

app.use(cookieParser())

app.use(express.static("public"))

app.use(express.json({
    limit: "1mb",
}))

app.use(express.urlencoded({
    limit: "500kb",
    extended: true
}))



import userRouter from "./routes/user.routes.js"
import hotelRouter from "./routes/hotel.route.js"
import packageRouter from "./routes/package.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/hotel", hotelRouter)
app.use("/api/v1/package", packageRouter)

export default app