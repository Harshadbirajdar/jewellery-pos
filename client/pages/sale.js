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
} from "@material-ui/core";
import isStaff from "../components/isStaff";
import Base from "../core/Base";
import Autocomplete from "@material-ui/lab/Autocomplete";

const sale = () => {
  const metal = [
    { name: "Gold", purity: "22K" },
    { name: "Gold", purity: "24K" },
    { name: "Gold", purity: "20K" },
  ];
  const billForm = () => (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <TextField variant="outlined" label="Tag no" type="Number" />
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
        <Button color="primary" variant="contained">
          Add
        </Button>
      </Grid>
    </Grid>
  );
  return (
    <Base title="Sale Panel">
      <Container>
        <Paper>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Phone Number"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField label="Name" variant="outlined" />
            </Grid>
          </Grid>
          {billForm()}
        </Paper>
      </Container>
    </Base>
  );
};

export default isStaff(sale);
