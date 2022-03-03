import { FormEvent, useRef, useState } from "react";
import { styled } from "../../../stitches.config"
import { useNotes } from "../../contexts/notes";

export type NoteColorType = 'green' | 'purple' | 'yellow';

type NoteProps = {
  text?: string;
  date?: string;
  editable?: boolean;
  color: NoteColorType;
};

const Note = ({
  text,
  date,
  color,
  editable,
  ...props
}: NoteProps) => {
  const [newNoteText, setNewNoteText] = useState('');
  const { createNote, } = useNotes()

  const formatDate = (date: Date) => {
    let monthName = Intl.DateTimeFormat(Intl.Locale.name, { month: 'short' }).format(date)
    monthName = monthName.split('')
                         .map((char, i) => i === 0 ? char.toUpperCase() : char)
                         .join('')
                         .replace('.', '');

    return `${monthName}, ${date.getDay().toString().padStart(2, '0')} ${date.getFullYear()}`;
  }

  const handleSubmit = () => {
    setNewNoteText('');
    createNote({ text: newNoteText });
  }

  return (
    <Container
      color={color}
      {...props}
    >
      { editable && (
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <textarea
            placeholder="Type your note..."
            onChange={e => setNewNoteText(e.target.value)}
            onKeyPress={e => {
              if (e.ctrlKey && e.key === '\n') handleSubmit();
            }}
          />
        </form>
      )}

      <p>
        {text}
      </p>
      <span>
        {formatDate(date ? new Date(date) : new Date())}
      </span>
    </Container>
  );
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  width: '262px',
  height: '240px',
  borderRadius: '10px',
  padding: '24px',

  fontWeight: '500',

  '& > p, & > form > textarea' :{
    fontSize: '20px',
    lineHeight: '30px',
  },

  '& > span' :{
    fontSize: '14px',
    lineHeight: '17px',
  },

  '& > form > textarea': {
    background: 'transparent',
    outline: 'none',
    border: 'none',
    width: '100%',
    maxWidth: '100%',
    minHeight: '100%',

    color: '$text_primary',
    fontWeight: '500',

    resize: 'none',

    '&::placeholder': {
      color: '$text_primary',
      FontFace: 'Ubuntu',
    }
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
});

export default Note;
