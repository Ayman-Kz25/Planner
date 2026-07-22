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
        bg-slate-900/50
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        {/* Icon */}

        <div
          className="
            mx-auto
            flex h-16 w-16
            items-center justify-center
            rounded-full
            bg-rose-100
            text-rose-600
          "
        >
          <AlertTriangle size={30} />
        </div>

        {/* Content */}

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Delete Task?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            You're about to permanently delete
          </p>

          <p className="mt-2 break-words font-semibold text-slate-900">
            "{taskTitle}"
          </p>

          <p className="mt-3 text-sm text-slate-500">
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
              rounded-xl
              border
              border-slate-200
              px-5
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
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
              flex items-center justify-center gap-2
              rounded-xl
              bg-rose-600
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-rose-700
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
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