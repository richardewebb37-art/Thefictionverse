import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type EngineState = 'INITIALIZING' | 'RUNNING' | 'IDLE' | 'ERROR' | 'OFFLINE';

export interface EngineStatus {
  state: EngineState;
  uptime: number;
  lastUpdated: Date;
  services: {
    auth: boolean;
    settings: boolean;
    trips: boolean;
    alerts: boolean;
    expenses: boolean;
    messages: boolean;
  };
}

interface EngineContextType {
  engineState: EngineState;
  engineStatus: EngineStatus;
  startEngine: () => void;
  stopEngine: () => void;
  getServiceStatus: (service: keyof EngineStatus['services']) => boolean;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export const EngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [engineState, setEngineState] = useState<EngineState>('INITIALIZING');
  const [engineStatus, setEngineStatus] = useState<EngineStatus>({
    state: 'INITIALIZING',
    uptime: 0,
    lastUpdated: new Date(),
    services: {
      auth: false,
      settings: false,
      trips: false,
      alerts: false,
      expenses: false,
      messages: false,
    },
  });

  const startEngine = () => {
    setEngineState('RUNNING');
    setEngineStatus(prev => ({
      ...prev,
      state: 'RUNNING',
      lastUpdated: new Date(),
      services: {
        auth: true,
        settings: true,
        trips: true,
        alerts: true,
        expenses: true,
        messages: true,
      },
    }));
  };

  const stopEngine = () => {
    setEngineState('OFFLINE');
    setEngineStatus(prev => ({
      ...prev,
      state: 'OFFLINE',
      lastUpdated: new Date(),
      services: {
        auth: false,
        settings: false,
        trips: false,
        alerts: false,
        expenses: false,
        messages: false,
      },
    }));
  };

  const getServiceStatus = (service: keyof EngineStatus['services']): boolean => {
    return engineStatus.services[service];
  };

  useEffect(() => {
    // Simulate engine startup
    const startupTimer = setTimeout(() => {
      startEngine();
    }, 1000);

    // Track uptime
    const uptimeInterval = setInterval(() => {
      setEngineStatus(prev => ({
        ...prev,
        uptime: prev.uptime + 1,
      }));
    }, 1000);

    return () => {
      clearTimeout(startupTimer);
      clearInterval(uptimeInterval);
    };
  }, []);

  return (
    <EngineContext.Provider
      value={{
        engineState,
        engineStatus,
        startEngine,
        stopEngine,
        getServiceStatus,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

export const useEngine = (): EngineContextType => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return context;
};