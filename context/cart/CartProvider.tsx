import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';


export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

interface Props {
    children: JSX.Element | JSX.Element[]
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}


export const CartProvider:FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE);

  //======== React Effects ========
  useEffect(() => {
        try {
            const cookiesCart = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];
    
            dispatch({
                type: '[Cart] - LoadCart from cookies | storage',
                payload: cookiesCart 
            });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);
  

  useEffect(() => {
    if(state.cart.length === 0) return;
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce( (total, current) => total + current.quantity, 0);
    const subTotal = state.cart.reduce( (total, current) => total + ( current.quantity * current.price ), 0);
    const taxtRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 );

    const orderSummary = {
        numberOfItems,
        subTotal,
        tax: subTotal * taxtRate,
        total: subTotal + subTotal * taxtRate,
    }

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
  }, [state.cart]);
  
  //======== Methods ========
  // # --- Add product to cart ---
  const addProductToCart = ( product: ICartProduct ) => {
    // Check if product is already in cart
    const productInCart = state.cart.some( p => p._id === product._id && product.size === p.size );
    // if product does not exist,  add it to cart
    if( !productInCart ) {
        dispatch({ 
            type: '[Cart] - Update products in cart', 
            payload: [ ...state.cart, product ] 
        });
        return;
    }
    // if product exists, update quantity
    const updatedProducts = state.cart.map( p => {
        if( p._id === product._id && p.size === product.size ) {
            p.quantity += product.quantity;
        }
        return p;
    });
    // update cart
    dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
  }

  // # --- Update cart product quantity ---
  const updateCartQuantity = ( product: ICartProduct ) => {
    dispatch({ type: '[Cart] - Change product cart quantity', payload: product });
  }

  // # --- Remove product in cart ---
   const removeProductInCart = ( product: ICartProduct ) => {
    // update cart
    dispatch({ type: '[Cart] - Remove product in cart', payload: product });
  }

  return (
      <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            updateCartQuantity,
            removeProductInCart
      }}>
            { children }
      </CartContext.Provider>
    )
}