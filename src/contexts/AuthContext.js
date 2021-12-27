import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../fisebase";
import firebase from "firebase/app";
import "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth"


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function signInWithGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return auth.firebase.auth().signInWithPopup(googleAuthProvider);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
