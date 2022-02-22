import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react';
import { ThemeContext } from '../contexts/theme'
import { global, styled, theme, lightTheme } from '../../stitches.config'

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const Container = styled('div', {
    fontFamily: 'Ubuntu',
    color: '$text_primary',

    background: '$bg_color',
    minHeight: '100vh',
  })

  // @ts-ignore
  const toggleTheme = () => setCurrentTheme(currentTheme === lightTheme ? theme : lightTheme);

  global()

  return (
    <>
      <Head>
        <title>note.me</title>
      </Head>

      <ThemeContext.Provider
        value={{
          currentTheme, setCurrentTheme,
          toggleTheme
        }}
      >
        <Container
          className={'AppContainer ' + currentTheme}
        >
          <Component {...pageProps} />
        </Container>
      </ThemeContext.Provider>
    </>
  )
}


export default MyApp
