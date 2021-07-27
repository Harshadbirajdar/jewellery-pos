import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { getAllMetalListForRate, updateRate } from "../redux/action/rate";
import { connect } from "react-redux";
import { Container, Grid, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RateDialog = ({ getAllMetal, updateRate, Metal }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState([]);
  useEffect(() => {
    getAllMetal();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setValues(Metal.metal);
    // eslint-disable-next-line
  }, [Metal]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    const list = [...values];
    list[index].price.value = value;
    setValues(list);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Change Rate
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Update Rate
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Container>
            <Grid container spacing={2}>
              {values.map((metal, index) => (
                <Grid item md={12} key={index}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={metal.name + "" + metal.purity}
                    value={metal.price?.value || ""}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                  />
                </Grid>
              ))}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    updateRate(values, handleClose);
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Container>
        </List>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => ({
  Metal: state.rate.metal,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMetal: () => {
    dispatch(getAllMetalListForRate());
  },
  updateRate: (values, setValues) => {
    dispatch(updateRate(values, setValues));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RateDialog);
