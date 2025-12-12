import { forwardRef, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Material UI Input component with all features
const Input = forwardRef(
  (
    {
      className = "",
      type = "text",
      label,
      placeholder,
      error,
      helperText,
      disabled = false,
      required = false,
      icon: Icon,
      isPassword = false,
      fullWidth = true,
      variant = "outlined",
      size = "medium",
      sx = {},
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    // If it's a password field with toggle
    if (isPassword) {
      return (
        <FormControl
          fullWidth={fullWidth}
          variant={variant}
          error={!!error}
          disabled={disabled}
          sx={sx}
          className={className}
        >
          <InputLabel required={required}>{label}</InputLabel>
          <OutlinedInput
            inputRef={ref}
            type={showPassword ? "text" : "password"}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "hide password" : "show password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              Icon && (
                <InputAdornment position="start">
                  <Icon sx={{ color: "action.active" }} />
                </InputAdornment>
              )
            }
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "error.main" : "grey.300",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "error.main" : "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                borderWidth: "2px",
              },
            }}
            {...props}
          />
          {(error || helperText) && (
            <FormHelperText error={!!error}>
              {error || helperText}
            </FormHelperText>
          )}
        </FormControl>
      );
    }

    // Regular input field
    return (
      <TextField
        inputRef={ref}
        fullWidth={fullWidth}
        label={label}
        type={type}
        placeholder={placeholder}
        variant={variant}
        size={size}
        error={!!error}
        helperText={error || helperText}
        disabled={disabled}
        required={required}
        InputProps={{
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: "12px",
            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: error ? "error.main" : "grey.300",
              },
              "&:hover fieldset": {
                borderColor: error ? "error.main" : "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                borderWidth: "2px",
              },
            },
          },
        }}
        sx={{
          "& .MuiFormLabel-asterisk": {
            color: "error.main",
          },
          ...sx,
        }}
        className={className}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

// Simplified version with only essential features
export const SimpleInput = forwardRef(
  (
    {
      label,
      placeholder,
      error,
      helperText,
      isPassword = false,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        inputRef={ref}
        fullWidth={fullWidth}
        label={label}
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        placeholder={placeholder}
        variant="outlined"
        error={!!error}
        helperText={error || helperText}
        itemProp={
          isPassword
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
        {...props}
      />
    );
  }
);

SimpleInput.displayName = "SimpleInput";
