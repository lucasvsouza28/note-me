import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { FiHome, FiLogOut, FiPlus, FiSun, FiMoon } from 'react-icons/fi'
import { styled } from '@stitches/react'
import { lightTheme } from '../../../stitches.config'
import { useTheme } from '../../contexts/theme'

type CardColorType = 'green' | 'purple' | 'yellow';

type Note = {
  id: string;
  text: string;
  date: string;
  color: CardColorType;
};

type HomeProps = {
  notes: Note[];
};

const Home: NextPage<HomeProps> = ({
  notes,
}) => {
  const { currentTheme, toggleTheme } = useTheme();

  const SideBar = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: '1rem 0',

    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',

    width: '112px',

    background: '$bg_sidebar',
    filter: currentTheme === lightTheme ? 'drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.05))' : '',
  });

  // TODO: understand why onClick is not fired when this is created in another file
  const IconButton = styled('button', {
    cursor: 'pointer',

    background: 'transparent',
    border: 'none',
    outline: 'none',

    '&:active': {
      transform: 'scale(.95)'
    },
  });

  return (
    <>
      <SideBar>
        <Image
          src={`/assets/logo${currentTheme === lightTheme ? '' : '_dark'}.svg`}
          height={48}
          width={48}
        />

        <SidebarCenteredWrapper>
          <IconButton>
            <FiHome
              size={32}
              color={currentTheme.colors.text_primary}
            />
          </IconButton>

          <IconButton>
            <FiPlus
              size={32}
              color={currentTheme.colors.text_primary}
            />
          </IconButton>
        </SidebarCenteredWrapper>

        <FiLogOut
          size={32}
        />

      </SideBar>

      <Main>
        <Header>
          <InputWrapper>
            <Image
              src='/assets/search.svg'
              height={32}
              width={32}
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
          Hello, <span>Lucas</span>
        </h1>

        <h2>All your notes are here, in one place!</h2>

        <NotesContainer>
          { notes.map(note => (
            <Note
              key={note.id}
              color={note.color}
            >
              <p>
                {note.text}
              </p>
              <span>
                {note.date}
              </span>
            </Note>
          )) }
        </NotesContainer>
      </Main>
    </>
  )
}

function getRandomColor(): CardColorType {
  const colors = ['green', 'purple', 'yellow']
  const randomIndex = parseInt((Math.random() * colors.length).toString());

  return (colors[randomIndex] || 'green') as CardColorType;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const dbNotes: Note[] = [];
  const defaultNotes: Note[] = [
      { id: '1', text: 'This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍', date: new Date().toISOString(), color: getRandomColor() },
      { id: '2', text: 'This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍', date: new Date().toISOString(), color: getRandomColor() },
      { id: '3', text: 'This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍', date: new Date().toISOString(), color: getRandomColor() },
  ]

  const notes: Note[] = dbNotes.length === 0 ? defaultNotes : dbNotes;

  return {
    props: {
      notes
    }
  }
}

export const SidebarCenteredWrapper = styled('div', {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  gap: '28px',

  '& > button:first-child': {
    display: 'grid',
    placeItems: 'center',

    width: '100%',
    borderLeft: '2px solid',
    borderLeftColor: '$text_primary',
  }
})

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

const Note = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  width: '262px',
  height: '240px',
  borderRadius: '10px',
  padding: '24px',

  fontWeight: '500',

  '& > p' :{
    fontSize: '20px',
    lineHeight: '30px',
  },

  '& > span' :{
    fontSize: '14px',
    lineHeight: '17px',
  },

  variants: {
    color: {
      green: {
        background: 'rgba(151, 210, 188, 0.4)'
      },
      yellow: {
        background: 'rgba(251, 235, 149, 0.4)'
      },
      purple: {
        background: 'rgba(182, 165, 203, 0.4)'
      },
    }
  }
})

export default Home
