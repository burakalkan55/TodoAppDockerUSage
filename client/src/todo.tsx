import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Todo[]>(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      setError("Failed to load todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<Todo>(`${API_URL}/todos`, {
        title: newTitle,
      });
      setTodos([response.data, ...todos]);
      setNewTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
      setError("Failed to add todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>My Todo List</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffe6e6", borderRadius: "4px" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo title..."
          style={{ flex: 1, padding: "8px" }}
          disabled={loading}
        />
        <button 
          onClick={handleAddTodo}
          disabled={loading}
          style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {loading && !todos.length && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading todos...
        </div>
      )}

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