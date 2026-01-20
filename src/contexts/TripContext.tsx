import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  distance?: string;
  expenses?: string;
  notes?: string;
}

interface TripContextType {
  trips: Trip[];
  loading: boolean;
  addTrip: (trip: Omit<Trip, 'id'>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  getTrip: (id: string) => Trip | undefined;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const TRIPS_STORAGE_KEY = '@fictionverse_trips';

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Load trips from AsyncStorage on mount
  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const savedTrips = await AsyncStorage.getItem(TRIPS_STORAGE_KEY);
      if (savedTrips) {
        setTrips(JSON.parse(savedTrips));
      }
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (tripData: Omit<Trip, 'id'>) => {
    try {
      const newTrip: Trip = {
        ...tripData,
        id: 'trip_' + Date.now(),
      };
      const updatedTrips = [...trips, newTrip];
      setTrips(updatedTrips);
      await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updatedTrips));
    } catch (error) {
      console.error('Failed to add trip:', error);
      throw error;
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      const updatedTrips = trips.filter(trip => trip.id !== id);
      setTrips(updatedTrips);
      await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updatedTrips));
    } catch (error) {
      console.error('Failed to delete trip:', error);
      throw error;
    }
  };

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    try {
      const updatedTrips = trips.map(trip =>
        trip.id === id ? { ...trip, ...updates } : trip
      );
      setTrips(updatedTrips);
      await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updatedTrips));
    } catch (error) {
      console.error('Failed to update trip:', error);
      throw error;
    }
  };

  const getTrip = (id: string) => {
    return trips.find(trip => trip.id === id);
  };

  return (
    <TripContext.Provider value={{ trips, loading, addTrip, deleteTrip, updateTrip, getTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};