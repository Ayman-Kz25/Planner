import { useMemo } from "react";
import { Clock3 } from "lucide-react";

import { useTasks } from "../context/TaskContext";
import useTaskActions from "../hooks/useTaskActions";

import TaskList from "../components/task/TaskList";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import EmptyState from "../components/ui/EmptyState";

const InProgressPage = () => {
  const { tasks } = useTasks();

  const {
    selectedTask,
    isEditOpen,
    isDeleteOpen,
    handleEdit,
    handleDelete,
    closeEdit,
    closeDelete,
    confirmDelete,
  } = useTaskActions();

  const inProgressTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "in-progress"
      ),
    [tasks]
  );

  return (
    <div className="space-y-8">

      {/* Hero */}

      <section>
        <h1 className="text-theme text-3xl font-bold">
          In Progress
        </h1>

        <p className="text-muted-theme mt-2">
          Keep track of the tasks you're currently working on.
        </p>
      </section>

      {/* Stats */}

      <section>
        <div
          className="
            card-theme
            border
            border-theme
            shadow-theme
            max-w-sm
            rounded-3xl
            p-6
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-muted-theme text-sm">
                Active Tasks
              </p>

              <h2 className="text-theme mt-2 text-4xl font-bold">
                {inProgressTasks.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-amber-100 p-4 text-amber-600">
              <Clock3 size={28} />
            </div>

          </div>
        </div>
      </section>

      {/* Tasks */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-theme text-xl font-semibold">
            Active Tasks
          </h2>

          <span
            className="
              surface-theme
              text-muted-theme
              rounded-full
              px-3
              py-1
              text-sm
            "
          >
            {inProgressTasks.length}{" "}
            {inProgressTasks.length === 1
              ? "Task"
              : "Tasks"}
          </span>

        </div>

        {inProgressTasks.length ? (
          <TaskList
            tasks={inProgressTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState
            title="No tasks in progress"
            description="Move a task to In Progress to start tracking your work."
          />
        )}

      </section>

      {/* Modals */}

      {selectedTask && (
        <>
          <EditTaskModal
            task={selectedTask}
            isOpen={isEditOpen}
            onClose={closeEdit}
          />

          <ConfirmDeleteModal
            isOpen={isDeleteOpen}
            onClose={closeDelete}
            onConfirm={confirmDelete}
            taskTitle={selectedTask.title}
          />
        </>
      )}
    </div>
  );
};

export default InProgressPage;