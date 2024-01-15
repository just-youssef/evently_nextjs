"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import debounce from "debounce";
import { saveState } from "./browser";

const StoreProvider = ({ children }) => {
  // here we subscribe to the store changes
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(store.getState());
    }, 800)
  );
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider