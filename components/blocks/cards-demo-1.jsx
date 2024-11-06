import { cn } from "@/lib/utils";

export function CardDemo({ children, title, description }) {
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "group cursor-pointer overflow-hidden relative card h-full rounded-md shadow-xl flex flex-col justify-between",
          "bg-frappe-mantle",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-frappe-overlay0 hover:after:opacity-50",
          "transition-all duration-500"
        )}>
        <div className="relative z-10 flex flex-col h-full">
          {children || (
            <>
              <div className="p-6">
                <h2 className="font-bold text-xl text-frappe-text mb-3">
                  {title}
                </h2>
                <div className="font-normal text-sm text-frappe-subtext1">
                  {description}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Add subcomponents to match Card's API
CardDemo.Header = function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
};

CardDemo.Title = function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight text-frappe-text", className)} {...props} />;
};

CardDemo.Description = function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-frappe-subtext1", className)} {...props} />;
};

CardDemo.Content = function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0 text-frappe-subtext1", className)} {...props} />;
};

CardDemo.Footer = function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
};
