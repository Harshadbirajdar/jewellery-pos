import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import styles from "../styles/Invoice.module.css";
import React, { useEffect, useRef } from "react";
import moment from "moment";
import { convertInToWord } from "./api";
//  eslint-disable-next-line
const Invoice = React.forwardRef((props, ref) => {
  const { bill } = props;
  const tableRef = useRef();
  const invoiceRef = useRef();
  const testRef = useRef();
  useEffect(() => {
    console.log("heading", testRef.current.clientHeight);
  }, []);
  return (
    <div ref={ref}>
      <div className={styles.invoice}>
        <div ref={invoiceRef}>
          <div>
            <div className={styles.header}>
              <p>Tax Invoice</p>
              <h1 className={styles.logo_name}>Ravitej Jewellers</h1>
              <p className={styles.address}>
                Shop No 1, Parawade Building, Last Bus Stop, Dhankawadi, Pune -
                411043,
              </p>
              <hr />
            </div>
            <div className={styles.customer_table}>
              <div className={styles.table_left}>
                <table>
                  <tbody>
                    <tr>
                      <td>Name: {bill.customer?.name} </td>
                    </tr>
                    <tr>
                      <td>Phone Number: {bill.customer?.phoneNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.table_right}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        Invoice No: <strong>{bill.billNo}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Date: {moment(bill.createdAt).format("DD-MMM-YYYY")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr />

          <div className={styles.product} ref={tableRef}>
            <Table>
              <TableHead>
                <TableCell style={{ borderBottom: "1px solid" }}>
                  Product Description
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>HSN</TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>
                  Gross Weight
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>
                  Net Weight
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>
                  Rate per GM
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>
                  Making Charges
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>GST</TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>Qty</TableCell>
                <TableCell style={{ borderBottom: "1px solid" }}>
                  Amount
                </TableCell>
              </TableHead>
              <TableBody>
                {bill.product.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.name}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.hsn}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.grossWt}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.netWt}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.rate}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.labour}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.gst}%
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.qty}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid" }}>
                      {product.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className={styles.footor}>
            <div
              ref={testRef}
              className={styles.bottom}
              style={{ borderTop: "1px solid" }}
            >
              <table>
                <tr>
                  <td style={{ width: "8.4em" }}>Amount in Word :-</td>
                  <td style={{ paddingTop: "1em" }}>
                    {convertInToWord(parseInt(bill.totalAmount))}
                  </td>
                </tr>
              </table>
              {/* <strong>Amount in Word :-</strong>

              {convertInToWord(parseInt(bill.totalAmount))} */}

              <Table
                className={styles.table}
                style={{ borderLeft: "1px solid" }}
              >
                <TableRow>
                  <TableCell
                    align="right"
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderBottom: "1px solid" }}
                  >
                    {bill.amount}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    CSGT 1.5%
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderBottom: "1px solid" }}
                  >
                    {(bill.gst3 / 2).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    SSGT 1.5%
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderBottom: "1px solid" }}
                  >
                    {(bill.gst3 / 2).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{
                      borderBottom: "1px solid",
                      borderRight: "1px solid",
                    }}
                  >
                    Round Off
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderBottom: "1px solid" }}
                  >
                    {(parseInt(bill.totalAmount) - bill.totalAmount).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{ borderBottom: "none", borderRight: "1px solid" }}
                  >
                    Grand Total
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    {parseInt(bill.totalAmount)}
                  </TableCell>
                </TableRow>
              </Table>
            </div>
            <div style={{ borderTop: "1px solid", display: "flex" }}>
              <div className={styles.customer}>
                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    marginTop: "4em",
                  }}
                >
                  Customer Sign
                </p>
              </div>
              <div className={styles.owner}>
                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    paddingTop: "0.5em",
                  }}
                >
                  Ravitej Jewellers
                </p>
              </div>
            </div>
            {/* <hr style={{ margin: 0 }} /> */}
          </div>
        </div>
      </div>
      <p>Software by Gratus Tech 9028367948</p>
    </div>
  );
});

export default Invoice;
