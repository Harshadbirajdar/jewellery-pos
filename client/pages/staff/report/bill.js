import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Base from "../../../core/Base";
import { getBillReport } from "../../../redux/action/report";
import isAdmin from "../../../components/isAdmin";
import moment from "moment";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
const Bill = ({ fetchBill, Bill }) => {
  const [values, setValues] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });
  useEffect(() => {
    fetchBill(Bill.rowPerPage, Bill.page, values.startDate, values.endDate);
    // eslint-disable-next-line
  }, [values]);
  return (
    <Base title="Bill Report">
      <Container>
        <Paper className="paper">
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Start Date"
                type="Date"
                variant="outlined"
                value={values.startDate}
                onChange={(e) => {
                  setValues({
                    ...values,
                    startDate: moment(e.target.value).format("YYYY-MM-DD"),
                  });
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="End Date"
                type="Date"
                variant="outlined"
                value={values.endDate}
                onChange={(e) => {
                  setValues({
                    ...values,
                    endDate: moment(e.target.value).format("YYYY-MM-DD"),
                  });
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bill No</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Total Product</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>GST</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Bill.bill.map((bill) => (
                  <TableRow key={bill._id}>
                    <TableCell>{bill.billNo}</TableCell>
                    <TableCell>
                      {bill.customer?.name ? bill.customer.name : "-"}
                    </TableCell>
                    <TableCell>{bill.product.length}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>{bill.gst3?.toFixed(2)}</TableCell>
                    <TableCell>{parseInt(bill.totalAmount)}</TableCell>
                    <TableCell>
                      {moment(bill.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              count={Bill.totalCount}
              rowsPerPageOptions={[5, 10, 15, 20]}
              rowsPerPage={Bill.rowPerPage}
              page={Bill.page}
              component="div"
              onChangeRowsPerPage={(e, rowPerPage) => {
                fetchBill(
                  rowPerPage.props.value,
                  Bill.page,
                  values.startDate,
                  values.endDate
                );
              }}
              onChangePage={(event, page) => {
                fetchBill(
                  Bill.rowPerPage,
                  page,
                  values.startDate,
                  values.endDate
                );
              }}
            />
          </TableContainer>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Bill: state.report.viewBill,
});
const mapDispatchToProps = (dispatch) => ({
  fetchBill: (rowPerPage, page, startDate, endDate) => {
    dispatch(getBillReport(rowPerPage, page, startDate, endDate));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(Bill));
