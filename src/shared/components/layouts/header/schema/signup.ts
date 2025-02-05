import { z } from 'zod';

export const SignupSchema = z.object({
  nickName: z
    .string()
    .min(3, { message: '닉네임은 3자 이상 입력해야합니다.' })
    .min(1, { message: '닉네임을 입력해주세요.' }),
  email: z
    .string()
    .email({ message: '이메일 형식이 올바르지 않습니다.' })
    .min(1, { message: '이메일을 입력해주세요.' }),
  confirmPassword: z.string(),
  password: z
    .string()
    .min(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
    .max(20, { message: '비밀번호는 20자 이하이어야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{8,20}$/, {
      message: '비밀번호는 영문, 숫자, 특수문자를 혼용하여 설정해야 합니다.',
    }),
  code: z.string().min(1, { message: '인증번호를 입력해주세요.' }),
});

export type Signup = z.infer<typeof SignupSchema>;
