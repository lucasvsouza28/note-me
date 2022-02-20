import { createContext, useContext, useState, ReactNode } from 'react'

type ThemeContextType = {
  currentTheme: any;
  setCurrentTheme: (theme: any) => void;
  toggleTheme: () => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  loadingValue: number;
  setLoadingValue: (value: number) => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function useTheme(){
  return useContext(ThemeContext);
}
