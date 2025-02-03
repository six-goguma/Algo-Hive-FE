import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const SkeletonProfileSection = () => {
  return (
    <Flex
      w='full'
      h={{ base: 'auto', sm: '210px' }}
      mt='30px'
      align='flex-start'
      px={{ base: '30px', sm: '80px' }}
    >
      <Flex w={{ base: 'full', sm: '128px' }} flexDir='column' align='center'>
        <SkeletonCircle boxSize={24} mb='16px' />

        <Skeleton w={{ base: '80px', sm: '110px' }} h='36px' mb='10px' />
        <Skeleton bg='none' border='none' w={{ base: '80px', sm: '110px' }} h='36px' />
      </Flex>
      <Flex
        w={{ base: 'full', sm: '150px' }}
        flexDir='column'
        ml={{ base: '16px', sm: '30px' }}
        align='flex-start'
      >
        <SkeletonText w='150px' mb='6px' mt='10px' />
        <Skeleton w='70px' h='16px' />
      </Flex>

      <Flex w='full' justify='flex-end' mt={{ base: '80px', sm: '0' }}>
        <Skeleton w={{ base: '40px', sm: '80px' }} h={{ base: '28px', sm: '32px' }} />
      </Flex>
    </Flex>
  );
};
