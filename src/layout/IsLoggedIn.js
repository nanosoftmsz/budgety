import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function IsLoggedIn({ component: Component, ...rest }) {
  const { userInfo } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userInfo.userToken || localStorage.getItem("userToken")) {
          return <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />;
        } else {
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
}
