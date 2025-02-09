export const TextOverFlow = (text: string) => {
  const length = text.length;

  const ELLIPSIS_TEXT = '...';

  if (length > 80) {
    return `${text.slice(0, 80)}${ELLIPSIS_TEXT}`;
  }

  return text;
};
