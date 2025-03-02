import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Flex, FormControl, Input, Text, VStack } from '@chakra-ui/react';

import { Form, FormField } from '@shared/components';
import { useCustomToast } from '@shared/hooks';
import { authStorage } from '@shared/utils';

import { changeUserNickname, deleteUser } from '../../apis';
import { UpdateNickname, UpdateNicknameSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

export const NicknameSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickName, setNickName] = useState(authStorage.nickName.get() || '');

  const { mutate: changeNickname } = useMutation({
    mutationFn: changeUserNickname,
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      onError();
    },
  });

  const form = useForm<UpdateNickname>({
    resolver: zodResolver(UpdateNicknameSchema),
    mode: 'onChange',
    defaultValues: {
      nickName: nickName,
    },
  });

  const toast = useCustomToast();

  const onSuccess = () => {
    toast({
      toastStatus: 'success',
      toastTitle: '마이페이지',
      toastDescription: '닉네임이 변경되었습니다.',
    });

    setIsEditing(false);
  };

  const onError = () => {
    toast({
      toastStatus: 'error',
      toastTitle: '마이페이지',
      toastDescription: '닉네임 변경에 실패했습니다.',
    });
  };

  const onClickEdit = () => {
    setIsEditing(!isEditing);
    form.reset();
  };

  const { mutate: deleteUserData } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast({
        toastStatus: 'success',
        toastTitle: '마이페이지',
        toastDescription: '회원탈퇴가 완료되었습니다.',
      });
    },
    onError: () => {
      toast({
        toastStatus: 'error',
        toastTitle: '마이페이지',
        toastDescription: '회원탈퇴를 실패하였습니다.',
      });
    },
  });

  const onClickDelete = () => {
    deleteUserData();
  };

  const onSubmit = (data: UpdateNickname) => {
    changeNickname({ nickName: data.nickName });
    authStorage.nickName.set(data.nickName);
    setNickName(data.nickName);

    form.reset({ nickName: data.nickName });
  };

  return (
    <Form {...form}>
      <Flex
        as='form'
        width='full'
        maxW={{ base: 'full', sm: '1000px' }}
        h={{ base: 'auto', sm: '210px' }}
        mt='30px'
        align='flex-start'
        px={{ base: '0', sm: '40px' }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name='nickName'
          control={form.control}
          render={({ field }) => (
            <FormControl>
              {isEditing ? (
                <Flex
                  gap='8px'
                  flexDir={{ base: 'column', sm: 'row' }}
                  mb='6px'
                  mt='10px'
                  align={{ base: 'start', sm: 'center' }}
                >
                  <Input
                    w='150px'
                    h='36px'
                    fontSize='sm'
                    fontWeight='700'
                    bg='white'
                    {...field}
                    value={field.value}
                  />
                  <Button type='submit' colorScheme='blue' size='sm'>
                    수정 완료
                  </Button>
                </Flex>
              ) : (
                <Text
                  w='200px'
                  textAlign='left'
                  fontSize='20px'
                  fontWeight='Bold'
                  mb='6px'
                  mt='10px'
                >
                  {form.watch('nickName')}
                </Text>
              )}
              {!isEditing && (
                <Flex bg='none' border='none' cursor='pointer' w='full' onClick={onClickEdit}>
                  <VStack spacing={12} w='full' align='start'>
                    <Text
                      fontSize='sm'
                      fontWeight='Bold'
                      lineHeight='16px'
                      textAlign='center'
                      color='custom.blue'
                      textDecoration='underline'
                    >
                      닉네임 수정
                    </Text>
                    <Box alignItems='center' mb={3}>
                      <Button
                        display={{ base: 'flex', md: 'none' }}
                        variant='outline'
                        color='customGray.500'
                        borderColor='customGray.500'
                        w='80px'
                        h='32px'
                        fontSize='sm'
                        _hover={{}}
                        onClick={onClickDelete}
                      >
                        회원탈퇴
                      </Button>
                    </Box>
                  </VStack>
                </Flex>
              )}
            </FormControl>
          )}
        />
      </Flex>
    </Form>
  );
};
