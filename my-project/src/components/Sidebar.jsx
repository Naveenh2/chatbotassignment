import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, MessageSquare, Settings, User } from 'lucide-react';
import axios from 'axios';

// const API_BASE_URL = 'import.meta.env.VITE_API_BASE_URL=http://localhost:5000/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
export const Sidebar = ({ isOpen, setIsOpen }) => {
  const [sessions, setSessions] = useState([]); // { id, title }
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/sessions`);
      setSessions(res.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleNewChat = async () => {
    try {
      const res = await axios.post(`${API_URL}/chat/new`);
      const { sessionId } = res.data;
      fetchSessions(); // Refresh session list
      navigate(`/chat/${sessionId}`); // Navigate to the new chat
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <nav 
      className={`flex flex-col h-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        <button
          onClick={handleNewChat}
          className="flex items-center justify-center gap-2 w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-150"
        >
          <Plus size={20} />
          {isOpen && <span>New Chat</span>}
        </button>

        {isOpen && <h2 className="px-3 pt-4 text-xs font-semibold text-gray-500 uppercase">All Sessions</h2>}

        {sessions.map(session => (
          <Link
            key={session.id}
            to={`/chat/${session.id}`}
            className="flex items-center gap-2 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            title={session.title}
          >
            <MessageSquare size={18} />
            {isOpen && <span className="truncate flex-1">{session.title}</span>}
          </Link>
        ))}
      </div>

      {/* User Info Section */}
      <div className="p-3 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-300 dark:bg-gray-600">
            <User size={18} />
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
            </div>
          )}
          {isOpen && <Settings size={18} className="text-gray-500" />}
        </div>
      </div>
    </nav>
  );
};