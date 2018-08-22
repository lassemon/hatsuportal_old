import { Store } from "react-redux";
import { IRootState } from "types";

export const observeStore = (store: Store<IRootState>, onChange: (state: IRootState) => void) => {
  const handleChange = () => {
    onChange(store.getState());
  };

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};