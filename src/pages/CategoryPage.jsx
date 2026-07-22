import { useMemo, useState } from "react";
import { FolderOpen } from "lucide-react";
import { isPast, isToday } from "date-fns";
import { useParams } from "react-router-dom";

import { useTasks } from "../context/TaskContext";
import useTaskActions from "../hooks/useTaskActions";

import TaskList from "../components/task/TaskList";
import FilterBar from "../components/filters/FilterBar";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import EmptyState from "../components/ui/EmptyState";

const CategoryPage = () => {
  const { category } = useParams();
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

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    due: "",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      let pass = true;

      pass =
        pass &&
        task.category?.toLowerCase() ===
          category?.toLowerCase();

      if (filters.search) {
        const search = filters.search.toLowerCase();

        pass =
          pass &&
          (task.title.toLowerCase().includes(search) ||
            task.description
              ?.toLowerCase()
              .includes(search));
      }

      if (filters.status) {
        pass = pass && task.status === filters.status;
      }

      if (filters.priority) {
        pass = pass && task.priority === filters.priority;
      }

      if (filters.due) {
        if (!task.dueDate) return false;

        const due = task.dueDate?.seconds
          ? new Date(task.dueDate.seconds * 1000)
          : new Date(task.dueDate);

        if (filters.due === "today") {
          pass = pass && isToday(due);
        }

        if (filters.due === "overdue") {
          pass =
            pass &&
            isPast(due) &&
            task.status !== "completed";
        }

        if (filters.due === "upcoming") {
          pass =
            pass &&
            !isPast(due) &&
            !isToday(due);
        }
      }

      return pass;
    });
  }, [tasks, category, filters]);

  const categoryName =
    category?.charAt(0).toUpperCase() +
    category?.slice(1);

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text)" }}
        >
          {categoryName}
        </h1>

        <p
          className="mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          Manage all of your{" "}
          {categoryName?.toLowerCase()} tasks in one
          place.
        </p>
      </section>

      {/* Stats */}

      <section>
        <div
          className="max-w-sm rounded-3xl border p-6 shadow-sm transition hover:shadow-md"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                {categoryName} Tasks
              </p>

              <h2
                className="mt-2 text-4xl font-bold"
                style={{
                  color: "var(--text)",
                }}
              >
                {filteredTasks.length}
              </h2>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{
                background: "var(--surface)",
                color: "var(--primary)",
              }}
            >
              <FolderOpen size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}

      <FilterBar
        filters={filters}
        setFilters={setFilters}
      />

      {/* Tasks */}

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {categoryName} Tasks
          </h2>

          <span
            className="rounded-full px-3 py-1 text-sm"
            style={{
              background: "var(--surface)",
              color: "var(--text-muted)",
            }}
          >
            {filteredTasks.length}{" "}
            {filteredTasks.length === 1
              ? "Task"
              : "Tasks"}
          </span>
        </div>

        {filteredTasks.length ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState
            title={`No ${categoryName?.toLowerCase()} tasks`}
            description={`Create a ${categoryName?.toLowerCase()} task to get started.`}
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

export default CategoryPage;