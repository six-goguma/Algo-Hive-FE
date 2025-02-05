import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, { message: '이메일을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export type Login = z.infer<typeof LoginSchema>;
