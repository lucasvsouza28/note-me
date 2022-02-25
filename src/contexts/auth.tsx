import React, { createContext, useContext, useEffect, useState} from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { firebase as firebaseClient } from '../services/client'
import 'firebase/compat/auth';
import nookies from 'nookies';

type AuthContextType = {
  user: firebaseClient.User | null,
  signin: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebaseClient.User | null>(null);

  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);


  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  const signin = async () => {
    const { user } = await firebaseClient.auth().signInWithPopup(new GoogleAuthProvider());

    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
