import React from "react";
import AppLayout from "./Components/AppLayout/AppLayout";
import { Route, Router, Routes } from "react-router-dom";
const Login = React.lazy(() => import("Containers/Login"));
function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
