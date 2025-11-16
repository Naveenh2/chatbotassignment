// src/App.jsx
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ChatPage } from './pages/ChatPage';
import { ThemeToggle } from './components/ThemeToggle';
import { Menu, User, Settings } from 'lucide-react';

// A helper component to redirect to a new chat
const NewChatRedirect = () => {
  // This is a placeholder. We'll implement the API call in Sidebar.jsx
  // For now, it just shows how to structure the route.
  // In a real app, this would call POST /api/chat/new and redirect
  // to /chat/[new_session_id]
  return <Navigate to="/chat/new" replace />;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Settings size={20} className="text-gray-500" />
            <User size={20} className="text-gray-500" />
            <img 
              src="https://via.placeholder.com/32" // Replace with user avatar
              alt="User"
              className="rounded-full"
            />
          </div>
        </header>

        {/* Chat Window */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<NewChatRedirect />} />
            <Route path="/chat/:sessionId" element={<ChatPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;