
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import AuthMenuItem from "@/components/AuthMenuItem";
const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Posts" },
  { href: "/communities", label: "Communities" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
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

  return (
    <header
      ref={headerRef}
      className="mug-navbar relative sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="forbidden-navbar-art absolute inset-y-0 left-0 hidden w-[250px] bg-[url('/themes/forbidden-love/navbar-left.png')] bg-[length:auto_132px] bg-left bg-no-repeat lg:block xl:w-[290px] xl:bg-[length:auto_145px]" />

        <div className="forbidden-navbar-art absolute inset-y-0 right-0 hidden w-[250px] bg-[url('/themes/forbidden-love/navbar-right.png')] bg-[length:auto_132px] bg-right bg-no-repeat lg:block xl:w-[290px] xl:bg-[length:auto_145px]" />

        <div className="frostfall-navbar-side frostfall-navbar-side-left" />

        <div className="frostfall-navbar-side frostfall-navbar-side-right" />

        <div className="armageddon-navbar-art armageddon-navbar-left" />

        <div className="armageddon-navbar-art armageddon-navbar-right" />
      </div>

      <nav
        aria-label="Main navigation"
        className="relative z-10 mx-auto flex h-[85px] w-full items-center justify-between gap-3 px-4 sm:px-6 min-[1800px]:pl-[245px] min-[1800px]:pr-[245px]"
      >
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="mug-navbar-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 7h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7Z" />
                <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16" />
              </svg>
            </div>

            <span className="hidden whitespace-nowrap text-[1.15rem] font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:inline">
              MUG Coders
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blogs">Posts</NavLink>
            <NavLink href="/communities">
              Communities
            </NavLink>
          </div>
        </div>
        <ThemeNeonDisplay />
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:gap-3">
          <div className="hidden items-center gap-1 xl:flex">
            <NavLink href="/bookmarks">
              Bookmarks
            </NavLink>

            <NavLink href="/dashboard">
              Dashboard
            </NavLink>
          </div>
          
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mug-mobile-navigation"
            className="mug-navbar-link inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] xl:hidden"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}

            <span className="hidden text-sm font-semibold sm:inline">
              Menu
            </span>

            <svg
              viewBox="0 0 24 24"
              className={`hidden h-4 w-4 transition-transform duration-300 sm:block ${
                menuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mug-mobile-navigation"
          className="absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--foreground)] shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:left-auto sm:right-6 sm:w-64 xl:hidden"
        >
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            Navigation
          </p>

          <div className="flex flex-col gap-1">
            {mobileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-[var(--muted-light)] transition-colors duration-200 hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              >
                <span>{item.label}</span>

                <span className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
                  →
                </span>
              </Link>
            ))}
          </div>
            <AuthMenuItem />
          <div className="mt-2 border-t border-[var(--border)] pt-3">
            <Link
              href="/create"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              + Create Post
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mug-navbar-link whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-[var(--muted-light)] transition-all duration-300 hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
    >
      {children}
    </Link>
  );
}


type NeonTheme =
  | "core"
  | "frostfall"
  | "armageddon"
  | "forbidden-love"
  | "flora"
  | "cyber";

const neonThemes = {
  core: {
    name: "Core",
    video: "/animations/core.mp4",
    color: "#00cfff",
    glow: "rgba(0, 207, 255, 0.65)",
  },
  frostfall: {
    name: "Frostfall",
    video: "/animations/frostfall.mp4",
    color: "#8cdeff",
    glow: "rgba(140, 222, 255, 0.65)",
  },
  armageddon: {
    name: "Armageddon",
    video: "/animations/armageddon.mp4",
    color: "#ff6a00",
    glow: "rgba(255, 83, 0, 0.65)",
  },
  "forbidden-love": {
    name: "Forbidden Love",
    video: "/animations/forbidden-love.mp4",
    color: "#ff315d",
    glow: "rgba(255, 27, 83, 0.65)",
  },
  flora: {
    name: "Flora",
    video: "/animations/flora.mp4",
    color: "#e5b94b",
    glow: "rgba(229, 185, 75, 0.65)",
  },
  cyber: {
    name: "cyber",
    video: "/animations/cyber.mp4",
    color: "#00E5FF",
    glow: "rgba(0, 229, 255, 0.65)",
  },
};

function getCurrentNeonTheme(): NeonTheme {
  const html = document.documentElement;
  const body = document.body;

  const value = [
    html.getAttribute("data-theme"),
    html.getAttribute("data-active-theme"),
    html.className,
    body.getAttribute("data-theme"),
    body.getAttribute("data-active-theme"),
    body.className,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (value.includes("forbidden-love")) return "forbidden-love";
  if (value.includes("frostfall")) return "frostfall";
  if (value.includes("armageddon")) return "armageddon";
  if (value.includes("flora")) return "flora";
  if (value.includes("core")) return "core";
  if (value.includes("cyber")) return "cyber";

  return "core";
}


function ThemeNeonDisplay() {
  const [theme, setTheme] = useState<NeonTheme>("armageddon");
  const [failedVideo, setFailedVideo] = useState<NeonTheme | null>(null);

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getCurrentNeonTheme());
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    const options: MutationObserverInit = {
      attributes: true,
      attributeFilter: [
        "class",
        "style",
        "data-theme",
        "data-active-theme",
      ],
    };

    observer.observe(document.documentElement, options);
    observer.observe(document.body, options);

    return () => observer.disconnect();
  }, []);

  const selected = neonThemes[theme];

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex"
      role="img"
      aria-label={`${selected.name} animated theme display`}
    >
      <div
        className="relative h-[75px] w-[180px] overflow-hidden rounded-[14px] border-2 bg-black transition-[border-color,box-shadow] duration-500 lg:w-[200px]"
        style={{
          borderColor: selected.color,
          boxShadow: `
            0 0 8px ${selected.glow},
            0 0 22px ${selected.glow},
            inset 0 0 12px ${selected.glow}
          `,
        }}
      >
        {failedVideo !== theme ? (
          <video
            key={theme}
            src={selected.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onError={() => setFailedVideo(theme)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-xs font-semibold tracking-widest"
            style={{ color: selected.color }}
          >
            {selected.name.toUpperCase()}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15" />

        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/40" />

        <div
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-70"
          style={{ background: selected.color }}
        />
      </div>
    </div>
  );
}
