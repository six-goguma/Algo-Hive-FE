export const BlockNoteStyles = () => {
  return (
    <style>
      {`
          .bn-editor {
              padding-inline: 50px;
          }
          @media (max-width: 768px) {
              .bn-editor {
                  padding-inline: 10px;
              }
          }
        `}
    </style>
  );
};
