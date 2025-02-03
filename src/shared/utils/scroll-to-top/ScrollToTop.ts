import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동 시 scroll을 맨 위로 이동시키는 util
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
