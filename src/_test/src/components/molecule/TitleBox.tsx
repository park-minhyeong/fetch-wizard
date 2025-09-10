import { ReactNode } from "react";

interface TitleBoxProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function TitleBox({ title, children, className = "" }: TitleBoxProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      {children}
    </div>
  );
}
