import { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        title: newTitle,
      });
      setTodos([response.data, ...todos]);
      setNewTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>My Todo List</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo title..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "6px",
            backgroundColor: todo.completed ? "#e6ffe6" : "#fff",
          }}
        >
          <h4>{todo.title}</h4>
          <p>{todo.completed ? "✅ Completed" : "🕒 Not Completed"}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
