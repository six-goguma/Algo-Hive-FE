import { Button } from '../common';
import { extendTheme } from '@chakra-ui/react';

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
      'html, body': {
        fontFamily: `"Pretendard-Regular","Apple SD Gothic Neo", Sans-serif`,
        fontSize: 'md',
        bg: 'custom.gray',
        textAlign: 'center',
        px: '150px',
      },
    },
  },
};

export const globalStyle = extendTheme(config);
