import {
  Container,
  Paper,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import React, { useState } from "react";
import Base from "../../../core/Base";
import styles from "../../../styles/Create.module.css";
import isAdmin from "../../../components/isAdmin";
import { connect } from "react-redux";
import { addNewMetal } from "../../../redux/action/metal";
import { Alert } from "@material-ui/lab";
const Create = ({ createMetal, Metal }) => {
  const [values, setValues] = useState({
    name: "",
    purity: "",
  });
  const [open, setOpen] = useState(false);
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const msg = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Metal.error ? "error" : "success"}
        >
          {Metal.error || `${Metal.metal.name} created successfully`}
        </Alert>
      </Snackbar>
    );
  };
  return (
    <Base title="Create Metal">
      <Paper className={styles.paper}>
        {msg()}
        <Container maxWidth="md">
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Metal Name"
              autoFocus
              value={values.name}
              onChange={handleChange("name")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Purity"
              value={values.purity}
              onChange={handleChange("purity")}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                createMetal(values, setValues, setOpen);
              }}
            >
              ADD
            </Button>
          </form>
        </Container>
      </Paper>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Metal: state.metal.create,
});
const mapDispatchToProps = (dispatch) => ({
  createMetal: (values, setValues, setOpen) => {
    dispatch(addNewMetal(values, setValues, setOpen));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(Create));
