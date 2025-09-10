import { cn } from "fast-jsx/util";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseStyles = {
      displays: "w-full",
      spacing: "px-3 py-2",
      borders: "border rounded-lg",
      transitions: "transition-colors duration-200",
    };

    const variants = {
      default: {
        borders: "border-gray-300",
        states: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      },
      error: {
        borders: "border-red-500",
        states: "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500",
      },
    };

    return (
      <input
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
