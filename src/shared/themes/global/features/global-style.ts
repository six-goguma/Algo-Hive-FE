import { extendTheme } from '@chakra-ui/react';

import { breakPoints } from '@shared/styles';

import { Button } from '../common';

const config = {
  useSystemColorMode: true,
  initialColorMode: 'light',
  colors: {
    custom: {
      gray: '#F7F9FB',
      blue: '#0076BF',
    },
    customGray: {
      100: '#F7F9FB',
      200: '#EEEEEE',
      300: '#DEE2E6',
      400: '#8B939B',
      500: '#868E96',
    },
  },
  components: {
    Button,
  },
  styles: {
    global: {
      '@font-face': {
        fontFamily: 'Pretendard-Regular',
        src: `url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')`,
        fontStyle: 'normal',
      },
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      root: {
        width: '100vw',
        height: '100%',
      },
      body: {
        bg: 'custom.gray',
        color: 'black',
        textAlign: 'center',

        fontFamily: `"Pretendard-Regular","Apple SD Gothic Neo", Sans-serif`,
        fontSize: 'md',
        px: {
          base: '16px',
          sm: '16px',
          md: '16px',
          lg: '64px',
          xl: '270px',
        },
      },
    },
  },
  breakpoints: breakPoints,
};

export const globalStyle = extendTheme(config);
