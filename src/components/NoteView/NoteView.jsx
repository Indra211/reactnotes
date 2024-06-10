export const NoteView = ({ item }) => {
  const date = item?.date?.split(",");
  return (
    <div
      style={{ display: "flex", alignItems: "center", padding: 12, gap: 10 }}
    >
      <div style={{ flex: 0.1 }}>
        <p>{date[0]}</p>
        <p>{date[1]}</p>
      </div>
      <p style={{ flex: 0.9, textAlign: "justify", lineHeight: 1.5 }}>
        {item?.note}
      </p>
    </div>
  );
};
