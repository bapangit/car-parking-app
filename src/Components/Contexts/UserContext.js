import { createContext, useState } from "react";
import {
  setLocalStorageUser,
  getLocalStorageUser,
} from "Utils/LocalStorageMethods";
export const UserContext = createContext();

export const UserContextProvider = (prop) => {
  const [user, setUser] = useState(() => {
    return getLocalStorageUser();
  });

  const resetUser = (user) => {
    setUser(user);
    setLocalStorageUser(user);
  };

  return (
    <UserContext.Provider value={{ user, resetUser }}>
      {prop.children}
    </UserContext.Provider>
  );
};
