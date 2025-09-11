import { cn } from "fast-jsx/util";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  className = "",
  ...props 
}: ButtonProps) {
  const baseStyles = {
    displays: "inline-flex items-center justify-center",
    borders: "border rounded-lg font-medium",
    transitions: "transition-colors duration-200",
    states: "focus:outline-none focus:ring-2 focus:ring-offset-2",
  };

  const variants = {
    primary: {
      colors: "bg-blue-600 text-white border-blue-600",
      states: "hover:bg-blue-700 focus:ring-blue-500",
    },
    secondary: {
      colors: "bg-gray-200 text-gray-900 border-gray-200",
      states: "hover:bg-gray-300 focus:ring-gray-500",
    },
    danger: {
      colors: "bg-red-600 text-white border-red-600",
      states: "hover:bg-red-700 focus:ring-red-500",
    },
    success: {
      colors: "bg-green-600 text-white border-green-600",
      states: "hover:bg-green-700 focus:ring-green-500",
    },
  };

  const sizes = {
    sm: { spacing: "px-3 py-1.5 text-sm" },
    md: { spacing: "px-4 py-2 text-base" },
    lg: { spacing: "px-6 py-3 text-lg" },
  };

  return (
      <button 
        {...props}
        onClick={(e)=>{
          e.stopPropagation()
          props.onClick?.(e)
        }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
      >
        {children}
      </button>
  );
}
