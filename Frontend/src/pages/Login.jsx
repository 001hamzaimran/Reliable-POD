import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { Typography, Link, Alert } from "@mui/material";
import { GradientButton, StyledCard } from "../styles/globalStyle";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
    subscribeNewsletter: true, // Default to subscribed
  });

  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: false,
      password: false,
    });
    setLoad(true);

    // Validation
    if (!formData.email || !formData.password) {
      setErrors("Please fill in all required fields");
      setLoad(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      try {
        // Your login logic here
        const success = login(formData.email, formData.password, formData.role);

        if (success) {
          console.log("Newsletter subscription:", formData.subscribeNewsletter);

          // Navigate based on role
          navigate(formData.role === "admin" ? "/admin" : "/user");
        } else {
          setErrors("Invalid credentials. Please try again.");
        }
      } catch (err) {
        setErrors("Something went wrong. Please try again.");
      } finally {
        setLoad(false);
      }
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic
    console.log("Forgot password clicked");
    // You can navigate to forgot password page or show modal
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 p-4">
      <StyledCard>
        {/* Header */}
        <div className="text-center mb-8">
          <Typography
            variant="h4"
            component="h1"
            className="text-gray-800 mb-2"
            style={{ fontWeight: "bold" }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-gray-500"
          >
            Sign in to continue to your account
          </Typography>
        </div>

        {(errors.email || errors.password) && (
          <Alert
            severity="error"
            className="mb-6 rounded-xl"
            sx={{ borderRadius: "12px" }}
          >
            {errors}
          </Alert>
        )}

        <div className="space-y-5">
          {/* Email Input */}
          <div className="mb-5">
            <Input
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              error={errors.email}

              // helperText="Enter your email address"
            />
          </div>

          {/* Password Input with show/hide toggle */}
          <div className="mb-5">
            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              isPassword
              required
              error={errors.password}
            />
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between">
            <div />
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800 font-medium"
              sx={{ textDecoration: "none" }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <GradientButton
            type="submit"
            fullWidth
            disabled={load}
            onClick={handleSubmit}
            startIcon={load ? <Loader2 className="animate-spin" /> : null}
          >
            {load ? "Signing in..." : "Sign In"}
          </GradientButton>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <Typography variant="body2" className="text-gray-600">
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body2"
                className="text-blue-600 hover:text-blue-800 font-semibold"
                sx={{ textDecoration: "none" }}
                onClick={() => navigate("/signup")}
              >
                Sign up now
              </Link>
            </Typography>
          </div>
        </div>
      </StyledCard>
    </div>
  );
};

export default Login;
