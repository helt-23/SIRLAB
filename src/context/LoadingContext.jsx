import React, { createContext, useState, useContext, useCallback } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Usar useCallback para evitar re-renderizações desnecessárias
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{
      isLoading,
      startLoading,
      finishLoading
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};