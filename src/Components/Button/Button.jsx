import styled from "styled-components";

function Button({ text, onClick, ...rest }) {
  const Btn = styled.button`
    margin: 0px 6px;
    padding: 3px 5px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 4px;
    :active {
      background-color: lightblue;
    }
  `;
  return (
    <Btn
      onClick={() => {
        onClick && onClick();
      }}
    >
      {text}
    </Btn>
  );
}

export default Button;
