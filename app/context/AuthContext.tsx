import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  User as FirebaseUser,
  UserCredential,
  setPersistence,
  browserSessionPersistence,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

import { auth } from "../firebase/config";

interface AuthContextProps {
  currentUser: FirebaseUser | null;
  login(email: string, password: string): Promise<UserCredential>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  updateUserEmail(email: string): Promise<void> | undefined;
  browserSession(): Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children?: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: string) {
    if (!currentUser) return;
    return verifyBeforeUpdateEmail(currentUser, email);
  }

  function browserSession() {
    return setPersistence(auth, browserSessionPersistence);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        console.log(user);
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    browserSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
