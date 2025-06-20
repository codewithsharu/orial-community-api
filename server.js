import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import  cors  from "cors";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

app.use(cors({
	origin: ["https://orial-comunity-frontend-ms04oypj0-shareens-projects.vercel.app", "http://localhost:3000", "https://orial-comunity-frontend.vercel.app"],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
	methods: ["GET", "POST", "PUT", "DELETE"],
}));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
	res.send("API is running");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));