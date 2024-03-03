import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { createOrder } from "../../features/order/orderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  country: yup.string().required("Country is Required"),
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name  is Required"),
  address: yup.string().required("Address is Required"),
  city: yup.string().required("City is Required"),
  zipcode: yup.string().required("Zipcode is Required"),
});

const CheckoutShippingInfo = ({
  orderItems,
  totalPrice,
  priceAfterDiscount,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipcode: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      const shippingInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        country: values.country,
        city: values.city,
        zipCode: values.zipcode,
      };

      const completeOrderData = {
        shippingInfo,
        orderItems,
        totalPrice,
        priceAfterDiscount,
      };

      dispatch(createOrder(completeOrderData));
      toast.success("Thank You for Your Order!");
      navigate("/product");
    },
  });

  return (
    <div className="checkout-left-data">
      <h3 className="website-name">Dev Corner</h3>
      <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Information
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Shipping
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Payment
          </li>
        </ol>
      </nav>
      <h4 className="title total ">Contact Information</h4>
      <p className="user-details total">Navdeep Dahiya (nxd232@gmail.com)</p>
      <h4 className="mb-3">Shipping Address</h4>
      <form
        action=""
        className="d-flex gap-15 flex-wrap justify-content-between"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-100">
          <div className="error">
            {formik.touched.country && formik.errors.country}
          </div>
          <select
            name="country"
            id=""
            className="form-control form-select"
            onChange={formik.handleChange("country")}
            onBlur={formik.handleBlur("country")}
            value={formik.values.country}
          >
            <option value="" selected disabled>
              Select Country
            </option>
            <option value="" disabled>
              Select Country
            </option>
            <option value="Macedonia">Macedonia</option>
            <option value="USA">USA</option>
            <option value="Serbia">Serbia</option>
          </select>
        </div>
        <div className="flex-grow-1">
          <div className="error">
            {formik.touched.firstName && formik.errors.firstName}
          </div>
          <input
            placeholder="First Name"
            type="text"
            className="form-control"
            name="firstName"
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            value={formik.values.firstName}
          />
        </div>
        <div className="flex-grow-1">
          <div className="error">
            {formik.touched.lastName && formik.errors.lastName}
          </div>
          <input
            name="lastName"
            placeholder="Last Name"
            type="text"
            className="form-control"
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            value={formik.values.lastName}
          />
        </div>
        <div className="w-100">
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>
          <input
            name="address"
            placeholder="Address"
            className="form-control"
            onChange={formik.handleChange("address")}
            onBlur={formik.handleBlur("address")}
            value={formik.values.address}
          />
        </div>
        {/* <div className="w-100">
          <input
            type="text"
            className="form-control"
            placeholder="Apartment, Suite, etc"
          />
        </div> */}
        <div className="flex-grow-1">
          <div className="error">
            {formik.touched.city && formik.errors.city}
          </div>
          <input
            name="city"
            type="text"
            className="form-control"
            placeholder="City"
            onChange={formik.handleChange("city")}
            onBlur={formik.handleBlur("city")}
            value={formik.values.city}
          />
        </div>
        {/* <div className="flex-grow-1">
          <select name="" id="" className="form-control form-select">
            <option value={""} selected disabled>
              Select State
            </option>
          </select>
        </div> */}
        <div className="flex-grow-1">
          <div className="error">
            {formik.touched.city && formik.errors.city}
          </div>
          <input
            name="zipcode"
            type="text"
            className="form-control"
            placeholder="Zipcode"
            onChange={formik.handleChange("zipcode")}
            onBlur={formik.handleBlur("zipcode")}
            value={formik.values.zipcode}
          />
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/cart" className="text-dark">
              <BiArrowBack className="me-2" />
              Return to Cart
            </Link>
            <button className="button" type="submit">
              Continue to Shipping
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutShippingInfo;
