export default function Button({ children, onClick, type = "button", variant = "primary", disabled }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-black",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition ${variants[variant]} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
