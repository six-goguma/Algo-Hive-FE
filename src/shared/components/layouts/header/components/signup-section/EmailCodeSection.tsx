import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';

import { FormControl, FormField, FormItem, FormMessage } from '@shared/components';
import { ApiError, UnknownApiError } from '@shared/config';
import { useCustomToast } from '@shared/hooks';

import { verifyEmailApi } from '../../apis';
import { SIGNUP_DATA } from '../../data';
import { Signup } from '../../schema';
import { useMutation } from '@tanstack/react-query';

type EmailCodeSectionProps = {
  name: 'nickName' | 'email' | 'password' | 'code';
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
};

export const EmailCodeSection = ({ name, isValid, setIsValid }: EmailCodeSectionProps) => {
  const form = useFormContext<Signup>();
  const { errors } = form.formState;

  const toast = useCustomToast();

  const [message, setMessage] = useState<string>('');

  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: verifyEmailApi,
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
      toastDescription: '이메일 인증이 완료되었습니다.',
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

    setMessage('인증번호가 일치하지 않습니다.');
    toast({
      toastStatus: 'error',
      toastTitle: '회원가입',
      toastDescription: '인증번호가 일치하지 않습니다.',
    });
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Box as='section' mb={5}>
            <FormControl>
              <VStack spacing={4}>
                <Flex w='full' gap={3} alignItems='center'>
                  <Input
                    id='email'
                    fontSize='sm'
                    placeholder={SIGNUP_DATA.EMAIL.VERIFICATION_CODE_PLACEHOLDER}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsValid(false);
                      setMessage('');
                    }}
                  />
                  <Button
                    w='100px'
                    h={10}
                    disabled={!field.value || !!errors['code'] || isPending}
                    onClick={() =>
                      verifyEmail({
                        email: form.getValues('email'),
                        code: form.getValues('code'),
                      })
                    }
                  >
                    {SIGNUP_DATA.EMAIL.VERIFICATION_CODE_BUTTON}
                  </Button>
                </Flex>
              </VStack>
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
