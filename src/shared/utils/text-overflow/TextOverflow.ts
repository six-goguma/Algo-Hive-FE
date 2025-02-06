export const TextOverFlow = (text: string) => {
  const length = text.length;

  const ELLIPSIS_TEXT = '...';

  if (length > 90) {
    return `${text.slice(0, 90)}${ELLIPSIS_TEXT}`;
  }

  return text;
};
