import { cva } from "class-variance-authority";
import cn from "../../utils/cn";

export default function Button({
  children,
  className,
  variant,
  size,
  ...props
}) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva("rounded-md transition-all  dark:hover:bg-blue-600  ", {
  variants: {
    variant: {
      primary: " border-none text-white bg-blue-950 dark:bg-blue-400  hover:bg-blue-500",
      primaryReverse: "border-none text-white bg-blue-500  hover:bg-blue-950",
      secondary: "border-none text-white bg-black hover:bg-neutral-800",
      danger: "border-none text-white bg-red-800 dark:bg-red-400 hover:bg-red-600",
    },
    size: {
      sm: "px-2 py-1",
      md: "px-4 py-2",
      lg: "px-8 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});
