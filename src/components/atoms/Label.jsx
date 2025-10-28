export default function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block font-semibold mb-1 text-gray-700">
      {children}
    </label>
  );
}
