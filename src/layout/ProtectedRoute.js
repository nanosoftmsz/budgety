import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { userInfo } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userInfo.userToken || localStorage.getItem("userToken")) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }
      }}
    />
  );
}
