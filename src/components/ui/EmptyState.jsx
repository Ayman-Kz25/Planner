import { ClipboardList } from "lucide-react";

const EmptyState = ({
  title = "No tasks yet",
  description = "Create your first task to get started.",
  icon,
}) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        rounded-3xl
        border border-dashed border-slate-300
        bg-slate-50
        px-6 py-20
        text-center
      "
    >
      <div
        className="
          mb-6
          flex h-20 w-20
          items-center justify-center
          rounded-full
          bg-white
          shadow-sm
        "
      >
        {icon || (
          <ClipboardList
            size={36}
            className="text-slate-400"
          />
        )}
      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;