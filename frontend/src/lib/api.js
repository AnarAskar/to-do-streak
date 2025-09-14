import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCards = () => api.get("/cards");
export const getCard = (id) => api.get(`/cards/${id}`);
export const createCard = (title) => api.post("/cards", { title });
export const deleteCard = (id) => api.delete(`/cards/${id}`);

export const createTask = (cardId, text) =>
  api.post("/tasks", { cardId, text });
export const completeTask = (id) => api.patch(`/tasks/${id}/complete`);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
