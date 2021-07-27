import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Base from "../../../core/Base";
import { getAllCustomer } from "../../../redux/action/customer";
import moment from "moment";
const View = ({ fetchCustomer, Customer }) => {
  useEffect(() => {
    fetchCustomer(Customer.rowPerPage, Customer.page);
    // eslint-disable-next-line
  }, []);
  return (
    <Base title="View Customer">
      <Container>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Total Bill</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Customer.customer.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.purchase.length}</TableCell>
                    <TableCell>
                      {moment(customer.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              count={Customer.totalCount}
              rowsPerPageOptions={[5, 10, 15, 20]}
              rowsPerPage={Customer.rowPerPage}
              page={Customer.page}
              component="div"
              onChangeRowsPerPage={(e, rowPerPage) => {
                fetchCustomer(rowPerPage.props.value, Customer.page);
              }}
              onChangePage={(event, page) => {
                fetchCustomer(Customer.rowPerPage, page);
              }}
            />
          </TableContainer>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Customer: state.customer.viewCustomer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomer: (rowPerPage, page) => {
    dispatch(getAllCustomer(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(View);
