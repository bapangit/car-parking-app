const USER_KEY = "1";

export const getLocalStorageUser = () => {
  try {
    var user = localStorage.getItem(USER_KEY);
    return JSON.parse(user);
  } catch {
    return null;
  }
};
export const setLocalStorageUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
