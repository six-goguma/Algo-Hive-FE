import { Flex } from '@chakra-ui/react';

type Props = {
  maxWidth?: string;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
  ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container = ({
  children,
  maxWidth,
  flexDirection,
  justifyContent,
  alignItems,
  ref,
  ...props
}: Props) => {
  return (
    <Flex
      className='wrapper'
      w='full'
      justifyContent={justifyContent}
      alignItems={alignItems}
      ref={ref}
      {...props}
    >
      <Flex
        className='inner'
        w='full'
        maxW={maxWidth ?? { base: '100%', md: '1024px' }}
        flexDirection={flexDirection ?? 'column'}
        justifyContent={justifyContent ?? 'flex-start'}
        alignItems={alignItems ?? 'flex-start'}
      >
        {children}
      </Flex>
    </Flex>
  );
};
