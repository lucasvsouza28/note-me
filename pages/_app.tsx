import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { ThemeContext } from '../contexts/theme'
import { global, styled, theme, lightTheme } from '../stitches.config'

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingValue, setLoadingValue] = useState(50);

  useEffect(() => {
    if (loadingValue >= 100) setIsLoading(false);
  }, [loadingValue, setIsLoading])


  const Container = styled('div', {
    fontFamily: 'Ubuntu',
    color: '$text_primary',

    background: '$bg_color',
    minHeight: '100vh',
  })

  const toggleTheme = () => {
    // @ts-ignore
    setCurrentTheme(currentTheme === lightTheme ? theme : lightTheme);
  }

  global()

  return (
    <>
      <Head>
        <title>note.me</title>
      </Head>

      <ThemeContext.Provider
        value={{
          currentTheme, setCurrentTheme,
          isLoading, setIsLoading,
          loadingValue, setLoadingValue,
          toggleTheme
        }}
      >
        <Container
          className={'AppContainer ' + currentTheme}
        >
          { isLoading && <Loading /> }

          <Component {...pageProps} />
        </Container>
      </ThemeContext.Provider>
    </>
  )
}


export default MyApp
