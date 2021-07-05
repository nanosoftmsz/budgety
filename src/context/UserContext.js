import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({ userId: "", userEmail: "", userToken: "" });
  const [loading, setLoading] = useState(false);

  return <UserContext.Provider value={{ userInfo, setUserInfo, loading, setLoading }}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
