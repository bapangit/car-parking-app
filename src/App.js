import React, { useContext, useEffect } from "react";
import AppLayout from "./Components/AppLayout/AppLayout";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "Components/Contexts/UserContext";
import logout from "Utils/logout";
import Home from "Containers/Home";
const Login = React.lazy(() => import("Containers/Login"));
function App() {
  const { user, resetUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.id) {
      resetUser("");
      navigate("login");
    } else {
      navigate("/");
    }
  }, [user]);
  return (
    <AppLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
