import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Simular login
  const login = async (credentials) => {
    setIsLoading(true);

    // Simulação de API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: credentials.username,
          email: `${credentials.username}@example.com`,
          role: 'student'
        };

        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));

        setIsLoading(false);
        resolve(user);
      }, 1500);
    });
  };

  // Simulando registro
  const register = async (userData) => {
    setIsLoading(true);

    // Simulação de API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular erro se email já existe
        if (userData.email === 'existente@example.com') {
          setIsLoading(false);
          reject({ message: 'Email já cadastrado' });
          return;
        }

        const user = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: userData.role
        };

        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));

        setIsLoading(false);
        resolve(user);
      }, 1500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);