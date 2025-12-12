import { Button, Box } from "@mui/material";
import { colors } from "../theme/theme";
import { styled } from "@mui/material/styles";

export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%)`,

  borderRadius: "12px",
  padding: "10px 10px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  color: "#ffffff",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 24px rgba(14, 165, 233, 0.3)",
    background: `linear-gradient(90deg, ${colors.primary.dark} 0%, ${colors.primary.light} 100%)`,
  },
  "&.Mui-disabled": {
    background: "#e5e7eb",
  },
}));

export const StyledCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  boxShadow:
    "0 20px 60px rgba(0, 0, 0, 0.08), 0 0 20px rgba(0, 119, 255, 0.05)",
  padding: "48px 40px",
  width: "100%",
  maxWidth: "440px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%)`,

    borderRadius: "24px 24px 0 0",
  },
}));
