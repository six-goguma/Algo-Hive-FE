import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Flex,
  Button,
  Text,
  Image,
  VStack,
  Avatar,
  Input,
  FormControl,
  Box,
} from '@chakra-ui/react';

import { Form, FormField } from '@shared/components';
import { useCustomToast } from '@shared/hooks';
import { authStorage } from '@shared/utils';

import { changeUserNickname, deleteUser } from '../../apis';
import { useGetProfile } from '../../hooks';
import { Mypage, MypageSchema } from '../../schema';
import { SkeletonProfileSection } from './SkeletonProfileSection';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

export const UserProfileSection = ({ isPending }: { isPending: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: userImgUrlData, isPending: userImgUrlPending } = useGetProfile();

  const { mutate: deleteUserData } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {},
  });
  const toast = useCustomToast();

  const initialNickname = authStorage.nickName.get();

  const form = useForm<Mypage>({
    resolver: zodResolver(MypageSchema),
    mode: 'onChange',
    defaultValues: {
      nickName: initialNickname,
      profileImage: '',
    },
  });

  const { mutate: changeNickname } = useMutation({
    mutationFn: changeUserNickname,
    onSuccess: (response) => {
      onSuccess(response.message);
    },
    onError: () => {
      onError();
    },
  });

  const onSubmit = (data: Mypage) => {
    changeNickname({ nickName: data.nickName });
    console.log(data.nickName);
  };

  const onSuccess = (updatedNickname: string) => {
    authStorage.nickName.set(updatedNickname);
    form.reset({ nickName: updatedNickname });

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

  const onClickDelete = () => {
    deleteUserData();
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
        {isPending && userImgUrlPending ? (
          <SkeletonProfileSection />
        ) : (
          <>
            <FormField
              name='nickName'
              control={form.control}
              render={({ field }) => (
                <>
                  <Flex w={{ base: 'full', sm: '128px' }} flexDir='column' align='center'>
                    {userImgUrlData?.url ? (
                      <Image src={userImgUrlData.url} boxSize={24} mb='16px' borderRadius='full' />
                    ) : (
                      <Avatar boxSize={24} mb='16px' h='auto' src='https://bit.ly/broken-link' />
                    )}
                    <Button w={{ base: '100px', sm: '110px' }} h='36px' fontSize='sm' mb='10px'>
                      이미지 업로드
                    </Button>
                    <Button
                      variant='outline'
                      bg='none'
                      border='none'
                      w={{ base: '80px', sm: '110px' }}
                      h='36px'
                      color='custom.blue'
                      fontSize='sm'
                      _hover={{}}
                    >
                      이미지 제거
                    </Button>
                  </Flex>

                  <Flex
                    w='full'
                    ml={{ base: '16px', sm: '30px' }}
                    justify='space-between'
                    align='center'
                  >
                    <VStack w='full' align='start' spacing={1}>
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
                            w='150px'
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
                          <Flex
                            bg='none'
                            border='none'
                            cursor='pointer'
                            w='full'
                            onClick={onClickEdit}
                          >
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
                    </VStack>
                    <Box alignItems='center' mb={3}>
                      <Button
                        display={{ base: 'none', md: 'flex' }}
                        variant='outline'
                        color='customGray.500'
                        borderColor='customGray.500'
                        w={{ base: '60px', sm: '80px' }}
                        h={{ base: '28px', sm: '32px' }}
                        fontSize='sm'
                        _hover={{}}
                        onClick={onClickDelete}
                      >
                        회원탈퇴
                      </Button>
                    </Box>
                  </Flex>
                </>
              )}
            />
          </>
        )}
      </Flex>
    </Form>
  );
};
