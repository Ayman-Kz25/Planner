import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!onConfirm) return;

    setLoading(true);

    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Error deleting task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
      "
      style={{
        background: "rgba(15,23,42,.55)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="
          card-theme
          border-theme
          shadow-theme
          w-full
          max-w-md
          rounded-3xl
          border
          p-6
        "
      >
        {/* Icon */}

        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
          "
          style={{
            background: "var(--danger-bg)",
            color: "var(--danger)",
          }}
        >
          <AlertTriangle size={30} />
        </div>

        {/* Content */}

        <div className="mt-6 text-center">
          <h2 className="text-theme text-2xl font-bold">
            Delete Task?
          </h2>

          <p className="text-muted-theme mt-3 text-sm leading-6">
            You're about to permanently delete
          </p>

          <p className="text-theme mt-2 break-words font-semibold">
            "{taskTitle}"
          </p>

          <p className="text-muted-theme mt-3 text-sm">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              surface-theme
              surface-hover-theme
              border-theme
              text-theme
              rounded-xl
              border
              px-5
              py-3
              font-medium
              transition
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-5
              py-3
              font-medium
              text-white
              transition
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
            style={{
              background: "var(--danger)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
            }}
          >
            <Trash2 size={18} />

            {loading ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;