import { Flex, Skeleton, HStack } from '@chakra-ui/react';

export const ButtonSkeleton = () => {
  return (
    <Flex w='full' justifyContent='space-between' py={8}>
      <Skeleton w='160px' h={10} />
      <HStack spacing={5}>
        <Skeleton w='100px' h={10} />
        <Skeleton w='80px' h={10} />
      </HStack>
    </Flex>
  );
};
