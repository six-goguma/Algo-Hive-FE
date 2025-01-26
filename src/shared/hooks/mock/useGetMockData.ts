import { useState, useEffect } from 'react';

export const useGetMockData = <T>(data: T) => {
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPending(false);

      if (!data) {
        setIsError(true);
        console.error('500 (Internal Server Error)');
      } else {
        setIsError(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  return { data, isPending, isError };
};
