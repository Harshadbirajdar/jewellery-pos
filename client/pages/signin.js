import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { setToken, signin } from "../components/api";
import { Alert } from "@material-ui/lab";
import styles from "../styles/Signin.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Signin = () => {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("role")) {
      router.replace("/");
    }
  }, []);
  const [values, setValues] = useState({
    userName: "",
    password: "",
    loading: false,
    error: false,
    success: false,
  });

  const onhandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false, success: false });
    signin(values)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            success: false,
          });
        } else {
          setToken(data.accessToken, data.refreshToken, data.user.role);
          setValues({ ...values, loading: false, error: false, success: true });
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={styles.paper}>
        <Avatar className={styles.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {values.error && <Alert severity="error">{values.error}</Alert>}
        <form className={styles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={values.userName}
            onChange={onhandleChange("userName")}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={values.password}
            onChange={onhandleChange("password")}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            // className={classes.submit}
            disabled={values.loading}
          >
            {values.loading ? "Please Wait" : "Sign In"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Signin;
