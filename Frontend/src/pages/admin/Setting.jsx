import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FilledInput,
} from "@mui/material";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Visibility,
  VisibilityOff,
  Save as SaveIcon,
} from "@mui/icons-material";

const SettingsScreen = () => {
  // State for form fields
  const [userInfo, setUserInfo] = useState({
    email: "rufik0254@gmail.com",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    name: "",
    contactEmail: "",
    phone: "",
    address: "123 Main St, City, Country",
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (
      userInfo.newPassword &&
      userInfo.newPassword !== userInfo.confirmPassword
    ) {
      setNotification({
        open: true,
        message: "New passwords do not match",
        severity: "error",
      });
      return;
    }

    // Here you would typically make an API call
    console.log("Saving user info:", userInfo);

    setNotification({
      open: true,
      message: "Settings saved successfully!",
      severity: "success",
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Container>
      <Paper elevation={2} sx={{ p: 4, mt: 3 }}>
        {/* User Information Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonIcon color="primary" />
            YOUR USER INFORMATION
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The following is the user you registered to our App with.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="EMAIL"
                variant="filled"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="USERNAME"
                variant="filled"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Change Password Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            CHANGE PASSWORD
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Change your password for our App.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Change Your Password
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Current Password</InputLabel>
                <FilledInput
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  value={userInfo.currentPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("current")}
                        edge="end"
                      >
                        {showPassword.current ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>New Password</InputLabel>
                <FilledInput
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  value={userInfo.newPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("new")}
                        edge="end"
                      >
                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Confirm New Password</InputLabel>
                <FilledInput
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("confirm")}
                        edge="end"
                      >
                        {showPassword.confirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <EmailIcon color="primary" />
            YOUR CONTACT INFORMATION
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            We will use your contact details on orders that do not contain a
            customer email and phone. This is needed to assist with customs
            processing.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="NAME"
                variant="filled"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="EMAIL"
                variant="filled"
                name="contactEmail"
                value={userInfo.contactEmail}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PHONE"
                variant="filled"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Address Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationIcon color="primary" />
            YOUR ADDRESS
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            We will only use your store's address to setup your payment options
            and invoices.
          </Typography>

          <TextField
            fullWidth
            label="Store Address"
            variant="filled"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Save Button */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ px: 4, py: 1.5 }}
          >
            Save All Changes
          </Button>
        </Box>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SettingsScreen;
