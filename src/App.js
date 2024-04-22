import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./compnents/auth/Login.jsx";
import { Register } from "./compnents/auth/Register.jsx";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext.jsx";
import { Flex, Spinner } from "@chakra-ui/react";
import Authenticated from "./compnents/auth/Authenticated.jsx";
import PublicRoute from "./compnents/auth/PublicRoute.jsx";
import { Navbar } from "./compnents/Navbar/Navbar.jsx";
import { TodoList } from "./compnents/Todo/TodoList.jsx";
import { TodoDetail } from "./compnents/Todo/TodoDetail.jsx";
import { GoogleAuth } from "./compnents/auth/GoogleAuth.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AuthConsumer>
            {(auth) =>
              !auth.isInitializad ? (
                <Flex
                  height="100vh"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65a"
                    emptyColor="green.200"
                    color="green.500"
                    size="xl"
                  />
                </Flex>
              ) : (
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Authenticated>
                        <Navbar />
                      </Authenticated>
                    }
                  >
                    <Route index element={<TodoList/>}/>
                    <Route path="/todo/:todo_id" element={<TodoDetail/>} />
                  </Route>
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/google/user"
                    element={
                      <PublicRoute>
                        <GoogleAuth/>
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              )
            }
          </AuthConsumer>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
