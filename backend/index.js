// backend/index.js (ES6 module)

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import WebSocket from "ws";
import twilio from "twilio";
import dotenv from "dotenv";

import User from "./User.js";

dotenv.config(); // load .env

const JWT_SECRET = process.env.JWT_SECRET;

/* ================= CREATE APP ================= */
export function createApp() {
  const app = express();

  /* ========== MIDDLEWARE ========== */
  app.use(
    cors({
      origin: process.env.ORIGIN_URL,
      credentials: true,
    })
  );
  app.use(bodyParser.json());

  /* ========== DB CONNECTION ========== */
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

  /* ========== AUTH MIDDLEWARE ========== */
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = decoded;
      next();
    });
  };

  /* ========== REGISTER ========== */
  app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
      const exists = await User.findOne({ username });
      if (exists) return res.status(409).json({ message: "User exists" });

      const hash = await bcrypt.hash(password, 10);
      await new User({ username, password: hash }).save();

      res.status(201).json({ message: "Registered" });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  /* ========== LOGIN ========== */
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    try {
      const user = await User.findOne({ username });
      if (!user) {
        console.log("Login failed: user not found");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("Login failed: incorrect password for user", username);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!JWT_SECRET) {
        console.error("JWT_SECRET not defined in .env");
        return res.status(500).json({ message: "Server misconfigured" });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

      console.log("Login successful:", username);
      res.json({ token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });


  app.get('/config', (req, res) => {
    const Rag_server_url = process.env.RAM_API_URL;
    const DocAss_server_url = process.env.DOC_API_URL;
    res.json({ Rag_server_url, DocAss_server_url });
  });

  /* ========== CHAT ========== */
  app.post("/chat", (req, res) => {
    const { message } = req.body;

    let reply = message.toLowerCase().includes("hello")
      ? "Hello! How can I help you?"
      : `You said: ${message}`;

    setTimeout(() => {
      res.json({ reply });
    }, 800);
  });

  /* ========== TWILIO TOKEN ========== */
  app.post("/twilio/token", (req, res) => {
    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET,
      TWILIO_VOICE_APP_SID,
    } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWILIO_VOICE_APP_SID) {
      return res.status(500).json({ error: "Twilio not configured" });
    }

    const identity = req.body.identity || `user_${Math.floor(Math.random() * 1000000)}`;

    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, {
      identity,
      ttl: 3600,
    });

    token.addGrant(new VoiceGrant({ outgoingApplicationSid: TWILIO_VOICE_APP_SID }));

    res.json({ token: token.toJwt(), identity });
  });

  return app;
}
