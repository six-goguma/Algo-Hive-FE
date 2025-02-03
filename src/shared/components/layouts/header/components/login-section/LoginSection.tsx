import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Flex, Input, Text, VStack, Button, FormErrorMessage } from '@chakra-ui/react';

import { CircleXIcon } from 'lucide-react';

import { useCustomToast } from '@shared/hooks';
import { authStorage } from '@shared/utils';

import { loginApi } from '../../apis';
import { LOGIN_DATA } from '../../data';
import { Login, LoginSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

type LoginSectionProps = {
  setIsLogin: (isLogin: boolean) => void;
  onClose: () => void;
};

export const LoginSection = ({ setIsLogin, onClose }: LoginSectionProps) => {
  const [message, setMessage] = useState<string>('');

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setIsLogin(true);
      authStorage.isLogin.set(true);
      authStorage.nickName.set(data.nickName);
      onSuccess(data.message);
      onClose();
    },

    onError: (error) => {
      console.error('로그인 실패: ', error);
    },
  });

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    // mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(
    (values) => {
      login(values);
      setMessage('');
    },
    (errors) => {
      const errorMessage = Object.values(errors).flatMap((error) => error.message)[0] || '';
      setMessage(errorMessage);
    },
  );

  const toast = useCustomToast();

  const onSuccess = (message?: string) => {
    toast({
      toastStatus: 'success',
      toastTitle: '로그인',
      toastDescription: message || '로그인에 성공했습니다.',
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Flex mb={4}>
        <Text as='b' color='customGray.400'>
          {LOGIN_DATA.MODAL_SUBTITLE}
        </Text>
      </Flex>
      <VStack spacing={4}>
        <Input
          {...form.register('email')}
          id='email'
          fontSize='sm'
          placeholder={LOGIN_DATA.EMAIL_PLACEHOLDER}
        />
        <Input
          {...form.register('password')}
          id='password'
          type='password'
          fontSize='sm'
          placeholder={LOGIN_DATA.PASSWORD_PLACEHOLDER}
        />
        <Button
          disabled={isPending}
          type='submit'
          w='full'
          h='40px'
          px='auto'
          colorScheme='custom.blue'
        >
          로그인
        </Button>
        <FormErrorMessage>
          <CircleXIcon size='20px' color='#E53E3E' />
          <Text fontSize='sm' fontWeight='600' color='red.500'>
            {message}
          </Text>
        </FormErrorMessage>
        {/* <ErrorMessage message={message} /> */}
      </VStack>
    </form>
  );
};
