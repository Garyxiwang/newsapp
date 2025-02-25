import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: (text: string, isDeepThinking: boolean, isWebSearching: boolean) => {
    return api.post('/chat', {
      text,
      isDeepThinking,
      isWebSearching,
    });
  },
};

export default api; 