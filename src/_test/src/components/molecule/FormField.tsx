import { ReactNode } from "react";
import Label from "../atom/Label";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  className?: string;
}

export default function FormField({ 
  label, 
  htmlFor, 
  required = false, 
  children, 
  error,
  className = "" 
}: FormFieldProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
