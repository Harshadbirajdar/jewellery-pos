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
  getAllTagForSale,
  getCustomerByPhone,
  getMetalByTag,
  getProductByTag,
} from "../redux/action/sale";
import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Sale.module.css";
import Invoice from "../components/Invoice";
import { useReactToPrint } from "react-to-print";
import { round } from "../helper";
import PaymentDialog from "../components/PaymentDialog";

const Sale = ({
  Customer,
  addCustomer,
  fetchCustomer,
  fetchProductByTag,
  Tag,
  genrateBill,
  getMetalByTag,
  Bill,
  getAllTagList,
  TagList,
  MetalTag,
}) => {
  const [values, setValues] = useState({
    product: [],
    amount: 0,
    gst3: 0,
    cash: "",
    online: "",
    discount: "",
    totalAmount: 0,
    pending: 0,
  });
  const [product, setProduct] = useState({
    grossWt: "",
    netWt: "",
    labour: "",
    labourOn: "",
    metal: "",
    name: "",
    hsn: "",
    gst: "",
    rate: "",
    qty: "",
    tag: "",
  });

  const countTotalAmount = () => {
    let amount = values.product.reduce((a, b) => a + b.amount, 0);
    setValues({
      ...values,
      amount,
      totalAmount: values.gst3 + amount,
    });
  };

  const [paymentDialog, setPaymentDialog] = useState(false);

  const componentRef = useRef();
  useEffect(() => {
    getAllTagList();
    // eslint-disable-next-line
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@page {  margin: 0.27in 0.27in;size:A5;}",
    onAfterPrint: () => {},
  });

  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const nameRef = useRef();
  const tagRef = useRef();
  const grossRef = useRef();
  const netRef = useRef();
  const qtyRef = useRef();
  const labourRef = useRef();
  const rateRef = useRef();

  useEffect(() => {
    countTotalAmount();
    //  eslint-disable-next-line
  }, [values.product?.length]);

  const handleChange = (name) => (event) => {
    setProduct({ ...product, [name]: event.target.value });
  };

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
              if (tag > 100) {
                fetchProductByTag(tag, setTag, values, setValues, setOpen);
              } else {
                getMetalByTag(tag, grossRef, product, setProduct, setOpen);
              }
            }
          }}
          inputRef={tagRef}
        />
      </Grid>
      <Grid item md={2}>
        <Autocomplete
          options={TagList.tag}
          getOptionLabel={(option) => option.name}
          //   style={{ width: 300 }}
          // value={""}
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
      <Grid item md={1}>
        <TextField
          variant="outlined"
          label="Gorss Wt"
          type="Number"
          inputRef={grossRef}
          value={product.grossWt}
          onChange={handleChange("grossWt")}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              netRef.current.focus();
            }
          }}
        />
      </Grid>
      <Grid item md={1}>
        <TextField
          variant="outlined"
          label="Net Wt"
          type="Number"
          value={product.netWt}
          inputRef={netRef}
          onChange={handleChange("netWt")}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              labourRef.current.focus();
            }
          }}
        />
      </Grid>
      <Grid item md={2}>
        <TextField
          variant="outlined"
          label="Labour"
          type="Number"
          inputRef={labourRef}
          value={product.labour}
          onChange={handleChange("labour")}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              qtyRef.current.focus();
            }
          }}
        />
      </Grid>
      <Grid item md={2}>
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
      <Grid item md={1}>
        <TextField
          variant="outlined"
          label="Qty"
          type="Number"
          inputRef={qtyRef}
          value={product.qty}
          onChange={handleChange("qty")}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              rateRef.current.focus();
            }
          }}
        />
      </Grid>
      <Grid item md={1}>
        <TextField
          variant="outlined"
          label="Rate"
          type="Number"
          inputRef={rateRef}
          value={product.rate}
          onChange={handleChange("rate")}
        />
      </Grid>
      <Grid item md={1} style={{ marginTop: "0.7em" }}>
        <Button color="primary" variant="contained" onClick={onAddClick}>
          Add
        </Button>
      </Grid>
    </Grid>
  );

  const onAddClick = () => {
    let localProduct = product;
    let products = values.product;
    let gst3 = values.gst3;
    let gst = 0;
    let amount = localProduct.netWt * localProduct.rate;
    localProduct.tag = tag;
    if (localProduct.labourOn === 1) {
      let labour = round(amount * (parseInt(localProduct.labour) / 100));
      localProduct.labour = labour;
      localProduct.amount = amount + labour;
    } else {
      localProduct.amount =
        localProduct.netWt * localProduct.rate + parseInt(localProduct.labour);
    }
    gst = (localProduct.amount * parseInt(localProduct.gst)) / 100;
    if (parseInt(localProduct.gst) === 3) {
      gst3 += gst;
    }
    products.push(localProduct);
    setValues({ ...values, gst3, product: products });
    setProduct({
      grossWt: "",
      netWt: "",
      labour: "",
      labourOn: "",
      metal: "",
      name: "",
      hsn: "",
      gst: "",
      rate: "",
      qty: "",
      tag: "",
    });
    setTag("");
  };
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
          <TableRow key={index}>
            <TableCell>{product.tag}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.metal.name}</TableCell>
            <TableCell>{product.hsn}</TableCell>
            <TableCell>{product.grossWt}</TableCell>
            <TableCell>{product.netWt}</TableCell>
            <TableCell>{product.rate}</TableCell>
            <TableCell>{product.qty}</TableCell>
            <TableCell>{product.labour}</TableCell>
            <TableCell>{product.amount.toFixed(2)}</TableCell>
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
      <Container>
        {msg()}
        <PaymentDialog
          values={values}
          setValues={setValues}
          open={paymentDialog}
          setOpen={setPaymentDialog}
          btnClick={() => {
            genrateBill(values, setValues, handlePrint, setPaymentDialog);
          }}
        />
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
            <div className={styles.totalCount}>
              <h1>{parseInt(values.amount + values.gst3)}</h1>
            </div>
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
            // genrateBill(values, setValues, handlePrint);
            setPaymentDialog(true);
          }}
        >
          <SaveIcon />
          Save
        </Fab>
        <div style={{ display: "none" }}>
          {Object.keys(Bill.bill).length !== 0 && (
            <Invoice bill={Bill.bill} ref={componentRef} />
          )}
        </div>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Customer: state.sale.customer,
  Tag: state.sale.tag,
  Bill: state.sale.bill,
  TagList: state.sale.tagList,
  MetalTag: state.sale.metalTag,
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
  genrateBill: (values, setValues, handlePrint, setPaymentDialog) => {
    dispatch(genrateBill(values, setValues, handlePrint, setPaymentDialog));
  },
  getMetalByTag: (tag, grossRef, values, setValues, setOpen) => {
    dispatch(getMetalByTag(tag, grossRef, values, setValues, setOpen));
  },
  getAllTagList: () => {
    dispatch(getAllTagForSale());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isStaff(Sale));
