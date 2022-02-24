import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { getFirestore, collection, addDoc, } from  'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'
import axios from 'axios'

let app: firebase.app.App | null = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp({});
}

const auth = firebase.auth()
const db = getFirestore(app!)

auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const signIn = async (): Promise<boolean> => {
  try {
    const { user } = await auth.signInWithPopup(new GoogleAuthProvider());
    const token = await user?.getIdToken();
    const csrfToken = getCookie('csrfToken')

    console.log('token', token)
    console.log('csrfToken', csrfToken)

    const loginResponse = await axios.post('/api/auth/login', {
        token,
        csrfToken,
      }, { withCredentials: true }
    );

    return loginResponse.status === 200;
  } catch (error) {
    console.error('Failed to create user session : ' + error);
    return false;
  }
}

export const signOut = async () => await auth.signOut();

const module = {
  auth,
  db,
  collection,
  addDoc,
}

export default module
