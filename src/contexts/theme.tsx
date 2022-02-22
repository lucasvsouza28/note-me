import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

type ThemeContextType = {
  currentTheme: any;
  setCurrentTheme: (theme: any) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function useTheme(){
  return useContext(ThemeContext);
}
