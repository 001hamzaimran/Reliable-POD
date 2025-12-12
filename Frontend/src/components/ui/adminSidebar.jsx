import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, HelpCircle } from "lucide-react";
export const AdminSidebar = () => {
  const navigate = useNavigate();
  const sidebarStyles = {
    root: {
      height: "100vh",
      background: "#3b6d92", // Your color
      color: "#fff",
    },
    menu: {
      padding: "0 10px",
    },
  };

  return (
    <Sidebar
      // hidden
      style={sidebarStyles.root}
      backgroundColor="#3b6d92"
      rootStyles={{
        background: "#3b6d92 !important",
        color: "#fff",
        height: "100vh",
        marginTop: "64px",
      }}
    >
      {/* Logo/Header */}
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "#2a5070", // Darker shade for header
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: 0,
            color: "#fff",
          }}
        >
          Admin Panel
        </h2>
        <p
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            margin: "4px 0 0 0",
          }}
        >
          v2.0.0
        </p>
      </div>

      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            const backgroundColor = active ? "#2a5070" : "transparent";
            const color = disabled ? "#9ca3af" : "#ffffff";

            return {
              color: color,
              backgroundColor: backgroundColor,
              "&:hover": {
                backgroundColor: "#4a7da9",
              },
              padding: "12px 16px",
              borderRadius: "8px",
              margin: "4px 8px",
            };
          },
          subMenuContent: ({ level }) => ({
            backgroundColor: "#3b6d92", // Match sidebar color
            color: "#ffffff",
            marginLeft: "8px",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          }),

          // SubMenu label styles
          subMenuRoot: {
            backgroundColor: "#3b6d92",
            color: "#ffffff",
          },

          label: {
            fontSize: "14px",
            fontWeight: "500",
          },
          icon: {
            color: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <MenuItem
          onClick={() => navigate("/admin")}
          icon={<LayoutDashboard size={18} />}
        >
          Dashboard
        </MenuItem>
        {/* <SubMenu label="Content" icon={<FileText size={18} />}>
          <MenuItem>Posts</MenuItem>
          <MenuItem>Pages</MenuItem>
          <MenuItem>Media</MenuItem>
        </SubMenu> */}
        <MenuItem
          onClick={() => navigate("/admin/settings")}
          icon={<Settings size={18} />}
        >
          Settings
        </MenuItem>
        <MenuItem icon={<HelpCircle size={18} />}>Help Center</MenuItem>
      </Menu>
    </Sidebar>
  );
};
