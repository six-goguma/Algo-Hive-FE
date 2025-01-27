import {
  Flex,
  VStack,
  HStack,
  Divider,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from '@chakra-ui/react';

export const SkeletonPostCards = () => {
  return (
    <Flex
      w='290px'
      h='400px'
      bg='white'
      flexDir='column'
      boxShadow='5px 5px 20px 0px rgba(0, 0, 0, 0.10)'
    >
      <Skeleton w='full' h='430px' />
      <Flex w='full' h='full' flexDir='column' p={3} justifyContent='space-between'>
        <VStack w='full' mt={1} alignItems='start' spacing={4}>
          <SkeletonText w='100px' noOfLines={1} spacing={1} />
          <SkeletonText w='full' noOfLines={2} spacing={3} />
        </VStack>
        <HStack w='full' spacing={1} justifyContent='start' fontSize='sm' color='customGray.400'>
          <SkeletonText w='170px' noOfLines={1} />
        </HStack>
      </Flex>
      <Flex w='full' px={3} py={1}>
        <Divider />
      </Flex>
      <Flex w='full' px={3} py={3} alignItems='center' justifyContent='space-between' fontSize='xs'>
        <HStack spacing={2}>
          <SkeletonCircle size='7' />
          <SkeletonText w='70px' noOfLines={1} />
        </HStack>
        <HStack alignItems='center' spacing={1}>
          <SkeletonText w='40px' noOfLines={1} />
        </HStack>
      </Flex>
    </Flex>
  );
};
