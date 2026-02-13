const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
    />
  </div>
);
export default Input;