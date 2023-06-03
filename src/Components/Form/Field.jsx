import React, { useState } from "react";
import { Field as FormikField, ErrorMessage } from "formik";

/* FIELD */
function Field({ name, title, component, required, getTypeError }) {
  const validate = (value) => {
    let error;
    if (required && !value) {
      error = "Required !";
    }
    return error || getTypeError(value);
  };
  return (
    <div className="entire-field">
      <span
        className="field-title"
        style={title ? {} : { textTransform: "capitalize" }}
      >
        {title || `${name}`.replace(/([A-Z])/g, " $1").trim()}
      </span>
      <div>
        <FormikField validate={validate} name={name} component={component} />

        <div style={{ height: "15px", marginBottom: "4px" }}>
          <ErrorMessage name={name}>
            {(msg) => {
              return (
                <div
                  style={{ lineHeight: "12px", color: "red", fontSize: "12px" }}
                >
                  {msg}
                </div>
              );
            }}
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
}

/* TEXT */
const Text = ({ style, className, allow, maxLength, minLength, ...props }) => {
  const textField = ({ field, form }) => {
    return <input style={style} className={className} type="text" {...field} />;
  };

  const getTypeError = (value) => {
    let error;
    if (
      allow === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      error = "Enter a valid email address.";
    } else if (
      allow === "phone" &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(value)
    ) {
      error = "Enter a valid phone number.";
    } else if (allow === "int" && !/^([0-9]+)$/i.test(value)) {
      error = "Enter a integer value.";
    } else if (allow === "float" && !/^([0-9]+(\.)[0-9]+)$/i.test(value)) {
      error = "Enter a float value.";
    } else if (minLength && value.length < minLength) {
      error = `Enter minimum ${minLength} characters.`;
    } else if (maxLength && value.length > maxLength) {
      error = `Cannot maximum ${maxLength} characters.`;
    }
    return error;
  };
  return <Field component={textField} getTypeError={getTypeError} {...props} />;
};

/* NUMBER */
const Nummber = ({ style, className, allow, maxValue, minValue, ...props }) => {
  const numberField = ({ field, form }) => {
    return (
      <input type="number" style={style} className={className} {...field} />
    );
  };

  const getTypeError = (value) => {
    let error;
    if (allow === "int" && !/^([0-9]+)$/i.test(value)) {
      error = "Enter a integer value.";
    } else if (allow === "float" && !/^([0-9]+(\.)[0-9]+)$/i.test(value)) {
      error = "Enter a float value.";
    } else if (maxValue && value > maxValue) {
      error = `Value cannot be more than ${maxValue}`;
    } else if (minValue && value < minValue) {
      error = `Value cannot be less than ${minValue}`;
    }
    return error;
  };

  return (
    <Field component={numberField} getTypeError={getTypeError} {...props} />
  );
};

export { Text, Nummber };
