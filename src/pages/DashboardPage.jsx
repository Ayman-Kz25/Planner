import { useMemo, useState } from "react";
import { isPast, isToday } from "date-fns";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import useTaskActions from "../hooks/useTaskActions";

import TaskList from "../components/task/TaskList";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import FilterBar from "../components/filters/FilterBar";
import EmptyState from "../components/ui/EmptyState";

const DashboardPage = () => {
  const { user } = useAuth();
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

      if (filters.search) {
        const search = filters.search.toLowerCase();

        pass =
          pass &&
          (task.title.toLowerCase().includes(search) ||
            task.description?.toLowerCase().includes(search));
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
          pass = pass && isPast(due) && task.status !== "completed";
        }

        if (filters.due === "upcoming") {
          pass = pass && !isPast(due) && !isToday(due);
        }
      }

      return pass;
    });
  }, [tasks, filters]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      progress: tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    }),
    [tasks]
  );

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ClipboardList,
    },
    {
      title: "Todo",
      value: stats.todo,
      icon: ListTodo,
    },
    {
      title: "In Progress",
      value: stats.progress,
      icon: Clock3,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.displayName?.split(" ")[0] || "there"}
        </h1>

        <p className="mt-2 text-slate-500">
          Stay organized and finish today's priorities.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Filters */}

      <FilterBar
        filters={filters}
        setFilters={setFilters}
      />

      {/* Tasks */}

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Tasks
          </h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            {filteredTasks.length}{" "}
            {filteredTasks.length === 1 ? "Task" : "Tasks"}
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
            title="No tasks found"
            description="Try changing your filters or create a new task."
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

export default DashboardPage;