import { VStack, Skeleton, SkeletonText, Box } from '@chakra-ui/react';

export const SkeletonPostEditPage = () => {
  return (
    <VStack w='full' py='20px' px='30px' gap='4' align='start' bg='white'>
      <Skeleton height='40px' width='80%' borderRadius='5px' mt={10} />
      <Skeleton height='40px' width='40%' borderRadius='5px' />
      <Box w='full'>
        <SkeletonText noOfLines={50} spacing='4' skeletonHeight='16px' />
      </Box>
      <Skeleton height='50px' width='120px' borderRadius='5px' />
    </VStack>
  );
};
