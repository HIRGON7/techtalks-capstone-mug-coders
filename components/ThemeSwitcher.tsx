
"use client";

import { useEffect, useRef, useState } from "react";

type ThemeId =
  | "core"
  | "forbidden-love"
  | "frostfall"
  | "armageddon"
  | "flora"
  | "cyber";

const themes: {
  id: ThemeId;
  name: string;
  color: string;
  available: boolean;
}[] = [
  {
    id: "core",
    name: "Core",
    color: "#4f8cff",
    available: true,
  },
  {
    id: "forbidden-love",
    name: "Forbidden Love",
    color: "#a8243d",
    available: true,
  },
  {
    id: "frostfall",
    name: "Frostfall",
    color: "#8edaf2",
    available: true,
  },
  {
    id: "armageddon",
    name: "Armageddon",
    color: "#e87935",
    available: true,
  },
  {
    id: "flora",
    name: "Flora",
    color: "#e9c74f",
    available: true,
  },
  {
    id: "cyber",
    name: "Cyber",
    color: "#24e5ba",
    available: false,
  },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("core");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mug-theme");

    const selected = themes.find(
      (item) => item.id === saved && item.available
    );

    const activeTheme = selected?.id ?? "core";

    setTheme(activeTheme);
    document.documentElement.setAttribute(
      "data-theme",
      activeTheme
    );
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  
function changeTheme(value: ThemeId) {
  const selected = themes.find(
    (item) => item.id === value && item.available
  );

  if (!selected) return;

  if (selected.id === theme) {
    setOpen(false);
    return;
  }

  const applyTheme = () => {
    document.documentElement.setAttribute(
      "data-theme",
      selected.id
    );

    localStorage.setItem("mug-theme", selected.id);
    setTheme(selected.id);
    setOpen(false);
  };

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    typeof document.startViewTransition !== "function" ||
    reducedMotion
  ) {
    applyTheme();
    return;
  }

  const root = document.documentElement;

  root.classList.add("mug-theme-transition");

  const transition = document.startViewTransition(() => {
    applyTheme();
  });

  const cleanup = () => {
    root.classList.remove("mug-theme-transition");
  };

  transition.finished.then(cleanup, cleanup);
}


  const current = themes.find(
    (item) => item.id === theme
  ) ?? themes[0];

  return (
    <div
      ref={containerRef}
      className="fixed right-4 top-[90px] z-40 sm:right-6"
    >
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="mug-theme-menu"
        className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-lg transition-colors duration-300 hover:border-[var(--accent)]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 1.5-4c-.5-.4-.2-1.2.4-1.2H17a4 4 0 0 0 4-4A9 9 0 0 0 12 3Z" />
          <circle cx="7.5" cy="11" r="1" />
          <circle cx="10" cy="7" r="1" />
          <circle cx="15" cy="7.5" r="1" />
          <circle cx="17.5" cy="11" r="1" />
        </svg>

        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: current.color }}
        />

        <span>{current.name}</span>

        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id="mug-theme-menu"
          className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl"
        >
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Choose your world
          </p>

          <div className="flex flex-col gap-1">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={!item.available}
                onClick={() => changeTheme(item.id)}
                aria-pressed={theme === item.id}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors duration-200 ${
                  !item.available
                    ? "cursor-not-allowed opacity-45"
                    : theme === item.id
                      ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
                      : "text-[var(--muted-light)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span>{item.name}</span>
                </span>

                {theme === item.id ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                ) : !item.available ? (
                  <span className="text-[10px] text-[var(--muted)]">
                    Soon
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
