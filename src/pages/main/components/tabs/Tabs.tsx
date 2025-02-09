import { HStack, Text, Box } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { ClockIcon, Heart } from 'lucide-react';

type TabsProps = {
  activeTab: 'createdAt' | 'likeCount';
  setActiveTab: (activeTab: 'createdAt' | 'likeCount') => void;
};

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <HStack w='full' spacing={0} py={8} position='relative'>
      <HStack
        cursor='pointer'
        spacing={2}
        px={2}
        py={2}
        as={motion.div}
        transition='color 0.2s ease-in-out'
        color={activeTab === 'createdAt' ? 'custom.blue' : 'customGray.500'}
        onClick={() => setActiveTab('createdAt')}
      >
        <ClockIcon size={20} />
        <Text as='b'>최신</Text>
      </HStack>
      <HStack
        cursor='pointer'
        spacing={2}
        px={2}
        py={2}
        transition='color 0.2s ease-in-out'
        color={activeTab === 'likeCount' ? 'custom.blue' : 'customGray.500'}
        onClick={() => setActiveTab('likeCount')}
      >
        <Heart size={20} />
        <Text as='b'>좋아요</Text>
      </HStack>

      <Box
        as={motion.div}
        mx={activeTab === 'createdAt' ? '9px' : '4px'}
        layout
        position='absolute'
        bottom='30'
        h='2px'
        w={activeTab === 'createdAt' ? '55px' : '70px'}
        left={activeTab === 'createdAt' ? '0px' : '75px'}
        bg='custom.blue'
      />
    </HStack>
  );
};
