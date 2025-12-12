import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Search,
  History,
  People,
  Chat,
  HelpOutline,
  Notifications,
  Keyboard,
  MoreVert,
  Close,
  Dashboard,
  Person,
  ExitToApp,
} from "@mui/icons-material";
import { LayoutDashboard, Settings } from "lucide-react";
import { colors } from "../../theme/theme";
import { useNavigate } from "react-router-dom";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  background: "rgba(255,255,255,0.15)",
  borderRadius: 50,
  padding: "6px 16px",
  display: "flex",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.3)",
  width: "100%",
  maxWidth: "520px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "400px",
    padding: "4px 12px",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none", // Hide search on very small screens
  },
}));

const MobileSearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  background: "rgba(255,255,255,0.15)",
  borderRadius: 50,
  padding: "6px 16px",
  display: "flex",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.3)",
  width: "100%",
  margin: "0 16px",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "white",
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: "14px",
  "& input::placeholder": {
    color: "rgba(255,255,255,0.7)",
    opacity: 1,
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));

const ShortcutButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  textTransform: "none",
  fontSize: 11,
  padding: "2px 8px",
  minWidth: "auto",
  color: "white",
  border: "1px solid rgba(255,255,255,0.4)",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    fontSize: 10,
    padding: "1px 6px",
  },
}));

const ActionIcon = styled(IconButton)(({ theme }) => ({
  color: "white",
  padding: "6px",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "4px",
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
    },
  },
}));

