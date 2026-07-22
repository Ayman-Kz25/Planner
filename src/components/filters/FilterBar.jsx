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
    <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Search */}

      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
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
            outline-none
            transition
            focus:border-slate-400
            focus:bg-white
          "
        />
      </div>

      {/* Filters */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        <select
          value={filters.status}
          onChange={(e) =>
            handleChange("status", e.target.value)
          }
          className="
            flex-1
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            outline-none
            focus:border-slate-400
          "
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            handleChange("priority", e.target.value)
          }
          className="
            flex-1
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            outline-none
            focus:border-slate-400
          "
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={filters.due}
          onChange={(e) =>
            handleChange("due", e.target.value)
          }
          className="
            flex-1
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            outline-none
            focus:border-slate-400
          "
        >
          <option value="">All Dates</option>
          <option value="overdue">Overdue</option>
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
        </select>

        <button
          onClick={resetFilters}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-5
            py-3
            font-medium
            text-slate-600
            transition
            hover:bg-slate-100
          "
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

    </div>
  );
};

export default FilterBar;