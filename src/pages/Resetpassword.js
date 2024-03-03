import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetPassword } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  password: yup.string().required("Password is Required"),
  confpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

const Resetpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split("/").pop();

  const [initialValues, setInitialValues] = useState({
    password: "",
    confpassword: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      const resetPasswordData = {
        password: values.password,
        token: token,
      };

      dispatch(resetPassword(resetPasswordData))
        .unwrap()
        .then(() => {
          toast.success(`Reset Password Successfully`);
          navigate("/login");
        })
        .catch((error) => {
          toast.error("An error occurred");
        })
        .finally(() => {
          formik.resetForm();
        });
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title={"Reset Password"} />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-30"
              >
                <div>
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                  />
                </div>
                <div>
                  <div className="error">
                    {formik.touched.confpassword && formik.errors.confpassword}
                  </div>
                  <CustomInput
                    type="password"
                    name="confpassword"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange("confpassword")}
                    onBlur={formik.handleBlur("confpassword")}
                    value={formik.values.confpassword}
                  />
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Ok
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
