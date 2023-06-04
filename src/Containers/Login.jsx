import Button from "Components/Button/Button";
import { UserContext } from "Components/Contexts/UserContext";
import Form from "Components/Form";
import { Nummber, Text } from "Components/Form/Field";
import { addUser, getUser } from "Service/methods";
import { useContext, useEffect, useState } from "react";
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
  const { resetUser } = useContext(UserContext);
  const [fieldStyle] = useState({
    width: "300px",
    borderRadius: "4px",
    height: "25px",
    paddingLeft: "8px",
  });
  const onSubmit = async (formValues, { resetForm }) => {
    let user;
    const result = await getUser(formValues.phone);
    if (result && result.length > 0) {
      if (result[0].id) {
        user = result[0];
      }
    } else {
      const addedUser = await addUser({
        name: formValues.name,
        car: formValues.car,
        phone: formValues.phone,
        bill: 0,
        slotId: 0,
      });
      if (addedUser?.id) {
        const result = await getUser(formValues.phone);
        if (result[0].id) {
          user = result[0];
        }
      }
    }
    resetUser(user);
    resetForm();
  };
  return (
    <Container>
      <div className="form-wrapper">
        <span
          style={{ marginLeft: "4px", fontSize: "20px", fontWeight: "500" }}
        >
          Login
        </span>
        <Form
          onReset={(val) => {
            console.log("reset");
          }}
          initialValues={{
            name: "",
            car: "",
            phone: "",
            otp: "",
          }}
          onSubmit={onSubmit}
        >
          <div className="field-container">
            <Text
              style={fieldStyle}
              name="name"
              title="Name"
              minLength={5}
              maxLength={25}
            />
            <Text
              style={fieldStyle}
              name="car"
              title="Car"
              minLength={5}
              maxLength={25}
            />
            <Text
              style={fieldStyle}
              name="phone"
              title="Phone"
              allow="phone"
              minLength={10}
              maxLength={10}
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
