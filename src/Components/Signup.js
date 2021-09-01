import { Form, Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import "./signup.css";
import Button from "./UI/Button";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { login, setToken, setUserData } from "../store/slices/authSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Signup = (props) => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
    confirmPassword: "",
  };

  const submit = (values) => {
    console.log(values);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, values)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("userdata", JSON.stringify(response.data));
        dispatch(setUserData(response.data));
        dispatch(setToken(response.data.token));
        dispatch(login());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(3, "should be more than 3 characters")
      .max(10, "should be less than 10 characters")
      .required("is required"),
    lastName: yup
      .string()
      .min(3, "should be more than 3 characters")
      .max(10, "should be less than 10 characters")
      .required("is required"),
    email: yup
      .string()
      .email("should be a valid email")
      .required("is required"),
    phone: yup
      .number()
      .integer("phone no cant have decimals")
      .test(
        "len",
        "must be 10 numbers only",
        (val) => val?.toString().length === 10
      )
      .required("is required"),
    role: yup.string().oneOf(["user", "admin"]),
    password: yup
      .string()
      .required("is required")
      .min(8, "should be more 8 characters")
      .max(16, "should be less than 16 characters")
      .test("spaces", "spaces are not allowed in password", (testValue) => {
        const spaceRegex = new RegExp(" ");
        const result = spaceRegex.test(testValue);
        return !result;
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="signup-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <Form>
          {/* first Name */}
          <div className="form-input-container">
            <label htmlFor="firstName">First Name: </label>
            <Field type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          {/* Last Name */}
          <div className="form-input-container">
            <label htmlFor="lastName">lastName: </label>
            <Field type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          {/* email */}
          <div className="form-input-container">
            <label htmlFor="email">Email: </label>
            <Field
              name="email"
              type="email"
              className="login-email"
              placeholder="Enter your Email"
            />
            <ErrorMessage name="email" className="login-email-err">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          {/* number */}
          <div className="form-input-container">
            <label htmlFor="phone">Phone Number: </label>
            <Field type="number" name="phone" placeholder="Contact Number" />
            <ErrorMessage name="phone">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          {/* role */}
          <div className="form-input-container">
            <label htmlFor="role">Role: </label>
            <Field name="role" as="select">
              <option value="user">user</option>
              <option value="admin">admin</option>
            </Field>
            <ErrorMessage name="role">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          {/* password */}
          <div className="form-input-container">
            <label htmlFor="password">Password: </label>
            <Field
              name="password"
              type="password"
              className="login-password"
              placeholder="Enter Your Password"
            />
            <ErrorMessage name="password">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          {/* confirm password */}
          <div className="form-input-container">
            <label htmlFor="confirmPassword">Re-enter Password: </label>
            <Field
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
            />
            <ErrorMessage name="confirmPassword">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>
          <div className="signup-btn">
            <Button name="Sign-Up" width="300px" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
