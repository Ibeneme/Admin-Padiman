import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the user data
interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  superAdmin: boolean;
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context with a default value of null
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider to wrap the application with the user context
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};