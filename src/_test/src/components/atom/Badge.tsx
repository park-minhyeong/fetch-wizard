import { cn } from "fast-jsx/util";
import { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export default function Badge({ 
  variant = "default", 
  size = "md", 
  children, 
  className = "" 
}: BadgeProps) {
  const baseStyles = {
    displays: "inline-flex items-center",
    borders: "rounded-full font-medium",
  };

  const variants = {
    default: {
      colors: "bg-gray-100 text-gray-800",
    },
    success: {
      colors: "bg-green-100 text-green-800",
    },
    warning: {
      colors: "bg-yellow-100 text-yellow-800",
    },
    error: {
      colors: "bg-red-100 text-red-800",
    },
    info: {
      colors: "bg-blue-100 text-blue-800",
    },
  };

  const sizes = {
    sm: { spacing: "px-2 py-0.5 text-xs" },
    md: { spacing: "px-3 py-1 text-sm" },
    lg: { spacing: "px-4 py-1.5 text-base" },
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
