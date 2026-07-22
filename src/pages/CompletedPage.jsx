import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";

import { useTasks } from "../context/TaskContext";
import useTaskActions from "../hooks/useTaskActions";

import TaskList from "../components/task/TaskList";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import EmptyState from "../components/ui/EmptyState";

const CompletedPage = () => {
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

  const completedTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "completed"
      ),
    [tasks]
  );

  return (
    <div className="space-y-8">

      {/* Hero */}

      <section>
        <h1 className="text-theme text-3xl font-bold">
          Completed Tasks
        </h1>

        <p className="text-muted-theme mt-2">
          Celebrate your progress by reviewing everything you've finished.
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
                Completed
              </p>

              <h2 className="text-theme mt-2 text-4xl font-bold">
                {completedTasks.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
              <CheckCircle2 size={28} />
            </div>

          </div>
        </div>
      </section>

      {/* Tasks */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-theme text-xl font-semibold">
            Finished Tasks
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
            {completedTasks.length}{" "}
            {completedTasks.length === 1
              ? "Task"
              : "Tasks"}
          </span>

        </div>

        {completedTasks.length ? (
          <TaskList
            tasks={completedTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState
            title="No completed tasks"
            description="Finish a task and it will appear here."
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

export default CompletedPage;