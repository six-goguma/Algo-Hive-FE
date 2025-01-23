import { HStack, Skeleton, Text } from '@chakra-ui/react';

import { ClockIcon, Heart } from 'lucide-react';

type TabsProps = {
  isPending: boolean;
};

export const Tabs = ({ isPending }: TabsProps) => {
  return (
    <HStack w='full' spacing={0} py={8} color='customGray.400'>
      {isPending ? (
        <Skeleton w='160px' h={10} />
      ) : (
        <>
          <HStack
            cursor='pointer'
            spacing={2}
            px={2}
            py={2}
            borderBottom='2px'
            _active={{ color: 'custom.blue' }}
            _hover={{ color: 'custom.blue' }}
          >
            <ClockIcon size={20} />
            <Text as='b'>최신</Text>
          </HStack>
          <HStack
            spacing={2}
            px={2}
            py={2}
            cursor='pointer'
            borderBottom='2px'
            _active={{ color: 'custom.blue' }}
            _hover={{ color: 'custom.blue' }}
          >
            <Heart size={20} />
            <Text as='b'>좋아요</Text>
          </HStack>
        </>
      )}
    </HStack>
  );
};
