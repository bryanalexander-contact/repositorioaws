export default function Alert({ type = "info", message }) {
  const colors = {
    info: "#e3f2fd",
    success: "#e8f5e9",
    warning: "#fff8e1",
    error: "#ffebee"
  };

  const borderColors = {
    info: "#64b5f6",
    success: "#66bb6a",
    warning: "#ffb300",
    error: "#e57373"
  };

  return (
    <div
      style={{
        backgroundColor: colors[type],
        border: `1px solid ${borderColors[type]}`,
        borderRadius: "8px",
        padding: "10px 15px",
        margin: "10px 0"
      }}
    >
      <strong style={{ color: borderColors[type] }}>
        {message}
      </strong>
    </div>
  );
}
