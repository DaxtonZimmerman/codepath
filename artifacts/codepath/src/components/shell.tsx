import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, BookOpen, Hammer, LineChart, Compass, Settings, Dumbbell, Menu, X, AlertTriangle, RotateCw, Download } from "lucide-react";
import { useStore, useStorageStatus, retrySave, exportRawProgress } from "@/lib/store";
import { todayCount } from "@/lib/progress";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { href: "/", label: "Home", icon: Home, match: ["/"] },
  { href: "/learn", label: "Learn", icon: BookOpen, match: ["/learn", "/path", "/lesson"] },
  { href: "/build", label: "Build", icon: Hammer, match: ["/build", "/projects"] },
];

const SECONDARY = [
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/assessment", label: "Skills check", icon: Compass },
  { href: "/settings", label: "Settings", icon: Settings },
];

const TITLES: [string, string][] = [
  ["/learn", "Learn"], ["/path", "Learn"], ["/lesson", "Lesson"], ["/build", "Build"], ["/projects", "Build"],
  ["/practice", "Practice"], ["/progress", "Progress"], ["/assessment", "Skills check"], ["/settings", "Settings"],
];

export function usePageTitle(title: string) {
  useEffect(() => { document.title = `${title} · Codepath`; }, [title]);
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group rounded-lg" data-testid="link-logo">
      <span className="relative grid place-items-center size-9 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm transition-transform group-hover:-rotate-6">
        {"{/}"}
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">codepath</span>
    </Link>
  );
}

function StorageBanner() {
  const { error, blocked } = useStorageStatus();
  if (!error && !blocked) return null;
  return (
    <div role="alert" className="mb-6 rounded-2xl border-2 border-destructive/60 bg-destructive/10 p-4 sm:p-5" data-testid="banner-storage-error">
      <div className="flex gap-3">
        <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{blocked ? "Saving is paused to protect your data" : "Your latest changes were not saved"}</p>
          <p className="mt-1 text-sm text-muted-foreground break-words">
            {error ?? "Saved data in this browser could not be read safely, so Codepath will not overwrite it."} Nothing has been deleted. Download a copy of the raw data before trying anything else.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => retrySave()} className="press inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-3.5 py-2 text-sm font-semibold" data-testid="button-retry-save"><RotateCw className="size-4" /> Try saving again</button>
            <button onClick={() => exportRawProgress()} className="press inline-flex items-center gap-2 rounded-lg border-2 px-3.5 py-2 text-sm font-semibold" data-testid="button-export-raw"><Download className="size-4" /> Download raw data</button>
            <Link href="/settings" className="inline-flex items-center rounded-lg px-3 py-2 text-sm underline underline-offset-4" data-testid="link-storage-settings">Backup and restore</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  const [open, setOpen] = useState(false);
  const s = useStore();
  const done = todayCount(s);
  const pct = Math.min(100, (done / s.dailyGoal) * 100);
  const isActive = (m: string[]) => m.some((h) => (h === "/" ? loc === "/" : loc === h || loc.startsWith(h + "/")));

  useEffect(() => {
    const t = TITLES.find(([p]) => loc === p || loc.startsWith(p + "/"));
    document.title = t ? `${t[1]} · Codepath` : loc === "/" ? "Home · Codepath" : "Codepath";
    setOpen(false);
  }, [loc]);

  const nav = (
    <nav aria-label="Main" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        {PRIMARY.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(match);
          return (
            <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} aria-current={active ? "page" : undefined}
              className={cn("group flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors",
                active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60")}>
              <Icon className={cn("size-[18px]", active && "text-sidebar-primary")} aria-hidden />
              {label}
              {active && <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary pop" aria-hidden />}
            </Link>
          );
        })}
      </div>
      <div>
        <p className="px-3 mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/45">Your tools</p>
        <div className="flex flex-col">
          {SECONDARY.map(({ href, label, icon: Icon }) => {
            const active = isActive([href]);
            return (
              <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replace(/\s/g, "-")}`} aria-current={active ? "page" : undefined}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "text-sidebar-foreground bg-sidebar-accent/70" : "text-sidebar-foreground/55 hover:text-sidebar-foreground")}>
                <Icon className="size-3.5" aria-hidden /> {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );

  const goal = s.showStats ? (
    <div className="rounded-xl border border-sidebar-border p-4 text-sidebar-foreground" data-testid="status-daily-goal-sidebar">
      <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-sidebar-foreground/60">
        <span>Today</span><span>{done}/{s.dailyGoal}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-sidebar-accent overflow-hidden">
        <div className="h-full bg-sidebar-primary rounded-full transition-[width] duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-[100dvh] md:flex overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] rounded-lg bg-foreground text-background px-4 py-2" data-testid="link-skip">Skip to content</a>
      <aside className="hidden md:flex md:w-60 shrink-0 flex-col gap-8 bg-sidebar text-sidebar-foreground p-5 sticky top-0 h-[100dvh] overflow-y-auto [&_a.group]:text-inherit">
        <div className="[&_span.font-display]:text-sidebar-foreground"><Logo /></div>
        {nav}
        <div className="mt-auto">{goal}</div>
      </aside>

      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between gap-2 px-4 py-3 bg-background/90 backdrop-blur border-b">
        <Logo />
        <div className="flex items-center gap-1">
          {PRIMARY.slice(1).map(({ href, label, match }) => (
            <Link key={href} href={href} aria-current={isActive(match) ? "page" : undefined} className={cn("hidden min-[380px]:inline-flex rounded-lg px-2.5 py-1.5 text-sm font-semibold", isActive(match) ? "bg-muted" : "text-muted-foreground")} data-testid={`link-topnav-${label.toLowerCase()}`}>{label}</Link>
          ))}
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="press p-2 rounded-lg hover:bg-muted" data-testid="button-open-menu"><Menu className="size-5" /></button>
        </div>
      </header>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 overflow-y-auto bg-sidebar text-sidebar-foreground p-5 flex flex-col gap-6 rise" role="dialog" aria-modal="true" aria-label="Menu"
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
          <div className="flex justify-between items-center">
            <span className="font-display text-xl font-extrabold">codepath</span>
            <button autoFocus onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 press rounded-lg" data-testid="button-close-menu"><X className="size-5" /></button>
          </div>
          {nav}
          {goal}
        </div>
      )}

      <main id="main" tabIndex={-1} className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-12 max-w-6xl outline-none">
        <StorageBanner />
        {children}
      </main>
    </div>
  );
}

export function PageHeader({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-8 rise">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">{kicker}</p>
      <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.05] break-words">{title}</h1>
      {children && <div className="mt-4 text-muted-foreground max-w-2xl text-base sm:text-lg">{children}</div>}
    </header>
  );
}

export function StatusDot({ status }: { status: "done" | "missed" | "attempted" | "new" }) {
  const map = { done: "bg-pine", missed: "bg-primary", attempted: "bg-marker", new: "bg-transparent border-2 border-foreground/25" };
  const label = { done: "Completed", missed: "Needs another pass", attempted: "In progress", new: "Not started" };
  return <span className={cn("inline-block size-3 rounded-full shrink-0", map[status])} title={label[status]} aria-label={label[status]} role="img" />;
}