export const AdminNavbar = (props) => {
  const { onMobileMenuToggle } = props;
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    handleProfileMenuClose();
  };

  const menuItems = [
    { icon: <History />, label: "History", badge: 0 },
    { icon: <Settings />, label: "Settings", badge: 0 },
    { icon: <People />, label: "People", badge: 3 },
    { icon: <Chat />, label: "Chat", badge: 5 },
    { icon: <HelpOutline />, label: "Help", badge: 0 },
  ];

  const mobileMenuItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Settings />, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: colors.primary.main,
          boxShadow: "none",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: "56px", sm: "64px" },
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {/* Left Side: Logo & Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            {/* Mobile Menu Button - Always visible on mobile */}
            <IconButton
              onClick={
                isMobile ? () => setMobileDrawerOpen(true) : onMobileMenuToggle
              }
              sx={{
                color: "white",
                mr: { xs: 1, sm: 2 },
                display: { xs: "flex", lg: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={"../../assets/logo/logo.jpg"}
                alt="logo"
                style={{
                  width: isSmallMobile ? 28 : 32,
                  height: isSmallMobile ? 28 : 32,
                  marginRight: 8,
                  borderRadius: "6px",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
              <Typography
                sx={{
                  color: "white",
                  fontSize: isSmallMobile ? 16 : 20,
                  fontWeight: 600,
                  display: { xs: "none", sm: "block" },
                }}
              >
                teeinblue
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: 600,
                  display: { xs: "block", sm: "none" },
                }}
              >
                TB
              </Typography>
            </Box>

            {/* Requests Badge - Mobile only */}
            {/* {isSmallMobile && (
              <Box sx={{ ml: 1 }}>
                <ShortcutButton>{`${"Requests".charAt(0)}`}</ShortcutButton>
              </Box>
            )} */}
          </Box>

          {/* Center: Search Bar */}
          {!isSmallMobile && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                px: { xs: 1, sm: 2 },
              }}
            >
              <SearchWrapper>
                <Search
                  sx={{ color: "white", opacity: 0.8, fontSize: "20px" }}
                />
                <SearchInput
                  placeholder={
                    isMobile ? "Search..." : "Search for users, documents..."
                  }
                />
                <ShortcutButton variant="outlined">
                  {isMobile ? "⌘K" : "Ctrl + K"}
                </ShortcutButton>
              </SearchWrapper>
            </Box>
          )}

          {/* Mobile Search Button */}
          {isSmallMobile && (
            <ActionIcon onClick={toggleMobileSearch}>
              <Search />
            </ActionIcon>
          )}

          {/* Right Side: Actions & Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1, md: 2 },
            }}
          >
            {/* Requests - Desktop only */}
            {!isSmallMobile && (
              <Typography
                sx={{
                  color: "white",
                  opacity: 0.9,
                  fontSize: { xs: "12px", sm: "14px" },
                  display: { xs: "none", md: "block" },
                }}
              >
                Requests
              </Typography>
            )}

            {/* Action Icons - Show only 2 on mobile, all on desktop */}
            {!isMobile ? (
              // Desktop: Show all icons
              <>
                {menuItems.map((item, index) => (
                  <ActionIcon key={index}>
                    <Badge
                      badgeContent={item.badge || 0}
                      color="error"
                      size="small"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "10px",
                          height: "16px",
                          minWidth: "16px",
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  </ActionIcon>
                ))}
              </>
            ) : !isSmallMobile ? (
              // Tablet: Show first 3 icons + more menu
              <>
                {menuItems.slice(0, 3).map((item, index) => (
                  <ActionIcon key={index}>
                    <Badge
                      badgeContent={item.badge || 0}
                      color="error"
                      size="small"
                    >
                      {item.icon}
                    </Badge>
                  </ActionIcon>
                ))}
                <ActionIcon onClick={handleMoreMenuOpen}>
                  <MoreVert />
                </ActionIcon>
              </>
            ) : (
              // Small Mobile: Show only 1 icon + more menu
              <>
                <ActionIcon>
                  <Badge badgeContent={5} color="error" size="small">
                    <Chat />
                  </Badge>
                </ActionIcon>
                <ActionIcon onClick={handleMoreMenuOpen}>
                  <MoreVert />
                </ActionIcon>
              </>
            )}

            {/* More Menu */}
            <Menu
              anchorEl={moreMenuAnchor}
              open={Boolean(moreMenuAnchor)}
              onClose={handleMoreMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                },
              }}
            >
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={handleMoreMenuClose}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.badge > 0 && (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  )}
                </MenuItem>
              ))}
            </Menu>

            {/* Profile Avatar */}
            <ActionIcon onClick={handleProfileMenuOpen}>
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                sx={{
                  width: isSmallMobile ? 30 : 34,
                  height: isSmallMobile ? 30 : 34,
                  border: "2px solid white",
                  fontSize: isSmallMobile ? "14px" : "16px",
                }}
              >
                A
              </Avatar>
            </ActionIcon>

            {/* Profile Menu */}
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box sx={{ p: 2, borderBottom: "1px solid #e5e7eb" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Admin User
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  admin@teeinblue.com
                </Typography>
              </Box>
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "#ef4444" }}>
                <ListItemIcon sx={{ color: "#ef4444" }}>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>

        {/* Mobile Search Bar (when toggled) */}
        {mobileSearchOpen && isSmallMobile && (
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: colors.primary.dark,
            }}
          >
            <MobileSearchWrapper>
              <Search sx={{ color: "white", opacity: 0.8 }} />
              <SearchInput placeholder="Search..." autoFocus fullWidth />
              <IconButton
                size="small"
                onClick={() => setMobileSearchOpen(false)}
                sx={{ color: "white", ml: 1 }}
              >
                <Close />
              </IconButton>
            </MobileSearchWrapper>
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{
          display: { lg: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: colors.primary.main,
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={"../../assets/logo/logo.jpg"}
                alt="logo"
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 10,
                  borderRadius: "6px",
                }}
              />
              <Typography
                sx={{ color: "white", fontSize: 20, fontWeight: 600 }}
              >
                teeinblue
              </Typography>
            </Box>
            <IconButton
              onClick={() => setMobileDrawerOpen(false)}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {mobileMenuItems.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                navigate(item.path);
                setMobileDrawerOpen(false);
              }}
              sx={{
                py: 1.5,
                px: 3,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "15px",
                    fontWeight: item.label === "Logout" ? 500 : 400,
                    color: item.label === "Logout" ? "#ef4444" : "white",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar
        sx={{
          minHeight: { xs: "56px", sm: "64px" },
          ...(mobileSearchOpen && isSmallMobile && { minHeight: "104px" }),
        }}
      />
    </>
  );
};
