// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

// Define the shape of the user object (adjust as needed)
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the shape of the context state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean; // Optional: indicate if auth state is loading
}

// Define the shape of the context value (state + actions)
interface AuthContextType extends AuthState {
  login: (user: User) => void; // Simulate login
  logout: () => void; // Simulate logout
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true, // Start in loading state (e.g., if checking local storage)
  });

  // Simulate checking auth status on initial load (e.g., from localStorage)
  // In a real app, you might make an API call here
  useState(() => {
      // Replace with actual check if needed
      const checkAuthStatus = () => {
          // Example: check localStorage? API call?
          // For now, just assume not logged in initially
          setAuthState({ isAuthenticated: false, user: null, loading: false });
      };
      // Simulate async check
      const timer = setTimeout(checkAuthStatus, 50); // Short delay to show loading state briefly
      return () => clearTimeout(timer); // Cleanup timer
  });


  // Login function
  const login = (user: User) => {
    console.log('AuthContext: Logging in user', user);
    setAuthState({ isAuthenticated: true, user: user, loading: false });
    // In real app: maybe save token to localStorage here
  };

  // Logout function
  const logout = () => {
    console.log('AuthContext: Logging out');
    setAuthState({ isAuthenticated: false, user: null, loading: false });
     // In real app: remove token from localStorage, notify backend
  };

  // Use useMemo to prevent unnecessary re-renders of consumers
  // The context value object is recreated on every render otherwise
  const contextValue = useMemo(() => ({
      ...authState,
      login,
      logout,
  }), [authState]); // Re-memoize only when authState changes


  // Provide the context value to children
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};