import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Alert,
  Divider,
} from "@mui/material";
import { colors } from "../theme/theme";
import { GradientButton, StyledCard } from "../styles/globalStyle";
import { Check } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscribeNewsletter: true,
    agreeTerms: false,
  });

  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Validate password match in real-time
    if (name === "confirmPassword" || name === "password") {
      if (formData.password && formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength < 3) {
      newErrors.password =
        "Password should include uppercase, lowercase, and numbers";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoad(true);

    // Simulate API call
    setTimeout(() => {
      try {
        // Your registration logic here
        console.log("Registration data:", {
          ...formData,
          password: "***", // Don't log actual password
          confirmPassword: "***",
        });

        console.log("Newsletter subscription:", formData.subscribeNewsletter);

        // Navigate to login page or dashboard
        navigate("/login", {
          state: { message: "Registration successful! Please log in." },
        });
      } catch (err) {
        setErrors({ general: "Something went wrong. Please try again." });
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#e5e7eb";
    if (passwordStrength <= 2) return "#ef4444"; // red
    if (passwordStrength === 3) return "#f59e0b"; // amber
    if (passwordStrength === 4) return "#10b981"; // emerald
    return "#0ea5e9"; // blue
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Enter a password";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 p-4">
      <StyledCard>
        {/* Header */}
        <div className="text-center mb-8">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "#1f2937",
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Sign up to get started with your account
          </Typography>
        </div>

        {errors.general && (
          <Alert severity="error" sx={{ borderRadius: "12px", mb: 3 }}>
            {errors.general}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="john_doe"
            required
            error={errors.username}
            helperText={errors.username || ""}
          />

          {/* Email Input */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            error={errors.email}
            helperText={errors.email || ""}
            sx={{ mt: 2 }}
          />

          {/* Password Input */}
          <div className="space-y-2">
            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              placeholder="Create a strong password"
              isPassword
              required
              error={errors.password}
              sx={{ mt: 2 }}
            />

            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>
                    Password strength
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: getPasswordStrengthColor(), fontWeight: 600 }}
                  >
                    {getPasswordStrengthText()}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full"
                      style={{
                        backgroundColor:
                          i <= passwordStrength
                            ? getPasswordStrengthColor()
                            : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-1 mt-2">
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>
                    Password must contain:
                  </Typography>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Check
                        size={14}
                        className={
                          formData.password.length >= 8
                            ? "text-green-500"
                            : "text-gray-300"
                        }
                      />
                      <Typography variant="caption" sx={{ color: "#6b7280" }}>
                        At least 8 characters
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check
                        size={14}
                        className={
                          /[A-Z]/.test(formData.password)
                            ? "text-green-500"
                            : "text-gray-300"
                        }
                      />
                      <Typography variant="caption" sx={{ color: "#6b7280" }}>
                        One uppercase letter
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check
                        size={14}
                        className={
                          /[0-9]/.test(formData.password)
                            ? "text-green-500"
                            : "text-gray-300"
                        }
                      />
                      <Typography variant="caption" sx={{ color: "#6b7280" }}>
                        One number
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <Input
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm your password"
            isPassword
            required
            error={errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  color="primary"
                  sx={{
                    color: errors.agreeTerms ? "#ef4444" : colors.gray.light,
                    "&.Mui-checked": {
                      color: colors.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "#374151" }}>
                  I agree to the{" "}
                  <Link
                    href="#"
                    sx={{ textDecoration: "none", fontWeight: 600 }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    sx={{ textDecoration: "none", fontWeight: 600 }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {errors.agreeTerms && (
              <Typography variant="caption" sx={{ color: "#ef4444", ml: 4 }}>
                {errors.agreeTerms}
              </Typography>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="p-4 rounded-xl border border-blue-100 bg-linear-to-r from-blue-50/50 to-purple-50/50">
            <FormControlLabel
              control={
                <Checkbox
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  color="primary"
                  defaultChecked
                  sx={{
                    color: colors.gray.main,
                    "&.Mui-checked": {
                      color: colors.primary.main,
                    },
                  }}
                />
              }
              label={
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#1f2937" }}
                  >
                    Subscribe to Newsletter
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>
                    Get weekly updates, exclusive offers, and industry insights
                  </Typography>
                </div>
              }
            />
          </div>

          {/* Register Button */}
          <GradientButton
            type="submit"
            fullWidth
            disabled={load}
            startIcon={load && <Loader2 className="animate-spin" />}
            sx={{ mt: 2 }}
          >
            {load ? "Creating Account..." : "Create Account"}
          </GradientButton>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "#9ca3af", px: 2 }}>
              Already have an account?
            </Typography>
          </Divider>

          {/* Sign In Link */}
          <div className="text-center">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                borderColor: "#d1d5db",
                color: "#374151",
                "&:hover": {
                  borderColor: "#0ea5e9",
                  backgroundColor: "rgba(14, 165, 233, 0.04)",
                },
              }}
            >
              Sign In to Existing Account
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            By signing up, you agree to our terms and acknowledge our privacy
            policy.
          </Typography>
        </div>
      </StyledCard>
    </div>
  );
};

export default Register;
