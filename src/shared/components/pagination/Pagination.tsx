import { HStack, IconButton, Button } from '@chakra-ui/react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type PaginationProps = {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  first: boolean;
  last: boolean;
  numberOfElements: number;
};

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  first,
  last,
}: PaginationProps) => {
  const PAGE_GROUP_SIZE = 5;

  const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const onClickPrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - PAGE_GROUP_SIZE);
    }
  };

  const onClickNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1);
    }
  };

  const onClickPageNumber = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <HStack spacing={3} justify='center' mt={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        h={10}
        aria-label='Previous group'
        onClick={onClickPrevGroup}
        variant='outline'
        border='none'
        bg='none'
        _hover={{ bg: 'custom.blue', color: 'white' }}
        isDisabled={first || startPage === 1}
      />

      <HStack spacing={1}>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <Button
            key={startPage + i}
            h={10}
            border='none'
            borderRadius='full'
            color={currentPage === startPage + i ? 'white' : 'customGray.400'}
            bg={currentPage === startPage + i ? 'custom.blue' : 'none'}
            _hover={{ bg: 'custom.blue', color: 'white' }}
            onClick={() => onClickPageNumber(startPage + i)}
            colorScheme={currentPage === startPage + i ? 'blue' : 'gray'}
            variant={currentPage === startPage + i ? 'solid' : 'outline'}
          >
            {startPage + i}
          </Button>
        ))}
      </HStack>

      <IconButton
        icon={<ChevronRightIcon />}
        h={10}
        variant='outline'
        border='none'
        bg='none'
        _hover={{ bg: 'custom.blue', color: 'white' }}
        aria-label='Next group'
        onClick={onClickNextGroup}
        isDisabled={last || endPage === totalPages}
      />
    </HStack>
  );
};
