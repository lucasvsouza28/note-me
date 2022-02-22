import { styled } from "../../../stitches.config"

export type NoteColorType = 'green' | 'purple' | 'yellow';

type NoteProps = {
  text: string;
  date: string;
  color: NoteColorType;
};

const Note = ({
  text,
  date,
  color,
  ...props
}: NoteProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let monthName = Intl.DateTimeFormat(Intl.Locale.name, { month: 'short' }).format(date)
    monthName = monthName.split('')
                         .map((char, i) => i === 0 ? char.toUpperCase() : char)
                         .join('')
                         .replace('.', '');

    return `${monthName}, ${date.getDay().toString().padStart(2, '0')} ${date.getFullYear()}`;
  }

  return (
    <Container
      color={color}
      {...props}
    >
      <p>
        {text}
      </p>
      <span>
        {formatDate(date)}
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
});

export default Note;
