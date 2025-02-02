export const BlockNoteStyles = () => {
  return (
    <style>
      {`
          .bn-editor {
              padding-inline: 50px; /* 기본(데스크탑)에서는 50px */
          }
          @media (max-width: 768px) {
              .bn-editor {
                  padding-inline: 10px; /* 모바일에서는 10px */
              }
          }
        `}
    </style>
  );
};
