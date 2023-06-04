import styled, { css } from "styled-components";

function Button({ text, onClick, disabled, ...rest }) {
  const Btn = styled.button`
    margin: 0px 6px;
    padding: 3px 5px;
    border: 1px solid grey;
    border-radius: 4px;
    ${({ disabled }) =>
      disabled
        ? css`
            background-color: lightgray;
          `
        : css`
            background-color: white;
          `}

    :active {
      ${({ disabled }) =>
        disabled
          ? css``
          : css`
              background-color: lightblue;
            `}
    }
  `;
  return (
    <Btn
      onClick={(e) => {
        onClick && onClick(e);
      }}
      disabled={disabled}
      {...rest}
    >
      {text}
    </Btn>
  );
}

export default Button;
