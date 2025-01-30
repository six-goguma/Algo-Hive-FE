import { Flex, Skeleton, HStack, useBreakpointValue } from '@chakra-ui/react';

export const ButtonSkeleton = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex w='full' justifyContent='space-between' py={8}>
      <Skeleton w='160px' h={10} />
      {!isMobile ? (
        <HStack spacing={5}>
          <Skeleton w='100px' h={10} />
          <Skeleton w='80px' h={10} />
        </HStack>
      ) : (
        <Flex justifyContent='center' align='center'>
          <Skeleton w='25px' h={6} />
        </Flex>
      )}
    </Flex>
  );
};
