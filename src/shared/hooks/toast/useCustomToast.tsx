// import { useToast } from '@chakra-ui/react';
import { toaster } from '@shared/components';

type UseCustomToastProps = {
  toastTitle: string;
  toastDescription: string;
};

export const useCustomToast = () => {
  // const toast = useToast();

  /**
   * 아래 customToast는 사용예시입니다.
   * customToast({
      toastStatus: 'success', -> 'success', 'error', 'warning', 'info' 중 선택
      toastTitle: '성공!', -> Toast의 제목
      toastDescription: '작업이 성공적으로 완료되었습니다.', -> Toast의 내용
    });
   * 
   */
  const customToast = ({ toastTitle, toastDescription }: UseCustomToastProps) => {
    toaster.create({
      title: toastTitle,
      description: toastDescription,
    });
  };

  return customToast;
};
