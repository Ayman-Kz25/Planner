const TextInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          outline-none
          transition-all
          duration-200
          focus:ring-2
          focus:ring-slate-400
          ${error ? "border-red-500" : "border-slate-300"}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;