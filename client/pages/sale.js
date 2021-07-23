import {
  Container,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Button,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Snackbar,
  Fab,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import isStaff from "../components/isStaff";
import Base from "../core/Base";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  addNewCustomer,
  genrateBill,
  getCustomerByPhone,
  getProductByTag,
} from "../redux/action/sale";
import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Sale.module.css";
import Invoice from "../components/Invoice";
import { useReactToPrint } from "react-to-print";

const sale = ({
  Customer,
  addCustomer,
  fetchCustomer,
  fetchProductByTag,
  Tag,
  genrateBill,

  Bill,
}) => {
  const [values, setValues] = useState({
    product: [],
    amount: 0,
    gst3: 0,
  });
  const [gst3, setGst3] = useState(0);
  const [gst5, setGst5] = useState(0);
  const countTotalAmount = () => {
    let amount = values.product.reduce((a, b) => a + b.amount, 0);
    setValues({
      ...values,
      amount,
      totalAmount: values.gst3 + amount,
    });
  };

  const componentRef = useRef();
  useEffect(() => {
    console.log(componentRef.current?.clientHeight);
  }, [componentRef]);
  // console.log(values.product);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle:
      "{margin:0.5em; border: 1px solid !important; body { border:2px #666 solid;} }",
    onAfterPrint: () => {
      // setDialog(false);
      // clearCustomer();
    },
    // onBeforeGetContent: (a) => {
    //   console.log(a);
    // },
  });
  // console.log(values.product.reduce((a, b) => a + b.amount, 0));
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const nameRef = useRef();
  const tagRef = useRef();

  const metal = [
    { name: "Gold", purity: "22K" },
    { name: "Gold", purity: "24K" },
    { name: "Gold", purity: "20K" },
  ];

  useEffect(() => {
    countTotalAmount();
  }, [values.product.length]);

  const billForm = () => (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <TextField
          variant="outlined"
          label="Tag no"
          type="Number"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              fetchProductByTag(tag, setTag, values, setValues, setOpen);
              // countTotalAmount();
            }
          }}
          inputRef={tagRef}
        />
      </Grid>
      <Grid item md={2}>
        <Autocomplete
          options={metal}
          getOptionLabel={(option) => option.name + " " + option.purity}
          //   style={{ width: 300 }}
          // value={product.metal !== undefined && product.metal}
          //   onInputChange={(event, newInputValue) => {
          //     setProduct({ ...product, metal: newInputValue });
          //   }}
          //   onChange={(event, newValue) => {
          //     setProduct({ ...product, metal: newValue });
          //   }}
          renderInput={(params) => (
            <TextField {...params} label="Metal" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item md={1}>
        <TextField variant="outlined" label="Gorss Wt" type="Number" />
      </Grid>
      <Grid item md={1}>
        <TextField variant="outlined" label="Net Wt" type="Number" />
      </Grid>
      <Grid item md={2}>
        <TextField variant="outlined" label="Labour" type="Number" />
      </Grid>
      <Grid item md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Labour on</InputLabel>
          <Select
            // value={product.labourOn}
            // onChange={(e) => {
            //   setProduct({ ...product, labourOn: e.target.value });
            // }}
            label="Labour on"
          >
            <MenuItem value={0}>Fixed</MenuItem>
            <MenuItem value={1}>Percentage</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={1}>
        <TextField variant="outlined" label="Qty" type="Number" />
      </Grid>
      <Grid item md={1}>
        <TextField variant="outlined" label="Rate" type="Number" />
      </Grid>
      <Grid item md={1} style={{ marginTop: "0.7em" }}>
        <Button color="primary" variant="contained" onClick={handlePrint}>
          Add
        </Button>
      </Grid>
    </Grid>
  );

  const ProductTable = () => (
    <Table>
      <TableHead>
        <TableCell>Tag</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Metal</TableCell>
        <TableCell>HSN</TableCell>
        <TableCell>Gross Wt</TableCell>
        <TableCell>Net Wt</TableCell>
        <TableCell>Rate</TableCell>
        <TableCell>qty</TableCell>
        <TableCell>Labour</TableCell>
        <TableCell>Amount</TableCell>
      </TableHead>
      <TableBody>
        {values.product.map((product, index) => (
          <TableRow>
            <TableCell>{product.tag}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.metal.name}</TableCell>
            <TableCell>{product.hsn}</TableCell>
            <TableCell>{product.grossWt}</TableCell>
            <TableCell>{product.netWt}</TableCell>
            <TableCell>{product.rate}</TableCell>
            <TableCell>{product.qty}</TableCell>
            <TableCell>{product.labour}</TableCell>
            <TableCell>{product.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
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
        <Alert onClose={handleClose} severity={Tag.error ? "error" : "success"}>
          {Tag.error}
        </Alert>
      </Snackbar>
    );
  };
  return (
    <Base title="Sale Panel">
      {values.amount}
      <br />
      {values.gst3}
      <Container>
        {msg()}
        <Paper style={{ padding: "1.5em" }}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Phone Number"
                type="number"
                variant="outlined"
                value={values.customer?.phoneNumber || ""}
                onChange={(e) => {
                  setValues({
                    ...values,
                    customer: {
                      ...values.customer,
                      phoneNumber: e.target.value,
                    },
                  });
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    fetchCustomer(values, setValues, nameRef, tagRef);
                  }
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                inputRef={nameRef}
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.customer?.name || ""}
                onChange={(e) => {
                  setValues({
                    ...values,
                    customer: {
                      ...values.customer,
                      name: e.target.value,
                    },
                  });
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    addCustomer(values, setValues, tagRef);
                  }
                }}
              />
            </Grid>
          </Grid>
          {billForm()}
        </Paper>

        {ProductTable()}
        <Fab
          color="primary"
          variant="extended"
          className={styles.extendedIcon}
          disabled={values.product.length === 0}
          onClick={() => {
            genrateBill(values, setValues);
          }}
        >
          <SaveIcon />
          Save
        </Fab>
        {Object.keys(Bill.bill).length !== 0 && (
          <Invoice bill={Bill.bill} ref={componentRef} />
        )}

        {/* {invoice()} */}
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Customer: state.sale.customer,
  Tag: state.sale.tag,
  Bill: state.sale.bill,
});

const mapDispatchToProps = (dispatch) => ({
  addCustomer: (values, setValues, tagRef) => {
    dispatch(addNewCustomer(values, setValues, tagRef));
  },
  fetchCustomer: (values, setValues, nameRef, tagRef) => {
    dispatch(getCustomerByPhone(values, setValues, nameRef, tagRef));
  },
  fetchProductByTag: (tag, setTag, values, setValues, setOpen) => {
    dispatch(getProductByTag(tag, setTag, values, setValues, setOpen));
  },
  genrateBill: (values, setValues) => {
    dispatch(genrateBill(values, setValues));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isStaff(sale));
