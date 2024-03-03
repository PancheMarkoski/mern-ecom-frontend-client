import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/user/userSlice";

let schema = yup.object().shape({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().required("Email is Required"),
  mobile: yup.string().required("Mobile is Required"),
});

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setInitialValues({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setIsEditing(false);
    },
  });

  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title={"Profile"} />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="profile">
          <div className="profile-edit">
            <h2>Update Profile</h2>
            <button
              type="button"
              className="btn btn-secondary "
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <CustomInput
                type="text"
                label="Enter First Name"
                name="firstname"
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
                value={formik.values.firstname}
                disabled={!isEditing}
              />
              <div className="error">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <CustomInput
                type="text"
                label="Enter Last Name"
                name="lastname"
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
                value={formik.values.lastname}
                disabled={!isEditing}
              />
              <div className="error">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email Address</label>
              <CustomInput
                type="email"
                label="Enter Email Address"
                name="email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
                disabled={!isEditing}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Mobile No</label>
              <CustomInput
                type="text"
                label="Enter Mobile No"
                name="mobile"
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
                value={formik.values.mobile}
                disabled={!isEditing}
              />
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
