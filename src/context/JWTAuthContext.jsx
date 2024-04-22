import { createContext, useEffect, useReducer, useRef } from "react";
import { reducer } from "./Reducer";
import { refreshAccessToken, validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";

import axiosInstance from "../services/axios";

const initialState = {
  isAuthenticated: false,
  isInitializad: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});


export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    const initialize = async () => {
      try {
        console.log("auth is running")
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken")
        console.log(refreshToken)
        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);

          const response = await axiosInstance.get("/users/me");
          const { data: user } = response;
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else if(!validateToken(accessToken) && refreshToken) {
            await refreshAccessToken(refreshToken)
            const response = await axiosInstance.get("/users/me");
            const { data: user } = response;
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user,
              },
            });
        } 
        else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error.message);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
    isMounted.current = true;
  }, []);

  const getTokens = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    // console.log(formData)
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      setSession(response.data.access_token, response.data.refresh_token);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await getTokens(email, password);
      const response = await axiosInstance.get("/users/me");
      const { data: user } = response;
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleForward = async({accessToken, refreshToken}) =>{
    try {
      if (accessToken && validateToken(accessToken)) {
        setSession(accessToken, refreshToken);
        const response = await axiosInstance.get("/users/me");
        const { data: user } = response;
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      }
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
    }
  }

  const logout = () => {
    resetSession();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        handleForward
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
