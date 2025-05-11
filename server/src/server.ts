// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.get("/", (req, res) => {
  res.send("Server çalışıyor 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
