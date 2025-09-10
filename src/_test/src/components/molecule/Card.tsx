import { cn } from "fast-jsx/util";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = "", 
  hover = false 
}: CardProps) {
  const baseStyles = {
    displays: "flex flex-col",
    colors: "bg-white",
    borders: "border border-gray-200 rounded-lg",
    spacing: "p-6",
    shadows: "shadow-sm",
  };

  const hoverStyles = hover ? {
    transitions: "transition-shadow duration-200",
    states: "hover:shadow-md",
  } : {};

  return (
    <div className={cn(baseStyles, hoverStyles, className)}>
      {children}
    </div>
  );
}
