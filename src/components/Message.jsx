import { User, Cpu, ThumbsUp, ThumbsDown, Loader } from 'lucide-react';
import { TableView } from './TableView';

export const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  if (message.isLoading) {
    return (
      <div className="flex gap-4">
        <div className="flex-shrink-0 p-2 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <Cpu size={20} />
        </div>
        <div className="flex items-center">
          <Loader className="animate-spin" size={20} />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : ''}`}>

      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 p-2 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <Cpu size={20} />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`p-4 rounded-lg max-w-2xl ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 dark:bg-gray-800'
      }`}>

        {isUser ? (
          <p>{message.text}</p>
        ) : (
          <div className="space-y-4">
            <p>{message.description}</p>

            {/* REQUIRED: Table View */}
            {message.table && (
              <TableView 
                headers={message.table.headers} 
                rows={message.table.rows} 
              />
            )}

            {/* REQUIRED: Feedback Buttons */}
            <div className="flex gap-2 pt-2 border-t dark:border-gray-600">
              <button className="p-1 text-gray-500 hover:text-blue-500">
                <ThumbsUp size={16} />
              </button>
              <button className="p-1 text-gray-500 hover:text-red-500">
                <ThumbsDown size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 p-2 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <User size={20} />
        </div>
      )}
    </div>
  );
};