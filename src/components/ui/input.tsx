import * as React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import iconArrowDown from "@/assets/icon-arrow-down.svg";
import iconArrowUp from "@/assets/icon-arrow-up.svg";
import iconArrowDownHover from "@/assets/icon-arrow-down-hover.svg";
import iconArrowUpHover from "@/assets/icon-arrow-up-hover.svg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [upHovered, setUpHovered] = React.useState(false);
    const [downHovered, setDownHovered] = React.useState(false);
    const [upDisabled, setUpDisabled] = React.useState(false);
    const [downDisabled, setDownDisabled] = React.useState(false);

    const { setValue } = useFormContext();

    React.useEffect(() => {
      if (props.name && props.value) {
        if (Number(props.value) > 99) setValue(props.name, 99);
        if (Number(props.value) < 1) setValue(props.name, 1);

        if (Number(props.value) >= 99) setUpDisabled(true);
        else setUpDisabled(false);
        if (Number(props.value) <= 1) setDownDisabled(true);
        else setDownDisabled(false);
      }
    }, [props.name, props.value, setValue]);

    const handleIncrement = () => {
      if (props.name && props.value) {
        if (Number(props.value) >= 99) return;
        setValue(props.name, Number(props.value) + 1);
      } else if (props.name) {
        setValue(props.name, 1);
      }
    };
    const handleDecrement = () => {
      if (props.name && props.value) {
        if (Number(props.value) <= 1) return;
        setValue(props.name, Number(props.value) - 1);
      }
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "h-10 w-[8.75rem] rounded-[0.625rem] bg-off-white p-4 text-sm font-bold text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "number" && (
          <div className="absolute right-1 top-0 flex h-full flex-col">
            {upDisabled ? (
              <div className="flex h-full w-full flex-1 items-end pl-2 pr-2"></div>
            ) : (
              <button
                type="button"
                className="flex h-full w-full flex-1 items-end pl-2 pr-2"
                onMouseEnter={() => setUpHovered(true)}
                onMouseLeave={() => setUpHovered(false)}
                onClick={handleIncrement}
              >
                <img
                  className="mb-1 pt-1.5"
                  src={upHovered ? iconArrowUpHover : iconArrowUp}
                  alt="arrow up"
                />
              </button>
            )}
            {downDisabled ? (
              <div className="flex h-full w-full flex-1 items-start pl-2 pr-2"></div>
            ) : (
              <button
                type="button"
                className="flex h-full w-full flex-1 items-start pl-2 pr-2"
                onMouseEnter={() => setDownHovered(true)}
                onMouseLeave={() => setDownHovered(false)}
                onClick={handleDecrement}
              >
                <img
                  className="visible mt-1 pb-1.5"
                  src={downHovered ? iconArrowDownHover : iconArrowDown}
                  alt="arrow down"
                />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
