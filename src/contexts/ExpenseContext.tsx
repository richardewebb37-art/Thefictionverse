import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'fuel' | 'maintenance' | 'tolls' | 'food' | 'lodging' | 'other';
  date: string;
  tripId?: string;
  receipt?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, updates: Partial<Expense>) => Promise<void>;
  getExpensesByCategory: (category: Expense['category']) => Expense[];
  getExpensesByTrip: (tripId: string) => Expense[];
  getTotalExpenses: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const EXPENSES_STORAGE_KEY = '@fictionverse_expenses';

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from AsyncStorage on mount
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      const newExpense: Expense = {
        ...expenseData,
        id: 'expense_' + Date.now(),
      };
      const updatedExpenses = [newExpense, ...expenses];
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Failed to add expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Failed to delete expense:', error);
      throw error;
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      const updatedExpenses = expenses.map(expense =>
        expense.id === id ? { ...expense, ...updates } : expense
      );
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Failed to update expense:', error);
      throw error;
    }
  };

  const getExpensesByCategory = (category: Expense['category']) => {
    return expenses.filter(expense => expense.category === category);
  };

  const getExpensesByTrip = (tripId: string) => {
    return expenses.filter(expense => expense.tripId === tripId);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense, updateExpense, getExpensesByCategory, getExpensesByTrip, getTotalExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};