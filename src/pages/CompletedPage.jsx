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
    () => tasks.filter((task) => task.status === "completed"),
    [tasks]
  );

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Completed Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Celebrate your progress by reviewing everything you've finished.
        </p>
      </section>

      {/* Stats */}

      <section>
        <div
          className="
            max-w-sm
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            transition
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                {completedTasks.length}
              </h2>
            </div>

            <div
              className="
                rounded-2xl
                bg-emerald-100
                p-4
                text-emerald-600
              "
            >
              <CheckCircle2 size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* Tasks */}

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Finished Tasks
          </h2>

          <span
            className="
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-sm
              text-slate-600
            "
          >
            {completedTasks.length}{" "}
            {completedTasks.length === 1 ? "Task" : "Tasks"}
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