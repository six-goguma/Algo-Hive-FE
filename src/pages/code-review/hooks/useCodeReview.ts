// useCodeReview.ts
import { getCodeReview } from '../apis';
import { useMutation } from '@tanstack/react-query';

export const useCodeReview = () => {
  return useMutation({
    mutationFn: (code: string) => getCodeReview(code),
  });
};
