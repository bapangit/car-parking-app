import { setLocalStorageUser } from "./LocalStorageMethods";

const logout = () => {
  setLocalStorageUser("");
  window.location = "/login";
};
export default logout;
