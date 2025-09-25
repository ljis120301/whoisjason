import { cn } from "@/lib/utils";

export const GoogleCard = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-latte-overlay1 dark:border-frappe-surface0 bg-latte-base dark:bg-frappe-base shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export const GoogleCardTitle = ({ children, className }) => {
  return (
    <h3 className={cn("text-sm font-semibold text-latte-text dark:text-white", className)}>
      {children}
    </h3>
  );
};

export const GoogleCardDescription = ({ children, className }) => {
  return (
    <p className={cn("text-xs font-normal text-latte-subtext0 dark:text-frappe-subtext0", className)}>
      {children}
    </p>
  );
}; 