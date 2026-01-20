import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: number;
  read: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: number;
  unreadCount: number;
}

interface MessageContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  loading: boolean;
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
  createConversation: (name: string) => Promise<string>;
  deleteConversation: (conversationId: string) => Promise<void>;
  getMessages: (conversationId: string) => Message[];
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MESSAGES_STORAGE_KEY = '@fictionverse_messages';
const CONVERSATIONS_STORAGE_KEY = '@fictionverse_conversations';

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState(true);

  // Load messages and conversations from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedConversations = await AsyncStorage.getItem(CONVERSATIONS_STORAGE_KEY);
      const savedMessages = await AsyncStorage.getItem(MESSAGES_STORAGE_KEY);
      
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      }
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Failed to load message data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (conversationId: string, text: string) => {
    try {
      const newMessage: Message = {
        id: 'msg_' + Date.now(),
        conversationId,
        text,
        sender: 'user',
        timestamp: Date.now(),
        read: false,
      };

      // Update messages
      const conversationMessages = messages[conversationId] || [];
      const updatedMessages = {
        ...messages,
        [conversationId]: [...conversationMessages, newMessage],
      };
      setMessages(updatedMessages);
      await AsyncStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));

      // Update conversation
      const updatedConversations = conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, lastMessage: text, lastMessageTime: Date.now() }
          : conv
      );
      setConversations(updatedConversations);
      await AsyncStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedConversations));
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const markConversationAsRead = async (conversationId: string) => {
    try {
      // Update messages as read
      const conversationMessages = messages[conversationId] || [];
      const updatedMessages = {
        ...messages,
        [conversationId]: conversationMessages.map(msg => ({ ...msg, read: true })),
      };
      setMessages(updatedMessages);
      await AsyncStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));

      // Update conversation unread count
      const updatedConversations = conversations.map(conv =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      );
      setConversations(updatedConversations);
      await AsyncStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedConversations));
    } catch (error) {
      console.error('Failed to mark conversation as read:', error);
      throw error;
    }
  };

  const createConversation = async (name: string) => {
    try {
      const newConversation: Conversation = {
        id: 'conv_' + Date.now(),
        name,
        unreadCount: 0,
      };
      const updatedConversations = [newConversation, ...conversations];
      setConversations(updatedConversations);
      await AsyncStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedConversations));
      return newConversation.id;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      // Remove conversation
      const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
      setConversations(updatedConversations);
      await AsyncStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedConversations));

      // Remove messages
      const updatedMessages = { ...messages };
      delete updatedMessages[conversationId];
      setMessages(updatedMessages);
      await AsyncStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      throw error;
    }
  };

  const getMessages = (conversationId: string) => {
    return messages[conversationId] || [];
  };

  return (
    <MessageContext.Provider value={{ conversations, messages, loading, sendMessage, markConversationAsRead, createConversation, deleteConversation, getMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};