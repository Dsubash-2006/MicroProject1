import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from "../models/User.js";
import Book from "../models/Book.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (ONLY ONCE)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
};

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Book Exchange Backend Running on Vercel");
});

app.post("/register", async (req, res) => {
  await connectDB();
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const userObj = savedUser.toObject();
    delete userObj.password;
    res.json({ message: "✅ User Registered", user: userObj });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "❌ Email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  await connectDB();
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    }).select("-password");

    if (user) res.json(user);
    else res.status(400).json({ message: "❌ Invalid Credentials" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/books", async (req, res) => {
  await connectDB();
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: "📚 Book Added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/books", async (req, res) => {
  await connectDB();
  const books = await Book.find();
  res.json(books);
});

app.delete("/books/:id", async (req, res) => {
  await connectDB();
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "🗑️ Deleted" });
});

// Export for Vercel
export default app;