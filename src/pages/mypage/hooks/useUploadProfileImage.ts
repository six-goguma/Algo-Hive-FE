import { useState } from 'react';

import { useCustomToast } from '@shared/hooks';
import { queryClient } from '@shared/lib';
import { BASE_URI, SERVER_URI } from '@shared/service';
import { authStorage } from '@shared/utils';

import { profilePath } from '../apis';

export const useUploadProfileImage = () => {
  const toast = useCustomToast();
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<File | null> => {
    if (file.size > 2 * 1024 * 1024) {
      toast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '이미지 크기는 2MB 이하만 가능합니다.',
      });
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await fetch(`${BASE_URI}/mypage/profile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('파일 업로드 실패');

      const data = await response.json();
      const uploadedUrl = `${SERVER_URI}${data.url}`;

      authStorage.profile.set(uploadedUrl);

      queryClient.invalidateQueries({ queryKey: profilePath });

      const blob = await (await fetch(uploadedUrl)).blob();
      return new File([blob], 'profileImage', { type: blob.type });
    } catch {
      toast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '이미지를 업로드하는 중 오류가 발생했습니다.',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};
