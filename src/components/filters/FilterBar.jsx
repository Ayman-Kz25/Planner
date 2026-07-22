import { Search, RotateCcw } from "lucide-react";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      due: "",
    });
  };

  return (
    <div
      className="
        mb-6
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm

        sm:p-5
        lg:p-6
      "
    >
      {/* Search */}

      <div className="relative mb-5">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) =>
            handleChange("search", e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition-all
            duration-200

            placeholder:text-slate-400

            focus:border-slate-900
            focus:bg-white
            focus:ring-4
            focus:ring-slate-100
          "
        />
      </div>

      {/* Filters */}

      <div
        className="
          grid
          grid-cols-1
          gap-3

          sm:grid-cols-2

          xl:grid-cols-4
        "
      >
        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) =>
            handleChange("status", e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            outline-none
            transition-all

            focus:border-slate-900
            focus:ring-4
            focus:ring-slate-100
          "
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority */}

        <select
          value={filters.priority}
          onChange={(e) =>
            handleChange("priority", e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            outline-none
            transition-all

            focus:border-slate-900
            focus:ring-4
            focus:ring-slate-100
          "
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Due Date */}

        <select
          value={filters.due}
          onChange={(e) =>
            handleChange("due", e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            outline-none
            transition-all

            focus:border-slate-900
            focus:ring-4
            focus:ring-slate-100
          "
        >
          <option value="">All Dates</option>
          <option value="overdue">Overdue</option>
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
        </select>

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2

            rounded-2xl
            border
            border-slate-200
            bg-slate-50

            px-4
            py-3

            text-sm
            font-medium
            text-slate-700

            transition-all
            duration-200

            hover:bg-slate-100
            active:scale-[0.98]
          "
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;