import styled from "styled-components";

const NavigationBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: orange;
  display: flex;
  align-items: center;
`;

function AppLayout({ children }) {
  return (
    <div>
      <NavigationBar>
        <span style={{ fontSize: "24px", margin: "2px 2px 2px 10px" }}>
          Park
        </span>
        <span style={{ fontSize: "26px", fontWeight: "bold", margin: "2px" }}>
          Cars
        </span>
      </NavigationBar>
      {children}
    </div>
  );
}

export default AppLayout;
