import {
  Container,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  capitalize,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Base from "../../../core/Base";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from "../../../styles/Product.module.css";
import { connect } from "react-redux";
import { addProduct, getMetalList } from "../../../redux/action/addProduct";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Save";
import isStaff from "../../../components/isStaff";

const add = ({ fetchMetalList, Metal, addProduct }) => {
  useEffect(() => {
    fetchMetalList();
  }, []);

  const [product, setProduct] = useState({
    name: "",
    metal: "",
    shortName: "",
    hsn: "",
    gst: "",
    grossWt: "",
    netWt: "",
    labour: "",
    labourOn: "",
    qty: "",
  });

  const [values, setValues] = useState([]);
  const onhandleChange = (name) => (event) => {
    setProduct({ ...product, [name]: capitalize(event.target.value) });
  };

  const onAddClick = (e) => {
    e.preventDefault();
    let array = values;
    array.push(product);
    setValues(array);
    setProduct({
      ...product,
      grossWt: "",
      netWt: "",
      labour: "",
      labourOn: "",
      qty: "",
    });
    console.log(values);
  };
  const Tables = () => (
    <Table>
      <TableHead>
        <TableCell>PR Name</TableCell>
        <TableCell>Metal</TableCell>
        <TableCell>Short Name</TableCell>
        <TableCell>HSN</TableCell>
        <TableCell>GST%</TableCell>
        <TableCell>Gross WT</TableCell>
        <TableCell>Net WT</TableCell>
        <TableCell>Labour</TableCell>
        <TableCell>Labour on</TableCell>
        <TableCell>Qty</TableCell>
      </TableHead>
      <TableBody>
        {values.map((product, index) => (
          <TableRow key={index}>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              {product.metal.name + " " + product.metal.purity}
            </TableCell>
            <TableCell>{product.shortName}</TableCell>
            <TableCell>{product.hsn}</TableCell>
            <TableCell>{product.gst}</TableCell>
            <TableCell>{product.grossWt}</TableCell>
            <TableCell>{product.netWt}</TableCell>
            <TableCell>{product.labour}</TableCell>
            <TableCell>
              {product.labourOn === 0 ? "Fixed" : "Percentage"}
            </TableCell>
            <TableCell>{product.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  return (
    <Base title="Add Product">
      <Container>
        <Paper>
          <form>
            <Grid container className={styles.form} spacing={2}>
              <Grid item md={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Produtc Name"
                  autoFocus
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  value={product.name}
                  onChange={onhandleChange("name")}
                />
              </Grid>
              <Grid className={styles.auto_compelete}>
                <Autocomplete
                  options={Metal.metal}
                  getOptionLabel={(option) => option.name + " " + option.purity}
                  style={{ width: 300 }}
                  // value={product.metal !== undefined && product.metal}
                  onInputChange={(event, newInputValue) => {
                    setProduct({ ...product, metal: newInputValue });
                  }}
                  onChange={(event, newValue) => {
                    setProduct({ ...product, metal: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Metal" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Shrot Name"
                  value={product.shortName}
                  onChange={onhandleChange("shortName")}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="HSN"
                  value={product.hsn}
                  type="Number"
                  onChange={onhandleChange("hsn")}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="GST%"
                  value={product.gst}
                  type="Number"
                  onChange={onhandleChange("gst")}
                />
              </Grid>
            </Grid>
          </form>
          <hr />
          <form className={styles.form}>
            <Grid container spacing={2}>
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type="Number"
                  label="Gross weight"
                  value={product.grossWt}
                  onChange={onhandleChange("grossWt")}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type="Number"
                  label="Net weight"
                  value={product.netWt}
                  onChange={onhandleChange("netWt")}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type="Number"
                  label="Labour"
                  value={product.labour}
                  onChange={onhandleChange("labour")}
                />
              </Grid>
              <Grid item md={2} style={{ marginTop: "1.1em" }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Labour on</InputLabel>
                  <Select
                    value={product.labourOn}
                    onChange={(e) => {
                      setProduct({ ...product, labourOn: e.target.value });
                    }}
                    label="Labour on"
                  >
                    <MenuItem value={0}>Fixed</MenuItem>
                    <MenuItem value={1}>Percentage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type="Number"
                  label="Qty"
                  value={product.qty}
                  onChange={onhandleChange("qty")}
                />
              </Grid>
              <Grid item md={2} style={{ marginTop: "1.6em" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onAddClick}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {Tables()}

        <Fab
          className={styles.fab}
          color="primary"
          variant="extended"
          aria-label="add"
          disabled={values.length === 0}
          onClick={(e) => {
            addProduct(values, setValues, setProduct);
          }}
        >
          <SendIcon className={styles.fab_icon} />
          Save
        </Fab>
      </Container>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  Metal: state.addProduct.metal,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMetalList: () => {
    dispatch(getMetalList());
  },
  addProduct: (values, setValues, setProduct) => {
    dispatch(addProduct(values, setValues, setProduct));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(isStaff(add));
