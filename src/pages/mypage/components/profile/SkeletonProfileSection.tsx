import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const SkeletonProfileSection = () => {
  return (
    <Flex
      w='full'
      maxW={{ base: 'full', sm: '1000px' }}
      h={{ base: 'auto', sm: '210px' }}
      align='flex-start'
      px={{ base: '10px', sm: '0' }}
    >
      <Flex w={{ base: 'full', sm: '128px' }} flexDir='column' align='center'>
        <SkeletonCircle boxSize={24} mb='16px' />
        <Skeleton w={{ base: '100px', sm: '110px' }} h='36px' mb='10px' />
        <Skeleton w={{ base: '80px', sm: '110px' }} h='36px' />
      </Flex>

      <Flex
        w={{ base: 'full', sm: 'full' }}
        ml={{ base: '16px', sm: '30px' }}
        justify='space-between'
      >
        <Flex flexDir='column' w='full' mt={3}>
          <SkeletonText noOfLines={1} w='150px' mb='6px' mt='10px' />
          <SkeletonText noOfLines={1} w='80px' />
        </Flex>

        <Flex align='center' mb={4} mt={3}>
          <Skeleton w={{ base: '60px', sm: '80px' }} h={{ base: '28px', sm: '32px' }} />
        </Flex>
      </Flex>
    </Flex>
  );
};
