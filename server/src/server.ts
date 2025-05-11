import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import prisma from "./lib/prisma";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);
app.get("/", (req, res) => {
  res.send("Server çalışıyor 🚀");
});

const PORT = process.env.PORT || 5000;

// Initialize server with database connection
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

startServer();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});