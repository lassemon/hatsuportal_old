import { logoutReset } from 'actions/auth';
import { globalError } from 'actions/error';
import { AnyAction, Dispatch, Store } from "redux";
import { IRootState } from "types";
import { saveUser } from "utils/localStorage";

export const userMiddleware = (store: Store<IRootState>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  const previousState: IRootState = store.getState();
  const previousUser = previousState.auth.user;
  next(action);
  const nextState: IRootState = store.getState();
  const nextUser = nextState.auth.user || null;

  if (previousUser !== nextUser) {
    saveUser(nextState.auth.loggedIn, nextUser);
  }
};

export const tokenMiddleware = (store: Store<IRootState>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  const isLoggedIn = store.getState().auth.loggedIn;
  if (action.error && action.payload.status === 401 && isLoggedIn) {
    store.dispatch(globalError({ title: 'Oh no!', message: 'It seems your login expired.' }));
    store.dispatch(logoutReset());
  } else {
    next(action);
  }
};