import React, { forwardRef, useState } from "react";

// Utility function to merge class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Checkbox component
const Checkbox = forwardRef(
  (
    {
      className = "",
      id,
      label,
      checked = false,
      onChange,
      disabled = false,
      required = false,
      error,
      helperText,
      indeterminate = false,
      size = "default",
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked);
    const [isIndeterminate, setIsIndeterminate] = useState(indeterminate);

    const handleChange = (e) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      setIsIndeterminate(false);

      if (onChange) {
        onChange(e);
      }
    };

    // Size styles
    const sizeClasses = {
      sm: "h-4 w-4",
      default: "h-5 w-5",
      lg: "h-6 w-6",
    };

    const checkboxClasses = cn(
      "rounded border border-gray-300 bg-white",
      "transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
      "checked:bg-blue-600 checked:border-blue-600",
      "disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed",
      "hover:border-blue-400",
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      sizeClasses[size] || sizeClasses.default,
      className
    );

    return (
      <div className="flex flex-col space-y-1">
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-6">
            <input
              type="checkbox"
              id={id}
              ref={ref}
              checked={isChecked}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              className={checkboxClasses}
              style={{
                color: isChecked || isIndeterminate ? "white" : "transparent",
              }}
              {...props}
            />
          </div>

          {label && (
            <div className="flex flex-col">
              <label
                htmlFor={id}
                className={cn(
                  "text-sm font-medium text-gray-700 select-none",
                  disabled && "text-gray-400 cursor-not-allowed",
                  error && "text-red-600"
                )}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {helperText && !error && (
                <p className="text-xs text-gray-500 mt-1">{helperText}</p>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-600 ml-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
