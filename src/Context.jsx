import { useState, createContext, useContext, useReducer } from "react";
import cartItems from "./data";
import { getTotals } from "./utils";
import {
  CLEAR_CART,
  REMOVE,
  LOADING,
  INCREASE,
  DECREASE,
  DISPLAY_ITEM,
} from "./Action";

const AppContext = createContext();

const defaultState = {
  items: cartItems,
  loading: false,
  cart: new Map(
    cartItems.map((items) => {
      return [items.id, items];
    })
  ),
};

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: new Map() };
      break;

    case REMOVE:
      const newCart = new Map(state.cart);
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
      break;
    case INCREASE:
      const mycart = new Map(state.cart);
      const item = mycart.get(action.payload.id).amount++;
      return { ...state, cart: mycart };
      break;
    case DECREASE:
      let mycart1 = new Map(state.cart);
      let item1 =
        mycart1.get(action.payload.id).amount > 1
          ? mycart1.get(action.payload.id).amount--
          : 0;
      return { ...state, cart: mycart1 };
      break;
  }

  throw new Error("There was an issue with your reducer");
};

const AppContextApplication = ({ children }) => {
  const [state, dispach] = useReducer(reducer, defaultState);

  const { totalAmount, totalCost } = getTotals(state.cart);
  console.log(totalAmount);
  console.log(totalCost);

  const clearCart = () => {
    dispach({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispach({ type: REMOVE, payload: { id } });
  };

  const increaseItem = (id) => {
    dispach({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispach({ type: DECREASE, payload: { id } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextApplication = () => {
  return useContext(AppContext);
};
export default AppContextApplication;
