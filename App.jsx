// Redux Store Implementation
export const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  
  dispatch({ type: '@@INIT' });
  
  return { getState, dispatch, subscribe };
};

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

// Action Creators
export const addToCart = (plant) => ({ type: ADD_TO_CART, payload: plant });
export const removeFromCart = (plantId) => ({ type: REMOVE_FROM_CART, payload: plantId });
export const incrementQuantity = (plantId) => ({ type: INCREMENT_QUANTITY, payload: plantId });
export const decrementQuantity = (plantId) => ({ type: DECREMENT_QUANTITY, payload: plantId });
export const deleteFromCart = (plantId) => ({ type: DELETE_FROM_CART, payload: plantId });

// Initial State
export const initialState = {
  cart: [],
  products: [
    { id: 1, name: 'Peace Lily', price: 25, category: 'Flowering Plants', image: '🌸', inCart: false },
    { id: 2, name: 'Orchid', price: 35, category: 'Flowering Plants', image: '🌺', inCart: false },
    { id: 3, name: 'Aloe Vera', price: 15, category: 'Succulents', image: '🌵', inCart: false },
    { id: 4, name: 'Jade Plant', price: 20, category: 'Succulents', image: '🪴', inCart: false },
    { id: 5, name: 'Monstera', price: 40, category: 'Foliage Plants', image: '🌿', inCart: false },
    { id: 6, name: 'Snake Plant', price: 18, category: 'Foliage Plants', image: '🍃', inCart: false },
  ]
};

// Reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        products: state.products.map(p => 
          p.id === action.payload.id ? { ...p, inCart: true } : p
        )
      };
    
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
        products: state.products.map(p => 
          p.id === action.payload ? { ...p, inCart: false } : p
        )
      };
    
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
        products: state.products.map(p => 
          p.id === action.payload ? { ...p, inCart: false } : p
        )
      };
    
    default:
      return state;
  }
};