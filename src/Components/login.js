import { Form, Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setToken, setUserData } from "../store/slices/authSlice";
import { useState } from "react";
import "./login.css";
import Button from "./UI/Button";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const intialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("should be a valid email")
      .required("is required"),
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
  });

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, values)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userdata", JSON.stringify(response.data));
        dispatch(setUserData(response.data));
        dispatch(setToken(response.data.token));
        dispatch(login());
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div className="login-form-container">
      <Formik
        initialValues={intialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="login-input-control">
            <label htmlFor="email">Email ID: </label>
            <Field name="email" type="email" placeholder="Enter your Email" />
            <ErrorMessage name="email">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>

          <div className="login-input-control">
            <label htmlFor="password">Password: </label>
            <Field
              name="password"
              type="password"
              placeholder="Enter Your Password"
            />
            <ErrorMessage name="password">
              {(errMsg) => {
                return <p className="err-msg">{errMsg}</p>;
              }}
            </ErrorMessage>
          </div>
          {/* <button type="submit">Log In</button> */}
          <Button name="Log in" />
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
