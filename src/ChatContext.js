import React, {createContext, useState, useContext} from 'react';

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});

  const addChat = contactName => {
    setChats(prevChats => {
      const chatExists = prevChats.some(
        chat => chat.contactName === contactName,
      );
      if (!chatExists) {
        const newChat = {
          id: Date.now().toString(),
          contactName,
          lastMessage: '',
          lastMessageTime: '',
        };
        setMessages(prevMessages => ({...prevMessages, [newChat.id]: []}));
        return [...prevChats, newChat];
      }
      return prevChats;
    });
  };

  const formatTime = date => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const addMessage = (chatId, message) => {
    const currentTime = formatTime(new Date());
    setMessages(prevMessages => {
      const updatedMessages = [
        {id: Date.now().toString(), text: message, time: currentTime},
        ...(prevMessages[chatId] || []),
      ];
      return {...prevMessages, [chatId]: updatedMessages};
    });

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? {...chat, lastMessage: message, lastMessageTime: currentTime}
          : chat,
      ),
    );
  };

  const getMessages = chatId => messages[chatId] || [];

  const updateMessage = (chatId, updatedMessage) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: prevMessages[chatId].map(message =>
        message.id === updatedMessage.id ? updatedMessage : message,
      ),
    }));
  };

  const deleteMessage = (chatId, messageId) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: prevMessages[chatId].filter(
        message => message.id !== messageId,
      ),
    }));
  };

  const pinChat = chatId => {
    setChats(prevChats =>
      prevChats
        .map(chat => (chat.id === chatId ? {...chat, pinned: true} : chat))
        .sort((a, b) => b.pinned - a.pinned),
    );
  };

  const deleteChat = chatId => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    setMessages(prevMessages => {
      const newMessages = {...prevMessages};
      delete newMessages[chatId];
      return newMessages;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        addChat,
        addMessage,
        getMessages,
        updateMessage,
        deleteMessage,
        pinChat,
        deleteChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
