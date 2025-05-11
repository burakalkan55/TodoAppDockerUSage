import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE_URL}/todos`);
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(`${API_BASE_URL}/todos`, { title });
  return response.data;
};
