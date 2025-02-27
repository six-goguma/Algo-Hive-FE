import { useForm } from 'react-hook-form';

import { UpdateNickname, UpdateNicknameSchema } from '@pages/mypage/schema';

import { Form } from '@shared/components';

import { zodResolver } from '@hookform/resolvers/zod';

export const NicknameSection = () => {
  const nickName = 'nickname';
  const form = useForm<UpdateNickname>({
    resolver: zodResolver(UpdateNicknameSchema),
    defaultValues: {
      nickName: nickName,
    },
  });
  return (
    <Form {...form}>
      <h1>NicknameSection</h1>
    </Form>
  );
};
