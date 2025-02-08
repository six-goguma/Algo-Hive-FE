import { Global } from '@emotion/react';

export const BlockNoteStyles = () => {
  return (
    <Global
      styles={`
        .bn-editor {
          padding-inline: 50px;
        }
        @media (max-width: 768px) {
          .bn-editor {
            padding-inline: 10px;
          }
        }
      `}
    />
  );
};
