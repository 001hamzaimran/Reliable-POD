import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search,
  History,
  Settings,
  People,
  Chat,
  HelpOutline,
} from "@mui/icons-material";
import { colors } from "../../theme/theme";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  background: "rgba(255,255,255,0.15)",
  borderRadius: 50,
  padding: "6px 16px",
  width: "520px",
  display: "flex",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.3)",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "white",
  marginLeft: theme.spacing(1),
  flex: 1,
  "& input::placeholder": {
    color: "rgba(255,255,255,0.7)",
    opacity: 1,
  },
}));

const ShortcutButton = styled(Button)(({}) => ({
  borderRadius: 10,
  textTransform: "none",
  fontSize: 12,
  padding: "2px 10px",
  minWidth: "auto",
  color: "white",
  border: "1px solid rgba(255,255,255,0.4)",
}));

export const AdminNavbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: colors.primary.main,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={"../../assets/logo/logo.jpg"}
            alt="logo"
            style={{ width: 32, height: 32, marginRight: 10 }}
          />
          <Typography sx={{ color: "white", fontSize: 20, fontWeight: 600 }}>
            teeinblue
          </Typography>
        </Box>

        {/* Center Search */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <SearchWrapper>
            <Search sx={{ color: "white", opacity: 0.8 }} />
            <SearchInput placeholder="Search" />

            <ShortcutButton variant="outlined">Ctrl + K</ShortcutButton>
          </SearchWrapper>
        </Box>

        {/* Right Side Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ color: "white", opacity: 0.9 }}>
            Requests
          </Typography>

          <IconButton sx={{ color: "white" }}>
            <History />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Settings />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <People />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Chat />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <HelpOutline />
          </IconButton>

          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
            sx={{
              width: 34,
              height: 34,
              border: "2px solid white",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
