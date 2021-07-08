import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({ userId: "", userEmail: "", userToken: "" });
  const [loading, setLoading] = useState(false);
  const [monthId, setMonthId] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  return <UserContext.Provider value={{ userInfo, setUserInfo, loading, setLoading, monthId, setMonthId, openConfirmModal, setOpenConfirmModal }}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
