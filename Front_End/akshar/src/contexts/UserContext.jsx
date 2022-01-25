import React, { createContext, useState } from "react";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

function UserContextProvider(props, user) {
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
