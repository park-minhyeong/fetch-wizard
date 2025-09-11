import { cn } from "fast-jsx/util";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  text = "로딩 중...", 
  className = "" 
}: LoadingSpinnerProps) {
  const container = {
    displays: "flex justify-center items-center",
    sizes: "min-h-screen",
  };

  const spinner = {
    displays: "flex flex-col items-center",
    spacing: "space-y-4",
    colors: "text-gray-600",
  };

  const spinnerIcon = {
    displays: "animate-spin",
    sizes: size === "sm" ? "w-6 h-6" : size === "lg" ? "w-12 h-12" : "w-8 h-8",
    colors: "text-blue-600",
  };

  return (
    <div className={cn(container, className)}>
      <div className={cn(spinner)}>
        <div className={cn(spinnerIcon)}>
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
