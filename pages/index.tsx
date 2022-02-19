import type { NextPage } from 'next'
import Image from 'next/image'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { styled } from '../stitches.config'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>note.me - Login</title>
        <meta name="description" content="note.me login page" />
      </Head>

      <Section white css={{
        paddingTop: '100px',
      }}>
        <Image
          src='/assets/banner.svg'
          alt='banner'
          width={500}
          height={500}
        />

        <Title>Keep life simple</Title>
        <Paragraph>
          Store all your notes in a simple and intuitive app that helps you enjoy what is most important in life.
        </Paragraph>

      </Section>
      <Section offwhite css={{
        display: 'grid',
        placeItems: 'center',
      }}>
        <Head>
          <Image
            src='/assets/brand_text_dark.svg'
            alt='banner'
            width={226}
            height={60}
          />
        </Head>

        <Button red>
          <BsGoogle
            size={24}
          />
          Join with Google
        </Button>

        <Divider />

        <Input
          placeholder='Type your secret codename'
        />

        <Button green>
          <FiLogIn
            size={24}
          />
          Join anonymously
        </Button>
      </Section>
    </Container>
  )
}

const Container = styled('main', {
  height: '100vh',
  display: 'flex',
  color: '$gray900',
});

const Section = styled('section', {
  flex: 1,

  padding: '237px 200px',

  variants: {
    white: {
      true:{
        background: '$white',
      }
    },
    offwhite: {
      true: {
        background: '$white_cream',
      }
    }
  }
});

const Title = styled('h1', {
  fontWeight: 'bold',
  fontSize: '40px',
  lineHeight: '42px',
  marginBottom: '21px',
  color: '$gray900',
});

const Paragraph = styled('p', {
  color: '$gray300',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '32px',
})

const Head = styled('h1', {
});

const Button = styled('button', {
  cursor: 'pointer',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',

  width: '100%',

  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '18px',
  color: '$white',

  border: 'none',
  borderRadius: '$8',
  outline: 'none',

  padding: '13px 0',

  '&:active': {
    transform: 'scale(.99)',
  },

  variants: {
    red: {
      true: {
        background: '$semantic_red'
      }
    },
    green: {
      true: {
        background: '$semantic_green'
      }
    }
  }
});

const Divider = styled('hr', {
  display: 'grid',
  placeItems: 'center',
  position: 'relative',

  border: 'none',

  height: '1px',
  width: '100%',

  background: '$gray300',

  '&:after': {
    content: 'or join anonimously',
    position: 'fixed',
    background: '$white_cream',

    padding: '0 2rem',
    color: '$gray300',
    fontSize: '14px',
    lineHeight: '16px',
  }
});

const Input = styled('input', {
  background: '$white',

  borderStyle: 'solid',
  borderColor: '$gray300',
  borderWidth: '1px',
  borderRadius: '$8',

  outline: 'none',
  padding: '1rem',

  height: '50px',
  width: '100%',

  '&::placeholder': {
    color: '$gray300',
    fontSize: '16px',
    lineHeight: '18px',
  }
});

export default Home
