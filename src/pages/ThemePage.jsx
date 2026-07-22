import { Moon, Sun, Waves, Trees, Flower2 } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

const themes = [
  {
    id: "light",
    name: "Light",
    description: "Clean and minimal appearance",
    icon: Sun,
  },
  {
    id: "dark",
    name: "Dark",
    description: "Easy on the eyes at night",
    icon: Moon,
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Blue inspired interface",
    icon: Waves,
  },
  {
    id: "forest",
    name: "Forest",
    description: "Calming green palette",
    icon: Trees,
  },
  {
    id: "rose",
    name: "Rose",
    description: "Soft pink aesthetic",
    icon: Flower2,
  },
];

const ThemePage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Header */}

      <div className="card-theme border-theme shadow-theme rounded-3xl border p-6 sm:p-8">
        <h1 className="text-theme text-2xl font-bold sm:text-3xl">
          Appearance
        </h1>

        <p className="text-muted-theme mt-2 text-sm sm:text-base">
          Select the theme you want to use throughout Planner.
        </p>
      </div>

      {/* Theme Cards */}

      <div className="space-y-4">
        {themes.map((item) => {
          const Icon = item.icon;
          const active = theme === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTheme(item.id)}
              className={`
                w-full
                rounded-3xl
                border
                p-5
                transition-all
                duration-300
                hover:-translate-y-0.5
                border-theme
                ${
                  active
                    ? "primary-theme shadow-theme"
                    : "card-theme surface-hover-theme"
                }
              `}
            >
              <div className="flex items-center justify-between gap-5">
                {/* Left */}

                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      transition
                      ${
                        active
                          ? "bg-on-primary-theme text-primary-theme"
                          : "icon-surface-theme"
                      }
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 text-left">
                    <h2
                      className={`text-base font-semibold sm:text-lg ${
                        active ? "text-on-primary-theme" : "text-theme"
                      }`}
                    >
                      {item.name}
                    </h2>

                    <p
                      className={`mt-1 text-sm ${
                        active
                          ? "opacity-80 text-on-primary-theme"
                          : "text-muted-theme"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Toggle */}

                <div
                  className={`
                    relative
                    h-7
                    w-12
                    shrink-0
                    rounded-full
                    transition-all
                    ${active ? "surface-2-theme" : "surface-theme"}
                  `}
                >
                  <div
                    className={`
                      absolute
                      top-1
                      h-5
                      w-5
                      rounded-full
                      shadow
                      transition-all
                      duration-300
                      ${
                        active
                          ? "left-6 bg-on-primary-theme"
                          : "left-1 bg-primary-theme"
                      }
                    `}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemePage;
