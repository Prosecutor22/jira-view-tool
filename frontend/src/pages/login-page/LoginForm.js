import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
//@mui
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";

import Logo from "../../assets/logo.png";
import axios from "axios";

const initialFValues = {
  username: "",
  password: "",
};

// -------------------------------------------------------------------------

export default function LoginForm({role}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [signInError, setSignInError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validateNotEmpty({ [name]: value });
  };

  const validateNotEmpty = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Please enter a username";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Please enter a username";
    setErrors({ ...temp });

    // return true if there aren't any errors
    return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateNotEmpty()) { 
      axios
        .post(`/api/signin-${role}`, values)
        .then((res) => {
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("name", res.data.name);
          if (res.data.role === "admin") navigate("/admin/tasks", { replace: true });
          else if (res.data.role === "team") navigate("/team/tasks", { replace: true });
        })
        .catch((error) => setSignInError(true));
      resetForm();
    }
  };

  const navToStart = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Task Management Tool
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="NTID"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {signInError ? (
            <Typography variant="body2" color="error">
              <em>Wrong NTID or Password</em>
            </Typography>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: 50, mt: 2, mb: 1 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
        <Button onClick={navToStart} sx={{ fontWeight: 500 }}>
          Go back
        </Button>
      </Box>
    </Container>
  );
}
