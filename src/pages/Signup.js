import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userRegister } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const signupSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is Required"),
  lastname: Yup.string().required("Last Name is Required"),
  email: Yup.string()
    .nullable()
    .email("Invalid email")
    .required("Required"),
  mobile: Yup.string().required("Mobile No is Required"),
  password: Yup.string().required("Password is Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(userRegister(values))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    },
  });

  return (
    <>
      <Meta title={"Signup"} />
      <BreadCrumb title={"Signup"} />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-30"
              >
                <div>
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <CustomInput
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    value={formik.values.firstname}
                  />
                </div>
                <div>
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  <CustomInput
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    value={formik.values.lastname}
                  />
                </div>
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
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                  <CustomInput
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                  />
                </div>
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
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      SignUp
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

export default Signup;
