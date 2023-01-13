import { createContext, useReducer, useEffect, useState } from 'react';

export const Store = createContext();

function initialState() {
  let data = {};
  if (typeof window !== 'undefined') {
    data = JSON.parse(window.localStorage.getItem('CART_ITEM'));
  }

  const State = {
    cart: data
  };
  return State;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.productId === parseInt(newItem.productId)
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.productName === existItem.productName ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      window.localStorage.setItem(
        'CART_ITEM',
        JSON.stringify({ ...state.cart, cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'UPDATE_ITEM': {
      const newItem = action.payload;
      const index = state.cart.cartItems.findIndex(
        (x) => x.productId == newItem.productId
      );
      let cartItems = [...state.cart.cartItems];
      cartItems[index] = newItem;
      window.localStorage.setItem(
        'CART_ITEM',
        JSON.stringify({ ...state.cart, cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_DELETE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
      window.localStorage.setItem(
        'CART_ITEM',
        JSON.stringify({ ...state.cart, cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'EMPTY_CART': {
      window.localStorage.setItem(
        'CART_ITEM',
        JSON.stringify({ ...state.cart, cartItems: [] })
      );
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState());
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
