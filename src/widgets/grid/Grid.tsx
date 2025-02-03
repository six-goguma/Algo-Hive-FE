import { SimpleGrid } from '@chakra-ui/react';

import { breakPoints } from '@shared/styles';

type ResponseGridStyle = {
  [key in keyof typeof breakPoints]?: number;
};

type Props = {
  columns: number | ResponseGridStyle;
  gap?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Grid = ({ children, columns, gap, ...props }: Props) => {
  return (
    <SimpleGrid cursor='pointer' columns={columns} spacing={`${gap}px`} {...props}>
      {children}
    </SimpleGrid>
  );
};
