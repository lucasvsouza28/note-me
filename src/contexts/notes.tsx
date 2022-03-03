import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './auth';
import { firebase } from '../services/client'

type NotesContextType = {
  newNote: Note | null;
  setNewNote: (value: Note | null) => void;
  createNote: (newNote: Note) => void;
}

type Note = {
  text: string;
}

const context = createContext({} as NotesContextType);

export const NotesProvider: React.FC = ({ children }) => {
  const [newNote, setNewNote] = useState<Note | null>(null);
  const { user } = useAuth()

  const createNote = async (newNote: Note) => {
    await firebase
      .firestore()
      .collection('notes')
      .add({
        author: user?.uid,
        date: new Date(),
        text: newNote.text
      });

    setNewNote(null);
  }

  return (
    <context.Provider
      value={{
        newNote,
        setNewNote,
        createNote
      }}
    >
      {children}
    </context.Provider>
  );
}

export const useNotes = () => useContext(context);
