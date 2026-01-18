import React from 'react';
import { MainScreen } from './src/screens/MainScreen';
import { ErrorBoundary } from './src/components/ErrorBoundary';

/**
 * Main App Component
 * 
 * Wrapped in ErrorBoundary to catch and gracefully handle any JavaScript errors
 * that occur in the application, preventing app crashes and providing a
 * user-friendly recovery experience.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <MainScreen />
    </ErrorBoundary>
  );
}