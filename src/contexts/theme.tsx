import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { lightTheme, theme } from '../../stitches.config';

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
  const [currentTheme, setCurrentTheme] = useState(theme);
  // @ts-ignore
  const toggleTheme = () => setCurrentTheme(currentTheme === lightTheme ? theme : lightTheme);

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
