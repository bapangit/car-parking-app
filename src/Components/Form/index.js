import React from "react";
import { Formik, Form as FormikForm } from "formik";
import "./form-style.css";

const Form = (props) => {
  return (
    <Formik {...props}>
      {() => {
        return <FormikForm>{props.children}</FormikForm>;
      }}
    </Formik>
  );
};

export default Form;
