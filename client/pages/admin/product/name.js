import React, { useState } from "react";
import { connect } from "react-redux";
import Base from "../../../core/Base";
import { createProductName } from "../../../redux/action/productName";
import isAdmin from "../../../components/isAdmin";
import SaveIcon from "@material-ui/icons/Save";
import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";
import Message from "../../../components/Message";
const Name = ({ addProduct, Product }) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
  });
  return (
    <Base title="Add Product Name">
      <Container maxWidth="md">
        <Message
          setOpen={setOpen}
          open={open}
          successMsg={`${Product.item.name} is Added Successfully`}
          error={Product.error}
        />
        <Paper className="paper">
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Product Name"
                value={values.name}
                onChange={(e) => {
                  setValues({ name: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addProduct(values, setValues, setOpen);
                }}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Product: state.productName.item,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (values, setValues, setOpen) => {
    dispatch(createProductName(values, setValues, setOpen));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(Name));
