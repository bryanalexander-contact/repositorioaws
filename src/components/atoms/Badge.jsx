export default function Badge({ label, color = "red" }) {
  const styles = {
    backgroundColor: color,
    color: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "bold"
  };
  return <span style={styles}>{label}</span>;
}
