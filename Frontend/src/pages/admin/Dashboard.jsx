import { Box, Grid, Paper, Typography, Card, CardContent } from "@mui/material";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  BarChart as BarChartIcon,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,231",
      change: "+15%",
      icon: DollarSign,
      color: "#0ea5e9",
    },
    {
      title: "Total Users",
      value: "2,431",
      change: "+8%",
      icon: Users,
      color: "#8b5cf6",
    },
    {
      title: "Sales",
      value: "1,231",
      change: "+12%",
      icon: ShoppingCart,
      color: "#10b981",
    },
    {
      title: "Active Now",
      value: "573",
      change: "+5%",
      icon: Activity,
      color: "#f59e0b",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: stat.change.startsWith("+")
                          ? "#10b981"
                          : "#ef4444",
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <TrendingUp size={14} style={{ marginRight: 4 }} />
                      {stat.change} from last month
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: `${stat.color}10`,
                      color: stat.color,
                    }}
                  >
                    <stat.icon size={24} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Tables Area */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <BarChartIcon size={20} />
              Revenue Overview
            </Typography>
            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Chart would be displayed here
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {/* Activity list would go here */}
            <Typography
              color="text.secondary"
              sx={{ mt: 8, textAlign: "center" }}
            >
              Activity feed will appear here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
