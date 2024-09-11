import { CartItem } from "./cartReducers";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: CartItem;
}

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: string;
}

export interface UpdateItemQuantityAction {
    type: typeof UPDATE_ITEM_QUANTITY;
    payload: {
        id: string;
        quantity: number;
    };
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction | UpdateItemQuantityAction;

export const addToCart = (book: CartItem): AddToCartAction => ({
    type: ADD_TO_CART,
    payload: book,
});

export const removeFromCart = (id: string) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});

export const updateItemQuantity = (id: string, quantity: number): UpdateItemQuantityAction => ({
    type: UPDATE_ITEM_QUANTITY,
    payload: { id,quantity},
});