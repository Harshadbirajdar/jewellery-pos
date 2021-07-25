import {
  Container,
  Paper,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Base from "../../../core/Base";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import isStaff from "../../../components/isStaff";
import { addNewMetalTag, getMetalForTag } from "../../../redux/action/product";
import Message from "../../../components/Message";
const Tag = ({ getAllMetal, addNewTag, Metal, Tags }) => {
  const [values, setValues] = useState({
    name: "",
    tag: "",
    metal: "",
    hsn: "",
    gst: "",
    labour: "",
    labourOn: "",
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getAllMetal();
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <Base title="Add Tag">
      <Container maxWidth="md">
        <Message
          error={Tags.error}
          open={open}
          setOpen={setOpen}
          successMsg="Tag Added Successfully"
        />
        <Paper className="paper">
          <form>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  label="Tag Number"
                  variant="outlined"
                  type="Number"
                  value={values.tag}
                  onChange={handleChange("tag")}
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  value={values.name}
                  onChange={handleChange("name")}
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  id="combo-box-demo"
                  options={Metal.metal}
                  fullWidth
                  getOptionLabel={(option) => option.name + " " + option.purity}
                  onInputChange={(event, newInputValue) => {
                    setValues({ ...values, metal: newInputValue });
                  }}
                  onChange={(event, newValue) => {
                    setValues({ ...values, metal: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Metal" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="HSN"
                  variant="outlined"
                  fullWidth
                  type="Number"
                  value={values.hsn}
                  onChange={handleChange("hsn")}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="GST"
                  variant="outlined"
                  fullWidth
                  type="Number"
                  value={values.gst}
                  onChange={handleChange("gst")}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Labour"
                  variant="outlined"
                  fullWidth
                  type="Number"
                  value={values.labour}
                  onChange={handleChange("labour")}
                />
              </Grid>
              <Grid item md={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Labour on</InputLabel>
                  <Select
                    value={values.labourOn}
                    onChange={(e) => {
                      setValues({ ...values, labourOn: e.target.value });
                    }}
                    label="Labour on"
                  >
                    <MenuItem value={0}>Fixed</MenuItem>
                    <MenuItem value={1}>Percentage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={(e) => {
                    e.preventDefault();
                    addNewTag(values, setValues, setOpen);
                  }}
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Metal: state.product.metal,
  Tags: state.product.metalTag,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMetal: () => {
    dispatch(getMetalForTag());
  },
  addNewTag: (values, setValues, setOpen) => {
    dispatch(addNewMetalTag(values, setValues, setOpen));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isStaff(Tag));
