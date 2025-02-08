import { z } from 'zod';

export const MypageSchema = z.object({
  nickName: z
    .string()
    .min(3, { message: '닉네임은 3자 이상 입력해야합니다.' })
    .min(1, { message: '닉네임을 입력해주세요.' }),
  profileImage: z.string(),
});

export type Mypage = z.infer<typeof MypageSchema>;
