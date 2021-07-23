import {
  ADD_NEW_CUSTOMER_FAILED,
  ADD_NEW_CUSTOMER_START,
  ADD_NEW_CUSTOMER_SUCCESS,
  GENRATE_BILL_FAILED,
  GENRATE_BILL_START,
  GENRATE_BILL_SUCCESS,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_FAILED,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_START,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_SUCCESS,
  GET_PRODUCT_BY_TAG_FAILED,
  GET_PRODUCT_BY_TAG_START,
  GET_PRODUCT_BY_TAG_SUCCESS,
} from "./action.type";
import axiosInstance from "../../helper/axiosInstance";
import { round } from "../../helper";
const getCustomerByPhoneNumberStart = () => ({
  type: GET_CUSTOMER_BY_NUMBER_FOR_SALE_START,
});

const getCustomerByPhoneNumberSuccess = (customer) => ({
  type: GET_CUSTOMER_BY_NUMBER_FOR_SALE_SUCCESS,
  payload: customer,
});
const getCustomerByPhoneNumberFailed = (error) => ({
  type: GET_CUSTOMER_BY_NUMBER_FOR_SALE_FAILED,
  payload: error,
});

export const getCustomerByPhone = (values, setValues, nameRef, tagRef) => {
  return (dispatch) => {
    dispatch(getCustomerByPhoneNumberStart());
    axiosInstance
      .get(
        `/customer?${values?.customer?.phoneNumber && `phoneNumber`}=${
          values?.customer?.phoneNumber
        }`
      )
      .then((response) => {
        dispatch(getCustomerByPhoneNumberSuccess(response.data));
        setValues({ ...values, customer: response.data });
        tagRef.current.focus();
      })
      .catch((err) => {
        nameRef.current.focus();
        dispatch(getCustomerByPhoneNumberFailed(err.response.data.error));
      });
  };
};

const addNewCustomerStart = () => ({
  type: ADD_NEW_CUSTOMER_START,
});

const addNewCustomerSuccess = (customer) => ({
  type: ADD_NEW_CUSTOMER_SUCCESS,
  payload: customer,
});

const addNewCustomerFailed = (error) => ({
  type: ADD_NEW_CUSTOMER_FAILED,
  payload: error,
});

export const addNewCustomer = (values, setValues, tagRef) => {
  return (dispatch) => {
    axiosInstance
      .post("/customer", {
        name: values.customer.name,
        phoneNumber: values.customer.phoneNumber,
      })
      .then((response) => {
        dispatch(addNewCustomerSuccess(response.data));
        setValues(response.data);
        tagRef.current.focus();
      })
      .catch((err) => {
        dispatch(addNewCustomerFailed(err.response.data.error));
      });
  };
};

const getProductByTagStart = () => ({
  type: GET_PRODUCT_BY_TAG_START,
});
const getProductByTagSuccess = (product) => ({
  type: GET_PRODUCT_BY_TAG_SUCCESS,
  payload: product,
});
const getProductByTagFailed = (error) => ({
  type: GET_PRODUCT_BY_TAG_FAILED,
  payload: error,
});

export const getProductByTag = (tag, setTag, values, setValues, setOpen) => {
  return (dispatch) => {
    dispatch(getProductByTagStart());

    axiosInstance
      .get(`/product/tag?tag=${tag}`)
      .then((response) => {
        let localProduct = response.data;
        let gst3 = values.gst3;
        let gst = 0;
        dispatch(getProductByTagSuccess(response.data));
        let products = values.product;
        localProduct.qty = 1;
        localProduct.rate = 4300;
        let amount = localProduct.netWt * localProduct.rate;
        if (localProduct.labourOn === 1) {
          let labour = round(amount * (localProduct.labour / 100));
          localProduct.labour = labour;
          localProduct.amount = amount + labour;
        } else {
          localProduct.amount =
            localProduct.netWt * localProduct.rate + localProduct.labour;
        }
        gst = (localProduct.amount * parseInt(localProduct.gst)) / 100;
        if (parseInt(localProduct.gst) === 3) {
          gst3 += gst;
        }
        products.push(localProduct);
        setValues({ ...values, gst3, product: products });
        setTag("");
      })
      .catch((err) => {
        setOpen(true);
        dispatch(getProductByTagFailed(err.response.data.error));
      });
  };
};

const genrateBillStart = () => ({
  type: GENRATE_BILL_START,
});

const genrateBillSuccess = (bill) => ({
  type: GENRATE_BILL_SUCCESS,
  payload: bill,
});

const genrateBillFailed = (error) => ({
  type: GENRATE_BILL_FAILED,
  payload: error,
});

export const genrateBill = (values, setValues) => {
  return (dispatch) => {
    dispatch(genrateBillStart());
    axiosInstance
      .post("/bill", values)
      .then((response) => {
        dispatch(genrateBillSuccess(response.data));
        setValues({
          product: [],
          gst3: 0,
          amount: 0,
        });
      })
      .catch((err) => {
        dispatch(genrateBillFailed(err.response.data.error));
      });
  };
};
