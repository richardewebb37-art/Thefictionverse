import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Engine status types
export type EngineStatus = 'INITIALIZING' | 'RUNNING' | 'IDLE' | 'ERROR' | 'OFFLINE';

export interface EngineState {
  status: EngineStatus;
  lastHeartbeat: number | null;
  errorMessage: string | null;
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
  engine: EngineState;
  isReady: boolean;
  checkHealth: () => Promise<void>;
  getStatusColor: () => string;
  getStatusText: () => string;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

const initialState: EngineState = {
  status: 'INITIALIZING',
  lastHeartbeat: null,
  errorMessage: null,
  services: {
    auth: false,
    settings: false,
    trips: false,
    alerts: false,
    expenses: false,
    messages: false,
  },
};

export const EngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [engine, setEngine] = useState<EngineState>(initialState);

  // Initialize engine on mount
  useEffect(() => {
    initializeEngine();
    
    // Heartbeat interval - check every 30 seconds
    const heartbeatInterval = setInterval(() => {
      updateHeartbeat();
    }, 30000);

    return () => clearInterval(heartbeatInterval);
  }, []);

  const initializeEngine = async () => {
    try {
      setEngine(prev => ({ ...prev, status: 'INITIALIZING' }));
      
      // Simulate checking each service
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check all services
      const services = {
        auth: true,      // AuthContext is available
        settings: true,  // SettingsContext is available
        trips: true,     // TripContext is available
        alerts: true,    // AlertContext is available
        expenses: true,  // ExpenseContext is available
        messages: true,  // MessageContext is available
      };

      setEngine({
        status: 'RUNNING',
        lastHeartbeat: Date.now(),
        errorMessage: null,
        services,
      });
    } catch (error) {
      setEngine(prev => ({
        ...prev,
        status: 'ERROR',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  const updateHeartbeat = () => {
    setEngine(prev => ({
      ...prev,
      lastHeartbeat: Date.now(),
      status: prev.status === 'ERROR' ? 'ERROR' : 'RUNNING',
    }));
  };

  const checkHealth = async () => {
    try {
      setEngine(prev => ({ ...prev, status: 'INITIALIZING' }));
      await initializeEngine();
    } catch (error) {
      setEngine(prev => ({
        ...prev,
        status: 'ERROR',
        errorMessage: error instanceof Error ? error.message : 'Health check failed',
      }));
    }
  };

  const getStatusColor = (): string => {
    switch (engine.status) {
      case 'RUNNING':
        return '#00ff00'; // Green
      case 'IDLE':
        return '#ffff00'; // Yellow
      case 'INITIALIZING':
        return '#007aff'; // Blue
      case 'ERROR':
        return '#ff0000'; // Red
      case 'OFFLINE':
        return '#666666'; // Gray
      default:
        return '#666666';
    }
  };

  const getStatusText = (): string => {
    switch (engine.status) {
      case 'RUNNING':
        return '● ENGINE RUNNING';
      case 'IDLE':
        return '○ ENGINE IDLE';
      case 'INITIALIZING':
        return '◐ INITIALIZING...';
      case 'ERROR':
        return '✖ ENGINE ERROR';
      case 'OFFLINE':
        return '◌ OFFLINE';
      default:
        return '? UNKNOWN';
    }
  };

  const isReady = engine.status === 'RUNNING' || engine.status === 'IDLE';

  return (
    <EngineContext.Provider value={{ engine, isReady, checkHealth, getStatusColor, getStatusText }}>
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

export default EngineContext;