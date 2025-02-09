import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, VStack, Input, Button, Box, Text } from '@chakra-ui/react';

import { FormField, FormItem, FormMessage, FormControl, FormLabel } from '@shared/components/form';
import { ApiError, UnknownApiError } from '@shared/config';
import { useCustomToast } from '@shared/hooks';

import { sendEmailCodeApi } from '../../apis';
import { SIGNUP_DATA } from '../../data';
import { Signup } from '../../schema';
import { useMutation } from '@tanstack/react-query';

type EmailSectionProps = {
  name: 'nickName' | 'email' | 'password' | 'code';
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
};

export const EmailSection = ({ name, isValid, setIsValid }: EmailSectionProps) => {
  const form = useFormContext<Signup>();
  const { errors } = form.formState;

  const toast = useCustomToast();

  const [message, setMessage] = useState<string>('');

  const { mutate: sendEmailCode, isPending } = useMutation({
    mutationFn: sendEmailCodeApi,
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
      toastDescription: '인증번호가 전송되었습니다.',
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
    setMessage('이미 가입한 이메일입니다.');
    toast({
      toastStatus: 'error',
      toastTitle: '회원가입',
      toastDescription: '이미 가입한 이메일입니다.',
    });
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Box as='section' mb={4}>
            <FormLabel>
              <Flex mb={4} flexDir='column' gap={1}>
                <Text as='b' color='customGray.400'>
                  {SIGNUP_DATA.EMAIL.EMAIL_SUBTITLE}
                </Text>
                <Text fontSize='sm' color='customGray.400'>
                  {SIGNUP_DATA.EMAIL.EMAIL_RULE}
                </Text>
              </Flex>
            </FormLabel>
            <FormControl>
              <VStack spacing={4}>
                <Flex w='full' gap={3} alignItems='center'>
                  <Input
                    id='email'
                    fontSize='sm'
                    placeholder={SIGNUP_DATA.EMAIL.EMAIL_PLACEHOLDER}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsValid(false);
                      setMessage('');
                    }}
                  />
                  <Button
                    w='100px'
                    h={10}
                    disabled={!field.value || !!errors['email'] || isPending}
                    onClick={() =>
                      sendEmailCode({
                        email: form.getValues('email'),
                      })
                    }
                  >
                    {SIGNUP_DATA.EMAIL.EMAIL_BUTTON}
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
            <FormMessage>
              <Text color={isValid ? 'blue-500' : 'red-500'}>{message}</Text>
            </FormMessage>
          </Box>
        </FormItem>
      )}
    />
  );
};
