import { useState } from "react";
import { useNavigate } from "react-router-dom";
//@mui
import {
  TextField,
  Link,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
// components

const initialFValues = {
  ntid: "",
};

// -------------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("ntid" in fieldValues)
      temp.ntid = fieldValues.ntid ? "" : "Enter your NTID!";
    setErrors({ ...temp });

    // return true if there're any errors
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/", { replace: true });
      resetForm();
    }
  };

  const handleNavToLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h3">
        Register an account
      </Typography>


      <TextField
        margin="normal"
        fullWidth
        label="Your NTID"
        name="ntid"
        value={values.ntid}
        onChange={handleInputChange}
        {...(errors.ntid && {
          error: true,
          helperText: errors.ntid,
        })}
      />


      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ height: 50, m: 2, width: "50%" }}
        onClick={handleSubmit}
      >
        Register
      </Button>

      <Box
        sx={{
          display: "flex",
          gap: 0.5,
        }}
      >
        <Typography variant="body2">Already have account?</Typography>
        <Link
          onClick={handleNavToLogin}
          tabIndex={0}
          component="button"
          variant="body2"
        >
          {"Log In"}
        </Link>
      </Box>
    </Box>
  );
}
