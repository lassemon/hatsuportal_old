import { IRootState } from "types";

export const saveUser = (state: IRootState) => {
  localStorage.setItem('loggedIn', JSON.stringify(state.auth.loggedIn));
  localStorage.setItem('user', JSON.stringify(state.auth.user));
};

export const loadUser = () => {
  const persistedLoggedInState = JSON.parse(localStorage.getItem('loggedIn') || 'null');
  const persistedUser = JSON.parse(localStorage.getItem('user') || 'null');
  return {
    loggedIn: persistedLoggedInState,
    user: persistedUser
  };
};