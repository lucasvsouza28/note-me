import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '../contexts/theme'
import { global, styled } from '../../stitches.config'
import { AuthProvider } from '../contexts/auth'
import { NotesProvider } from '../contexts/notes'

const Container = styled('div', {
  minHeight: '100vh',
})

function MyApp({ Component, pageProps }: AppProps) {
  global()

  return (
    <>
      <Head>
        <title>note.me</title>
      </Head>

      <ThemeProvider>
        <AuthProvider>
          <NotesProvider>
            <Container
              className={'AppContainer'}
            >
              <Component {...pageProps} />
            </Container>
          </NotesProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}


export default MyApp
