import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { forgotPasswordEmailSend } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

let schema = yup.object().shape({
  email: yup.string().required("Email is Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    email: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgotPasswordEmailSend(values));
      toast.success(
        "Check your inbox! We've just emailed you instructions to reset your password."
      );
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title={"Forgot Password"} />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Reset Your Password</h3>
            <p className="text-center my-2 mb-3">
              We will send you an email to reset your password.
            </p>

            <form
              className="d-flex flex-column gap-30"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
              </div>
              <div>
                <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    Submit
                  </button>
                  <Link to="/login">Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
