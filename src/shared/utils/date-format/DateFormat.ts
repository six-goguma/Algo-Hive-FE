export const dateFormat = (date: string) => {
  const customDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return customDate.replace(/\./g, '').replace(/(\d{4})(\d{2})(\d{2})/, `$1년 $2월 $3일`);
};
