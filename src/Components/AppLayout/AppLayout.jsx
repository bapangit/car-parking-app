import { UserContext } from "Components/Contexts/UserContext";
import logout from "Utils/logout";
import { useContext } from "react";
import styled from "styled-components";

const NavigationBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user-name {
    margin: 0px 8px;
    cursor: pointer;
    padding: 2px 8px;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function AppLayout({ children }) {
  const { user, resetUser } = useContext(UserContext);
  const onClickUserName = () => {
    resetUser("");
  };
  return (
    <div style={{ height: "100vh" }}>
      <NavigationBar>
        <div>
          <span style={{ fontSize: "24px", margin: "2px 2px 2px 10px" }}>
            Park
          </span>
          <span style={{ fontSize: "26px", fontWeight: "bold", margin: "2px" }}>
            Cars
          </span>
        </div>
        {user?.name && (
          <span
            onClick={onClickUserName}
            className="user-name"
            title="Sign Out"
          >
            {user.name}
          </span>
        )}
      </NavigationBar>
      <div style={{ height: "calc(100% - 50px)" }}>{children}</div>
    </div>
  );
}

export default AppLayout;
