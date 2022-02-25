import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyADGrQyDjHrmPn4lORMs5ImzwZdHimKDk4",
    authDomain: "note-me-e70ba.firebaseapp.com",
    projectId: "note-me-e70ba",
    storageBucket: "note-me-e70ba.appspot.com",
    messagingSenderId: "725006324478",
    appId: "1:725006324478:web:29e04bd81aa86528688baf"
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export {
  firebase,
};
