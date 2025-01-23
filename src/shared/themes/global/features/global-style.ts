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
      body: {
        fontFamily: `"Pretendard-Regular","Apple SD Gothic Neo", Sans-serif`,
        fontSize: 'md',
        bg: 'custom.gray',
        textAlign: 'center',
        width: '100vw',
        height: '100%',
        px: {
          base: '16px',
          xs: '16px',
          sm: '16px',
          md: '64px',
          lg: '270px',
        },
      },
    },
  },
  breakpoints: breakPoints,
};

export const globalStyle = extendTheme(config);
