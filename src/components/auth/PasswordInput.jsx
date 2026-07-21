import { useState } from "react";

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
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
            pr-12
            outline-none
            transition-all
            duration-200
            focus:ring-2
            focus:ring-slate-400
            ${error ? "border-red-500" : "border-slate-300"}
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;