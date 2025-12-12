import { createTheme } from "@mui/material/styles";

// Define your custom colors
export const colors = {
  primary: {
    main: "#3b6d92", // Your custom primary color
    light: "#4a85b3",
    dark: "#2d5680",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#f05a28", // Your custom secondary color
    light: "#ff6d3c",
    dark: "#d4491a",
    contrastText: "#ffffff",
  },
  gray: {
    main: "#747474",
    light: "#8a8a8a",
    dark: "#5c5c5c",
    contrastText: "#ffffff",
  },
  silver: {
    main: "#bfbfbf",
    light: "#d4d4d4",
    dark: "#a3a3a3",
    contrastText: "#ffffff",
  },
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
  },
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
  },
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
  },
  background: {
    default: "#f8fafc",
    paper: "#ffffff",
  },
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
  },
};

// Create the theme
const theme = createTheme({
  palette: {
    mode: "light", // or 'dark' for dark mode
    ...colors,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none", // To remove uppercase transformation
    },
  },
  shape: {
    borderRadius: 8, // Custom border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: "none",
          padding: "8px 24px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          },
        },
        contained: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.875rem",
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)",
            },
          },
        },
      ],
    },
  },
});

export default theme;
