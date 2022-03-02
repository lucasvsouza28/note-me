import React, { createContext, useContext, useState } from 'react'

type NotesContextType = {
  newNote: Note | null;
  setNewNote: (value: Note) => void;
  createNote: (newNote: Note) => void;
}

type Note = {
  text: string;
  author: string;
}

const context = createContext({} as NotesContextType);

export const NotesProvider: React.FC = ({ children }) => {
  const [newNote, setNewNote] = useState<Note | null>(null);

  const createNote = (newNote: Note) => {

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
