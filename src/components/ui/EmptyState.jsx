import { ClipboardList } from "lucide-react";

const EmptyState = ({
  title = "No tasks yet",
  description = "Create your first task to get started.",
  icon,
}) => {
  return (
    <div
      className="
        surface-theme
        border-theme
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        px-6
        py-20
        text-center
      "
    >
      <div
        className="
          card-theme
          shadow-theme
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
        "
      >
        {icon || (
          <ClipboardList
            size={36}
            className="text-theme-muted opacity-60"
          />
        )}
      </div>

      <h2 className="text-theme text-2xl font-bold">
        {title}
      </h2>

      <p className="text-muted-theme mt-3 max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;