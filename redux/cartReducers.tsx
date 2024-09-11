import { ADD_TO_CART,REMOVE_FROM_CART,UPDATE_ITEM_QUANTITY,CartActionTypes } from "./cartActions";
import { Book } from "../components/Book";

export interface CartItem extends Book  {
     quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartReducer = (state = initialState , action: CartActionTypes):CartState => {
    switch (action.type){
        case ADD_TO_CART:
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem) {
                return state; // Item already in cart, do nothing
            }

                return {
                    ...state,
                    items: [...state.items, {...action.payload, quantity: 1 }],

                };
        
        case REMOVE_FROM_CART:
            return{
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case UPDATE_ITEM_QUANTITY: 
            return {
                ...state,
                items: state.items.map(item =>
                item.id === action.payload.id
                     ? {...item, quantity: Math.max(action.payload.quantity,0) }
                     : item
                ),
            };    
            default:
                return state;
    }
};