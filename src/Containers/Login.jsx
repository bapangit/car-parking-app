import Button from "Components/Button/Button";
import Form from "Components/Form";
import { Nummber, Text } from "Components/Form/Field";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .form-wrapper {
    margin-top: 50px;
    padding: 10px 25px 25px 25px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
  }
  .field-container {
    display: grid;
    grid-template-columns: auto;
  }
`;

function Login() {
  const [fieldStyle] = useState({
    width: "300px",
    borderRadius: "4px",
    height: "25px",
    paddingLeft: "8px",
  });
  return (
    <Container>
      <div className="form-wrapper">
        <span
          style={{ marginLeft: "4px", fontSize: "20px", fontWeight: "500" }}
        >
          Login
        </span>
        <Form
          initialValues={{ name: "", phone: "", otp: "" }}
          onSubmit={(val) => {
            console.log("formValues", val);
          }}
        >
          <div className="field-container">
            <Text
              style={fieldStyle}
              name="name"
              title="Name"
              minLength={5}
              maxLength={25}
            />
            <Nummber
              style={fieldStyle}
              name="age"
              title="Age"
              allow="int"
              minValue={18}
            />
            <Nummber
              style={fieldStyle}
              name="phone"
              title="Phone"
              allow="int"
              required
            />
            <Nummber
              style={fieldStyle}
              name="otp"
              title="OTP"
              allow="int"
              required
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button text="Submit" type="submit" />
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
