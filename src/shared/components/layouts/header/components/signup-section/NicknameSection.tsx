import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, Box, VStack, Button, Text, Input, FormControl } from '@chakra-ui/react';

import { FormField, FormItem, FormLabel, FormMessage } from '@shared/components';
import { ApiError, UnknownApiError } from '@shared/config';
import { useCustomToast } from '@shared/hooks';

import { checkNicknameApi } from '../../apis';
import { SIGNUP_DATA } from '../../data';
import { Signup } from '../../schema';
import { useMutation } from '@tanstack/react-query';

type NicknameSectionProps = {
  name: 'nickName' | 'email' | 'password' | 'code';
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
};

export const NicknameSection = ({ name, isValid, setIsValid }: NicknameSectionProps) => {
  const form = useFormContext<Signup>();

  const { errors } = form.formState;
  const toast = useCustomToast();

  const [message, setMessage] = useState<string>('');

  const { mutate: checkNickname, isPending } = useMutation({
    mutationFn: checkNicknameApi,
    onSuccess: (data) => {
      onSuccess(data.message);
    },
    onError: (error: Error) => {
      onErrorLogin(error);
    },
  });

  const onSuccess = (message: string) => {
    setIsValid(true);
    setMessage(message);

    toast({
      toastStatus: 'success',
      toastTitle: '회원가입',
      toastDescription: '사용 가능한 닉네임입니다.',
    });
  };

  const onErrorLogin = (error: Error) => {
    if (error instanceof ApiError) {
      const { code, message } = error;
      if (code === 409) {
        setMessage(message);

        return;
      }
    }

    if (error instanceof UnknownApiError) {
      setMessage('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
    setMessage('이미 사용중인 닉네임입니다.');
    toast({
      toastStatus: 'error',
      toastTitle: '회원가입',
      toastDescription: '이미 사용중인 닉네임입니다.',
    });
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Box as='section' mb={5}>
            <FormLabel>
              <Flex mb={4} flexDir='column' gap={1}>
                <Text as='b' color='customGray.400'>
                  {SIGNUP_DATA.NICKNAME.NICKNAME_SUBTITLE}
                </Text>
                <Text fontSize='sm' color='customGray.400'>
                  {SIGNUP_DATA.NICKNAME.NICKNAME_RULE}
                </Text>
              </Flex>
            </FormLabel>
            <FormControl>
              <VStack spacing={4}>
                <Flex w='full' gap={3} alignItems='center'>
                  <Input
                    id='nickname'
                    name={name}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsValid(false);
                      setMessage('');
                    }}
                    placeholder={SIGNUP_DATA.NICKNAME.NICKNAME_PLACEHOLDER}
                  />
                  <Button
                    type='button'
                    w='100px'
                    h={10}
                    disabled={!field.value || !!errors['nickName'] || isPending}
                    onClick={() =>
                      checkNickname({
                        nickName: form.getValues('nickName'),
                      })
                    }
                  >
                    {SIGNUP_DATA.NICKNAME.NICKNAME_BUTTON}
                  </Button>
                </Flex>
              </VStack>
              <FormMessage pl={2} />
              {message && (
                <Text color={isValid ? 'blue.600' : 'red.600'} pl={2} fontSize='sm'>
                  {message}
                </Text>
              )}
            </FormControl>
          </Box>
        </FormItem>
      )}
    />
  );
};
