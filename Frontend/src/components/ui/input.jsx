// components/ui/Input.jsx
import React, { forwardRef } from "react";

export const Input = forwardRef(
  (
    {
      label,
      type = "text",
      value = "",
      onChange,
      placeholder,
      className = "",
      error,
      success,
      disabled = false,
      required = false,
      id,
      name,
      helperText,
      autoComplete = "off",
      ...props
    },
    ref
  ) => {
    const inputId =
      id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Status-based colors
    const getBorderColor = () => {
      if (error) return "border-red-500 focus:border-red-500";
      if (success) return "border-green-500 focus:border-green-500";
      return "border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200";
    };

    const getTextColor = () => {
      if (error) return "text-red-500";
      if (success) return "text-green-500";
      return "text-neutral-800";
    };

    const inputClasses = `
      w-full px-4 py-3
      bg-white border rounded-lg
      placeholder:text-neutral-500
      focus:outline-none focus:transition-all focus:duration-200
      disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70
      ${getBorderColor()}
      ${className}
    `;

    const labelClasses = `
      block text-sm font-medium mb-2
      ${getTextColor()}
      ${disabled ? "opacity-50" : ""}
    `;

    const helperTextClasses = `
      text-sm mt-1
      ${
        error ? "text-red-600" : success ? "text-green-600" : "text-neutral-500"
      }
    `;

    return (
      <div className="w-full space-y-1">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Field */}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            className={inputClasses}
            {...props}
          />
        </div>

        {/* Helper Text & Error/Success Messages */}
        {(error || success || helperText) && (
          <div className="flex items-center gap-1.5">
            {error && (
              <svg
                className="w-4 h-4 text-red-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {success && (
              <svg
                className="w-4 h-4 text-green-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className={helperTextClasses}>
              {error || success || helperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
