import { useNavigate } from "react-router-dom";
//@mui
import { Link, Button, Typography, Box, Container } from "@mui/material";

import Logo from "../../assets/logo.png";

// -------------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const handleNavToRegister = () => {
    navigate("/register", { replace: true });
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
        <Typography component="h1" variant="h3">
          Task Management Tool
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Typography variant="h5">Login as</Typography>
          
          <Button
            color="grey"
            fullWidth
            variant="contained"
            onClick={() => navigate("/login-admin", { replace: true })}
          >
            Administrator
          </Button>

          <Button
            color="grey"
            fullWidth
            variant="contained"
            onClick={() => navigate("/login-team", { replace: true })}
          >
            User
          </Button>

          
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            mt: 3,
          }}
        >
          <Typography variant="body2">You don't have account?</Typography>
          <Link
            onClick={handleNavToRegister}
            tabIndex={0}
            component="button"
            variant="body2"
          >
            {"Register"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
