import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import nookies from 'nookies'
import firebase from 'firebase/compat/app'
import { FiSun, FiMoon } from 'react-icons/fi'
import { lightTheme, styled } from '../../../stitches.config'
import { useTheme } from '../../contexts/theme'
import Loading from '../../components/Loading'
import IconButton from '../../components/IconButton'
import Sidebar from '../../components/Sidebar'
import ThemedContainer from '../../components/ThemedContainer'
import Note, { NoteColorType } from '../../components/Note'
import { firebaseAdmin } from '../../services/admin'
import { useAuth } from '../../contexts/auth'
import { useNotes } from '../../contexts/notes'

type Note = {
  id: string;
  text: string;
  date: string;
  color: NoteColorType;
};

type HomeProps = {
  notes: Note[];
};

const Home: NextPage<HomeProps> = ({
  notes,
}) => {
  const { currentTheme, toggleTheme } = useTheme();
  const { newNote, createNote, } = useNotes();
  const { user, } = useAuth()
  const [progress, setProgress] = useState(100);

  // useEffect(() => {
  //   const i = setInterval(() => {
  //     setProgress(state => {
  //       if (state >= 100) clearInterval(i);

  //       return state + (state < 100 ? 33 : 0)
  //     })
  //   }, 2000);

  //   return () => {
  //     clearInterval(i)
  //   }
  // }, [])

  return (
    <ThemedContainer>
      { progress < 100 ? (
        <Loading
          completed={progress}
        />
      ) : (
        <>
        <Sidebar />

        <Main>
          <Header>
            <InputWrapper>
              <Image
                src='/assets/search.svg'
                height={32}
                width={32}
                alt="search icon"
              />
              <input placeholder="Search notes" />
            </InputWrapper>

            <IconButton
              onClick={toggleTheme}
            >
              { currentTheme === lightTheme ? (
                <FiMoon
                  size={24}
                  color={currentTheme.colors.text_primary}
                />
              ) : (
                <FiSun
                  size={24}
                  color={currentTheme.colors.text_primary}
                />
              ) }
            </IconButton>
          </Header>

          <h1>
            Hello, <span>{ user?.displayName }</span>
          </h1>

          <h2>All your notes are here, in one place!</h2>

          <NotesContainer>
            { newNote && (
              <Note
                editable={true}
                color={getRandomColor()}
                onNoteSent={n => createNote({ text: n.text!, author: user?.uid! })}
              />
            )}

            { notes.map(note => (
              <Note
                key={note.id}
                text={note.text}
                date={note.date}
                color={note.color}
              />
            ))}
          </NotesContainer>
        </Main>
        </>
      ) }

    </ThemedContainer>
  )
}

function getRandomColor(): NoteColorType {
  const colors = ['green', 'purple', 'yellow']
  const randomIndex = parseInt((Math.random() * colors.length).toString());

  return (colors[randomIndex] || 'green') as NoteColorType;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);


  const ref = await firebaseAdmin.firestore().collection('notes').where('author', '==', token.uid).get()
  const dbNotes = ref.docs.map(doc => {
    const data = doc.data() as Note;

    return {
      id: doc.id,
      // @ts-ignore
      date: new Date(data.date.seconds * 1000).toISOString(),
      text: data.text,
      color: getRandomColor()
    } as Note
  });

  const defaultNotes: Note[] = [
      { id: '1', text: 'This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍', date: new Date().toISOString(), color: getRandomColor() },
      { id: '2', text: 'So nice! ☺', date: new Date().toISOString(), color: getRandomColor() },
      { id: '3', text: 'This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍', date: new Date().toISOString(), color: getRandomColor() },
  ]

  const notes: Note[] = dbNotes.length === 0 ? defaultNotes : dbNotes;

  return {
    props: {
      notes
    }
  }
}

const Main = styled('main', {
  padding: '39px 224px',

  '& > h1': {
    fontSize: '32px',
    lineHeight: '37px',
    fontWeight: '400',
    marginBottom: '7px',

    '& > span': {
      fontWeight: 'bold',
    }
  }
});

const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '53px',
});

const InputWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',

  '& > input': {
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '18px',
    lineHeight: '21px',
    color: '$text_primary',

    '&::placeholder': {
      color: '$gray300'
    }
  }
});

const NotesContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '36px',
  marginTop: '63px',
});

export default Home
