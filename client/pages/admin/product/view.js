import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import isAdmin from "../../../components/isAdmin";
import Base from "../../../core/Base";
import Loading from "../../../components/Loading";
import {
  deleteProductName,
  getProductNameList,
} from "../../../redux/action/productName";
import DeleteIcon from "@material-ui/icons/Delete";

const View = ({ getAllProductName, List, deleteProductName, Delete }) => {
  useEffect(() => {
    getAllProductName(List.rowPerPage, List.page);
    // eslint-disable-next-line
  }, []);
  return (
    <Base title="View Product Name">
      <Loading loading={Delete.loading || List.loading} />
      <Container maxWidth="md">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {List.item.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          deleteProductName(product);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {List.item.length === 0 && (
                  <p style={{ textAlign: "center" }}>No Data Found</p>
                )}
              </TableBody>
            </Table>
            <TablePagination
              count={List.totalCount}
              rowsPerPageOptions={[5, 10, 15, 20]}
              rowsPerPage={List.rowPerPage}
              page={List.page}
              component="div"
              onChangeRowsPerPage={(e, rowPerPage) => {
                getAllProductName(rowPerPage.props.value, List.page);
              }}
              onChangePage={(event, page) => {
                getAllProductName(List.rowPerPage, page);
              }}
            />
          </TableContainer>
        </Paper>
      </Container>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  List: state.productName.list,
  Delete: state.productName.delete,
});
const mapDispatchToProps = (dispatch) => ({
  getAllProductName: (rowPerPage, page) => {
    dispatch(getProductNameList(rowPerPage, page));
  },
  deleteProductName: (product) => {
    dispatch(deleteProductName(product));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(View));
