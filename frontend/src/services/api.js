import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 
  return config;
});

export const register =(data)=> api.post("/auth/register", data);
export const login =(data)=> api.post("/auth/login", data);

export const genrateQuiz =(data)=> api.post("/quiz/generate", data);
export const getQuizzes =(id)=> api.get(`/quiz/${id}`);

export const submitQuiz =(id, data)=> api.post(`/quiz/${id}/submit`, data);

export const getHistory = () => api.get('/quiz/history')


export const getLeaderboard =()=> api.get("/leaderboard");

export default api;