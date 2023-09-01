import {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
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
  cart: new Map(),
};

const reducer = (state, action) => {
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEM) {
    let dataFetched = action.payload.data.map((data) => {
      return [data.id, data];
    });
    let dataStatus = new Map(dataFetched);
    // { ...state, cart: action.payload.data, loading: false };
    return { ...state, cart: dataStatus, loading: false };
  }

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

  const url = "https://www.course-api.com/react-useReducer-cart-project";
  useEffect(() => {
    dispach({ type: LOADING });
    const fetchAlldata = async () => {
      const fetchData = await fetch(url);
      const data = await fetchData.json();
      dispach({ type: DISPLAY_ITEM, payload: { data } });
    };
    fetchAlldata();
  }, []);
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
