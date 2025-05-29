import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isInitialLoading: boolean; // pouze pro inicializaci aplikace!
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitialLoading: true,
  login: async () => {},
  logout: () => {},
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setIsInitialLoading(true);
      await new Promise((res) => setTimeout(res, 1600));
      setUser(null); // nebo načíst uživatele z úložiště
      setIsInitialLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    // ZDE můžeš řešit ověření uživatele (případný loading řeš v LoginScreen)
    setUser({ email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isInitialLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;