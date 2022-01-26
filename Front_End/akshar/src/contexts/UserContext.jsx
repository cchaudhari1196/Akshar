import React, { createContext, useState } from "react";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

function UserContextProvider(props) {
  return (
    <UserContext.Provider value={props.user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;

export const UserContextConsumer = () => React.useContext(UserContext);
