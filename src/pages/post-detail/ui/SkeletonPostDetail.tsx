import { Flex, HStack, Skeleton, SkeletonText } from '@chakra-ui/react';

export const SkeletonPostDetail = () => {
  return (
    <Flex w='full' flexDirection='column' alignItems='center' mt={10} p={5}>
      <SkeletonText w='80%' noOfLines={1} skeletonHeight='36px' mb={5} alignSelf='start' />

      <HStack w='full' justifyContent='space-between'>
        <HStack spacing={2}>
          <SkeletonText skeletonHeight='20px' w='70px' noOfLines={1} />
          <SkeletonText skeletonHeight='20px' w='100px' noOfLines={1} />
        </HStack>
        <HStack spacing={3} mr={2}>
          <Skeleton w='60px' h='30px' />
          <Skeleton w='60px' h='30px' />
        </HStack>
      </HStack>

      <HStack w='full' justifyContent='space-between'>
        <HStack spacing={2} w='full' mt={5}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} w='60px' h='20px' />
          ))}
        </HStack>
        <HStack spacing={5} w='full' justify='flex-end' mt={3}>
          <Skeleton w='90px' h='30px' />
        </HStack>
      </HStack>

      <Flex w='full' my={10} textAlign='start'>
        <SkeletonText w='full' noOfLines={25} spacing={4} />
      </Flex>
    </Flex>
  );
};
