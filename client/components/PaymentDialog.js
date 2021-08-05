import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const PaymentDialog = ({ values, setValues, open, setOpen, btnClick }) => {
  //   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onhandlechange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Payment Details
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <p>Total Amount: {parseInt(values.amount + values.gst3)}</p>
            </Grid>
            <Grid item md={4}>
              <p>Pending Amount: {parseInt(values.pending)}</p>
            </Grid>
            <Grid item md={4}>
              <p>
                Remaining Amount:{" "}
                {parseInt(values.amount + values.gst3 + values.pending) -
                  values.cash -
                  values.online}
              </p>
            </Grid>
            <Grid item md={6}>
              <TextField
                variant="outlined"
                label="Cash"
                fullWidth
                type="Number"
                value={values.cash}
                onChange={onhandlechange("cash")}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                variant="outlined"
                label="Online"
                fullWidth
                type="Number"
                value={values.online}
                onChange={onhandlechange("online")}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                label="Discount"
                fullWidth
                type="Number"
                value={values.discount}
                onChange={onhandlechange("discount")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={btnClick} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaymentDialog;
