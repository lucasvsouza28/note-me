import { createStitches } from '@stitches/react'

export const {
  createTheme,
  styled,
  globalCss,
  theme,
} = createStitches({
  theme: {
    colors: {
      gray300: '#8C8A97',
      gray400: '#808080',
      gray600: '#4D4D4D ',
      gray800: '#343539',
      gray900: '#000000',

      semantic_green: '#30C58D',
      semantic_red: '#F7685C',

      opaque_light_yellow: 'rgba(251, 235, 149, 0.4)',
      opaque_red_orange: 'rgba(253, 186, 163, 0.4)',
      opaque_lilac: 'rgba(182, 165, 203, 0.4);',
      opaque_green_cyan: 'rgba(151, 210, 188, 0.6)' ,
      opaque_light_cyan: 'rgba(174, 223, 232, 0.6)',

      rose: '#FDBAA3',

      white: '#FFF',
      white_cream: '#FFFDFA',

      midnight: '#3C3D43',

      bg_color: '$gray800',
      bg_sidebar: '$midnight',
      bg_loader: '$rose',
      bg_loader_value: '$midnight',

      text_primary: '$white',
    },

    radii: {
      8: '8px',
    }
  },
});

export const global = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  body:{
    fontFamily: 'Ubuntu',
  }
})

export const lightTheme = createTheme({
  colors: {
    bg_color: '$white',
    bg_sidebar: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
    bg_loader: '$gray800',
    bg_loader_value: '$rose',

    text_primary: '$gray900',
  }
});
