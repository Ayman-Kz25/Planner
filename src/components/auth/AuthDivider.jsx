const AuthDivider = ({ text = "or" }) => {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="h-px flex-1 bg-slate-300" />

      <span className="text-sm text-slate-500 uppercase">
        {text}
      </span>

      <div className="h-px flex-1 bg-slate-300" />
    </div>
  );
};

export default AuthDivider;