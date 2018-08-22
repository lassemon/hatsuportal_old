import { IUser } from "types";

export const saveUser = (loggedIn: boolean, user: IUser | null) => {
  localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  localStorage.setItem('user', JSON.stringify(user));
};

export const loadUser = () => {
  const persistedLoggedInState = JSON.parse(localStorage.getItem('loggedIn') || 'null');
  const persistedUser = JSON.parse(localStorage.getItem('user') || 'null');
  return {
    loggedIn: persistedLoggedInState,
    user: persistedUser
  };
};