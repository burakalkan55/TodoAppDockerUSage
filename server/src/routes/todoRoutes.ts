import { Router, Request, Response } from "express";
import prisma from '../lib/prisma';

interface TodoBody {
  title: string;
}

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { id: "desc" } });
    res.json(todos);
  } catch (error) {
    console.error("GET /api/todos error:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

router.post("/", async (req: Request<{}, {}, TodoBody>, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = await prisma.todo.create({
      data: { title, completed: false },
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("POST /api/todos error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
