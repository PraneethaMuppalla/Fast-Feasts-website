import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const indexOfItemIfPresent = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItem;
    let updatedItems;
    if (indexOfItemIfPresent !== -1) {
      const existingCartItem = state.items[indexOfItemIfPresent];
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[indexOfItemIfPresent] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    const newTotal = state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: newTotal };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingIndex];
    const newTotal = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((each) => each.id !== action.id);
    } else {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: newTotal };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
