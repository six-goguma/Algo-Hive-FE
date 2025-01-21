import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
  },
  sizes: {
    md: {
      h: '26px',
      fontSize: 'md',
      px: '10px',
    },
  },
  variants: {
    default: {
      bg: 'custom.blue',
      color: 'white',
      _hover: {
        bg: 'white',
        color: 'custom.blue',
        border: '1px solid',
        borderColor: 'custom.blue',
      },
    },
    outline: {
      bg: 'white',
      color: 'custom.blue',
      border: '1.5px solid',
      borderColor: 'custom.blue',
      _hover: {
        bg: 'custom.blue',
        color: 'white',
        border: '1px solid',
        borderColor: 'custom.blue',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'default',
  },
});