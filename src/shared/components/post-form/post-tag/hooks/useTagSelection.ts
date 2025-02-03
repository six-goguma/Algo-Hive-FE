import { useState } from 'react';

export const useTagSelection = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const onClickTag = (label: string) => {
    setSelectedTag(label);
  };

  return { selectedTag, onClickTag };
};
