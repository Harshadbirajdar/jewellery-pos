import { useEffect } from "react";
import isStaff from "../../../components/isStaff";
import { connect } from "react-redux";
import Base from "../../../core/Base";
import { getAllProduct } from "../../../redux/action/product";
import styles from "../../../styles/Product.module.css";
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
} from "@material-ui/core";
const View = ({ fetchProduct, Product }) => {
  useEffect(() => {
    fetchProduct(Product.rowPerPage, Product.page);
    //  eslint-disable-next-line
  }, []);
  return (
    <Base title="View Product">
      <Container>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell>Tag No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Metal</TableCell>
                <TableCell>gross WT</TableCell>
                <TableCell>Net WT</TableCell>
                <TableCell>labour</TableCell>
                <TableCell>labour on</TableCell>
                <TableCell>HSN</TableCell>
                <TableCell>GST%</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Sold</TableCell>
              </TableHead>
              <TableBody>
                {Product.product.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.tag}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {product.metal.name + " " + product.metal.purity}
                    </TableCell>
                    <TableCell>{product.grossWt}</TableCell>
                    <TableCell>{product.netWt}</TableCell>
                    <TableCell>{product.labour}</TableCell>
                    <TableCell>
                      {product.labourOn === 0 ? "Fixed" : "Percentage"}
                    </TableCell>
                    <TableCell>{product.hsn}</TableCell>
                    <TableCell>{product.gst}%</TableCell>
                    <TableCell>{product.qty}</TableCell>
                    <TableCell>{product.sale}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              count={Product.totalCount}
              rowsPerPageOptions={[5, 10, 15, 20]}
              rowsPerPage={Product.rowPerPage}
              page={Product.page}
              component="div"
              onChangeRowsPerPage={(e, rowPerPage) => {
                fetchProduct(rowPerPage.props.value, Product.page);
              }}
              onChangePage={(event, page) => {
                fetchProduct(Product.rowPerPage, page);
              }}
            />
          </TableContainer>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Product: state.product.viewProduct,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (rowPerPage, page) => {
    dispatch(getAllProduct(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isStaff(View));
