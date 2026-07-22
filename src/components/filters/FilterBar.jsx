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
        p-4
        shadow-sm

        sm:p-5
        lg:p-6
      "
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Search */}

      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{
            color: "var(--text-muted)",
          }}
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
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition-all
            duration-200
          "
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            e.target.style.background = "var(--card)";
            e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow =
              "0 0 0 4px var(--surface)";
          }}
          onBlur={(e) => {
            e.target.style.background = "var(--surface)";
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
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
            px-4
            py-3
            text-sm
            outline-none
            transition-all
          "
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow =
              "0 0 0 4px var(--surface)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
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
            px-4
            py-3
            text-sm
            outline-none
            transition-all
          "
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow =
              "0 0 0 4px var(--surface)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
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
            px-4
            py-3
            text-sm
            outline-none
            transition-all
          "
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow =
              "0 0 0 4px var(--surface)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
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
            px-4
            py-3
            text-sm
            font-medium
            transition-all
            duration-200
            active:scale-[0.98]
          "
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "var(--surface-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "var(--surface)";
          }}
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;