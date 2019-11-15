import React from "react";
import axios from "axios"
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

export function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export const axiosWithAuth = () => {
    return axios.create({
      baseURL: 'http://localhost:5000/',
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  };