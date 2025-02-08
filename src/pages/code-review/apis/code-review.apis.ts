import { fetchInstance } from '@shared/service';

import { ResponseCodeReview } from './code-review.type';

export const getCodeReview = async (code: string): Promise<ResponseCodeReview> => {
  const response = await fetchInstance.post<ResponseCodeReview>('/ai/analyze', {
    body: JSON.stringify({ code }),
  });
  return response.data;
};
