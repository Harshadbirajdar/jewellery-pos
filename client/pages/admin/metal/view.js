import Base from "../../../core/Base";
import isAdmin from "../../../components/isAdmin";
import { viewAllMetal } from "../../../redux/action/metal";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
  Container,
} from "@material-ui/core";
const view = ({ fetchMetal, Metal }) => {
  useEffect(() => {
    fetchMetal(Metal.rowPerPage, Metal.page);
  }, []);
  return (
    <Base title="View Metal">
      <Container maxWidth="md">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Purity</TableCell>
              </TableHead>
              <TableBody>
                {Metal.metals.map((metal, index) => (
                  <TableRow key={index}>
                    <TableCell>{metal.name}</TableCell>
                    <TableCell>{metal.purity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              count={Metal.totalCount}
              rowsPerPageOptions={[5, 10, 15, 20]}
              rowsPerPage={Metal.rowPerPage}
              page={Metal.page}
              component="div"
              onChangeRowsPerPage={(e, rowPerPage) => {
                fetchMetal(rowPerPage.props.value, Metal.page);
              }}
              onChangePage={(event, page) => {
                fetchMetal(Metal.rowPerPage, page);
              }}
            />
          </TableContainer>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Metal: state.metal.view,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMetal: (rowPerPage, page) => {
    dispatch(viewAllMetal(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(isAdmin(view));
