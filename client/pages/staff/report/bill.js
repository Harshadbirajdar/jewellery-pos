import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Base from "../../../core/Base";
import { getBillExcel, getBillReport } from "../../../redux/action/report";
import isAdmin from "../../../components/isAdmin";
import FileSaver from "file-saver";
import GetAppIcon from "@material-ui/icons/GetApp";

import moment from "moment";
import {
  Button,
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
import Excel from "exceljs";
import { ConvertToExcel } from "../../../helper/ConvertToExcel";
const Bill = ({ fetchBill, Bill, fetchExcelBill, ExcelBill }) => {
  const [values, setValues] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });
  useEffect(() => {
    fetchBill(Bill.rowPerPage, Bill.page, values.startDate, values.endDate);
    fetchExcelBill(values.startDate, values.endDate);
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
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={() => {
                  let column = [
                    {
                      header: "Bill No",
                      key: "billNo",
                      width: 7,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Customer Name",
                      key: "name",
                      width: 25,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Phone Number",
                      key: "phoneNumber",
                      width: 15,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Amount",
                      key: "amount",
                      width: 10,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "GST",
                      key: "gst",
                      width: 10,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Discount",
                      key: "discount",
                      width: 10,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Total Amount",
                      key: "totalAmount",
                      width: 13,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Cash",
                      key: "cash",
                      width: 10,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Online",
                      key: "online",
                      width: 10,
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                    {
                      header: "Date",
                      key: "date",
                      width: 11,
                      alignment: "center",
                      style: {
                        alignment: { horizontal: "center", vertical: "middle" },
                      },
                    },
                  ];
                  ConvertToExcel(column, ExcelBill.bill, "Test");
                }}
              >
                Export To XLSX
              </Button>
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
                  <TableCell>Cash</TableCell>
                  <TableCell>Online</TableCell>
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
                    <TableCell>{bill.amount.toFixed(2)}</TableCell>
                    <TableCell>{bill.gst3?.toFixed(2)}</TableCell>
                    <TableCell>{parseInt(bill.totalAmount)}</TableCell>
                    <TableCell>{bill.cash ? bill.cash : "-"}</TableCell>
                    <TableCell>{bill.online ? bill.online : "-"}</TableCell>
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
  ExcelBill: state.report.excelBill,
});
const mapDispatchToProps = (dispatch) => ({
  fetchBill: (rowPerPage, page, startDate, endDate) => {
    dispatch(getBillReport(rowPerPage, page, startDate, endDate));
  },
  fetchExcelBill: (startDate, endDate) => {
    dispatch(getBillExcel(startDate, endDate));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(Bill));
