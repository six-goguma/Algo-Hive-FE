import { useCustomToast } from '@shared/hooks';

import { updateProfileImage } from '../apis';
import { useMutation } from '@tanstack/react-query';

export const useUpdateProfileImage = () => {
  const toast = useCustomToast();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      toast({
        toastStatus: 'success',
        toastTitle: '프로필 변경',
        toastDescription: '프로필 이미지가 성공적으로 변경되었습니다.',
      });
    },
    onError: () => {
      toast({
        toastStatus: 'error',
        toastTitle: '프로필 변경 실패',
        toastDescription: '프로필 이미지를 변경하는 중 오류가 발생했습니다.',
      });
    },
  });
};
