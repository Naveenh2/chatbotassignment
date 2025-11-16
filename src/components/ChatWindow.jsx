import { Message } from './Message';
import { useEffect, useRef } from 'react';

export const ChatWindow = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 space-y-6 overflow-y-auto pr-2">
      {messages.map((msg, index) => (
        <Message key={msg.id || `msg-${index}`} message={msg} />
      ))}
      {isLoading && <Message message={{ sender: 'bot', isLoading: true }} />}
      <div ref={endOfMessagesRef} />
    </div>
  );
};