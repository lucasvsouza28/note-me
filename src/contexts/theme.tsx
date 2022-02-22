import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import { lightTheme, theme } from '../../stitches.config';
import usePersistentState from '../hooks/persistentState';

type ThemeContextType = {
  currentTheme: any;
  setCurrentTheme: (theme: any) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

type ThemeProviderProps = {
  children: ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps){
  const [currentThemeName, setCurrentThemeName] = usePersistentState('ThemeContext#currentThemeName', theme.className)
  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => {
    // @ts-ignore
    const themes: {[key: string]: typeof theme} = {
      [theme.className]: theme,
      [lightTheme.className]: lightTheme,
    }

    setCurrentTheme(themes[currentThemeName] as typeof theme);
  }, [currentThemeName])

  const toggleTheme = () => setCurrentThemeName(currentTheme === theme ? lightTheme.className : theme.className);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(){
  return useContext(ThemeContext);
}
