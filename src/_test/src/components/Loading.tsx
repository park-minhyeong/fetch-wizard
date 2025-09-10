import { cn } from "fast-jsx/util";
function Loading() {
  const container = {
    displays: "flex justify-center items-center",
    sizes: "w-full h-full",
  };
  const spinner = {
    displays: "flex justify-center items-center",
    animations: "animate-spin duration-4000",
  };

  return (
    <div className={cn(container)}>
      <div className="flex flex-col items-center space-y-4 bg-black">
				what
      </div>
    </div>
  );
}

export default Loading;
