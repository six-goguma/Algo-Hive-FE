import { z } from 'zod';

export const MypageSchema = z.object({
  nickName: z
    .string()
    .min(3, { message: '닉네임은 3자 이상 입력해야합니다.' })
    .min(1, { message: '닉네임을 입력해주세요.' }),
  profileImage: z.string(),
});

export const UpdateNicknameSchema = z.object({
  nickName: z
    .string()
    .min(3, { message: '닉네임은 3자 이상 입력해야합니다.' })
    .min(1, { message: '닉네임을 입력해주세요.' }),
});

export type UpdateNickname = z.infer<typeof UpdateNicknameSchema>;

export const UpdateProfileImageSchema = z.object({
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size < 5000000, {
      message: '프로필 이미지는 5MB 이하만 업로드할 수 있습니다.',
    })
    .refine((file) => !!file.name, {
      message: '프로필 이미지를 선택해주세요.',
    })
    .optional(),
});

export type UpdateProfileImage = z.infer<typeof UpdateProfileImageSchema>;

export type Mypage = z.infer<typeof MypageSchema>;
