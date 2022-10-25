import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Generator from "./components/Generator";
import TemplateManager from "./components/TemplateManager";
import { Toaster } from "react-hot-toast";
import { CustomThemeProvider } from "./Context/ThemeContext";
import ManageCertificates from "./components/ManageCertificates";
import { UserProvider } from "./Context/UserContext";
import Authoriser from "./Auth";
import { useState } from "react";
import AddUser from "./components/AddUser";

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  return (
    <div>
      <CustomThemeProvider>
        <UserProvider userData={currentUser}>
          <Toaster position="top-right" />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route element={<Navigate to="/login" />} path="/" />
              <Route element={<Login />} path="login" />
              <Route element={<AddUser />} path="adduser" />
              <Route
                element={
                  <Authoriser>
                    <Generator />
                  </Authoriser>
                }
                path="generate"
              />
              <Route
                element={
                  <Authoriser>
                    <TemplateManager />
                  </Authoriser>
                }
                path="templates"
              />
              <Route
                element={
                  <Authoriser>
                    <ManageCertificates />
                  </Authoriser>
                }
                path="managecertificates"
              />
            <Route element={<NotFound />} path="*" />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </CustomThemeProvider>
    </div>
  );
}

export default App;
