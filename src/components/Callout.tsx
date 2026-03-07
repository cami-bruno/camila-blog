interface CalloutProps {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    border: "border-[color:var(--accent)]",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    icon: "ℹ️",
    titleColor: "text-teal-700 dark:text-teal-300",
  },
  warning: {
    border: "border-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    icon: "⚠️",
    titleColor: "text-amber-700 dark:text-amber-300",
  },
  tip: {
    border: "border-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    icon: "💡",
    titleColor: "text-green-700 dark:text-green-300",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <aside className={`my-6 rounded-lg border-l-4 ${s.border} ${s.bg} px-4 py-3`}>
      {title && (
        <p className={`font-semibold text-sm mb-1 ${s.titleColor}`}>
          {s.icon} {title}
        </p>
      )}
      <div className="text-sm text-[color:var(--foreground)] leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
