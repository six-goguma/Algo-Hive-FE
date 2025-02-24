import { Global } from '@emotion/react';

export const BlockNoteDetailStyles = () => {
  return (
    <Global
      styles={`
            .bn-editor {
                padding-inline: 0;
                background-color: transparent;
                color: black;
            }
        `}
    />
  );
};
