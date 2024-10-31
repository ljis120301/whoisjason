import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GoogleCardSkeletonContainer = ({
  className,
  children,
  showGradient = true
}) => {
  return (
    <div
      className={cn("rounded-xl z-40", className, showGradient &&
        "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]")}>
      {children}
    </div>
  );
};

export const GoogleContainer = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
        shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
        `,
        className
      )}>
      {children}
    </div>
  );
};

export const GoogleSparkles = () => {
  const sparklePositions = [
    { top: '20%', left: '10%' },
    { top: '40%', left: '30%' },
    { top: '60%', left: '50%' },
    { top: '80%', left: '70%' },
    { top: '30%', left: '90%' },
    { top: '70%', left: '20%' },
    { top: '50%', left: '80%' },
    { top: '10%', left: '60%' },
    { top: '90%', left: '40%' },
    { top: '25%', left: '75%' },
    { top: '75%', left: '25%' },
    { top: '45%', left: '55%' },
  ];

  return (
    <div className="absolute inset-0">
      {sparklePositions.map((position, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: 2 + i * 0.2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
}; 