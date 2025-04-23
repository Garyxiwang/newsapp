import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.31.107:8000',
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