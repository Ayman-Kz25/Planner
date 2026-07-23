const Toggle = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      aria-pressed={checked}
      disabled={disabled}
      onClick={onChange}
      className={`
        relative
        h-8
        w-14
        rounded-full
        transition-colors
        duration-300
        ${
          checked
            ? "bg-primary-theme"
            : "surface-theme"
        }
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }
      `}
    >
      <span
        className={`
          absolute
          left-1
          top-1/2
          h-6
          w-6
          -translate-y-1/2
          rounded-full
          shadow-md
          transition-all
          duration-300
          ${
            checked
              ? "left-7 bg-theme"
              : "left-1 bg-primary-theme"
          }
        `}
      />
    </button>
  );
};

export default Toggle;