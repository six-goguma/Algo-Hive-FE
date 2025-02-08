import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Flex, Input, Text, VStack, Button, InputGroup, InputRightElement } from '@chakra-ui/react';

import { EyeClosedIcon, EyeIcon } from 'lucide-react';

import { ErrorMessage } from '@shared/components/error';
import { ApiError, UnknownApiError } from '@shared/config';
import { useCustomToast } from '@shared/hooks';
import { authStorage } from '@shared/utils';

import { loginApi, ResponseLoginApi } from '../../apis';
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      onSuccess(data);
    },

    onError: (error) => {
      console.error('로그인 실패: ', error);
      onErrorLogin(error);
    },
  });

  const toast = useCustomToast();

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
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

  const onSuccess = (data: ResponseLoginApi) => {
    setIsLogin(true);

    authStorage.isLogin.set(true);
    authStorage.nickName.set(data.nickName);
    authStorage.email.set(form.getValues('email'));

    toast({
      toastStatus: 'success',
      toastTitle: '로그인',
      toastDescription: '로그인에 성공했습니다.',
    });

    onClose();
  };

  const onErrorLogin = (error: Error) => {
    if (error instanceof ApiError) {
      const { code, message } = error;
      if (code === 400 || code === 401) {
        setMessage(message);

        return;
      }
    }

    if (error instanceof UnknownApiError) {
      setMessage('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }

    toast({
      toastStatus: 'error',
      toastTitle: '로그인 실패',
      toastDescription: message || error.message,
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
        <InputGroup>
          <Input
            {...form.register('password')}
            id='password'
            type={showPassword ? 'text' : 'password'}
            fontSize='sm'
            placeholder={LOGIN_DATA.PASSWORD_PLACEHOLDER}
          />
          <InputRightElement>
            <Button
              bg='none'
              border='none'
              _hover={{}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <EyeIcon color='gray' /> : <EyeClosedIcon color='gray' />}
            </Button>
          </InputRightElement>
        </InputGroup>
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
        <ErrorMessage message={message} />
      </VStack>
    </form>
  );
};
