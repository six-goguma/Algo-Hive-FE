import { useState } from 'react';

/*
 * 태그 선택 상태를 관리하는 커스텀 훅.
 */
export const useTagSelection = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const onClickTag = (label: string) => {
    setSelectedTag(label);
  };

  return { selectedTag, onClickTag };
};
