import clsx from "classnames";

export function cn(...args: Parameters<typeof clsx>) {
  return clsx(...args);
}
