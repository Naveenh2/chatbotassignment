import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ChatWindow } from '../components/ChatWindow';
import { Send } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const ChatPage = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]); // Full chat history
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Effect to fetch chat history when session ID changes
  useEffect(() => {
    if (sessionId) {
      const fetchHistory = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(`${API_URL}/chat/${sessionId}`);
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching chat history:", error);
          setMessages([]); // Clear on error
        } finally {
          setIsLoading(false);
        }
      };
      fetchHistory();
    }
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]); // Show user message immediately
    setPrompt("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat/${sessionId}`, { prompt });
      const botMessage = res.data;
      setMessages(prev => [...prev, botMessage]); // Add bot's response
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <ChatWindow messages={messages} isLoading={isLoading} />

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input 
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};