import { Container, Grid, Paper } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import isAdmin from "../components/isAdmin";
import RateDialog from "../components/RateDialog";
import Base from "../core/Base";

import { connect } from "react-redux";
import moment from "moment";
const Home = ({ Rate }) => {
  return (
    <Base title="Dashboard">
      <Container>
        <Grid container>
          <Grid item md={6}>
            <Paper className="paper">
              {Rate.metal.map((rate) => (
                <div key={rate._id}>
                  <h2>
                    {rate.name + " " + rate.purity}: ₹{rate.price.value} Per GM
                  </h2>
                </div>
              ))}
              <p>
                Updated Date:{" "}
                {moment(Rate.metal[0]?.price?.date).format("DD/MM/YYYY")}
              </p>
              <RateDialog />
            </Paper>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Rate: state.rate.metal,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(Home));
