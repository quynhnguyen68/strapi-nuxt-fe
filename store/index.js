import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return { 
            cartItems: [],
        };
    },
    
    getters: {
        getCart: (state) => state.cartItems,
        getCartTotal: (state) =>
            state.cartItems.length < 1
            ? 0
            : state.cartItems.map((el) => el.price * el.quantity)
                .reduce((a, b) => a + b),
    },

    actions: {
        setCartItem(item) {
            const existedIndex =  this.cartItems.findIndex(cartItem => cartItem.id === item.id);

            if(existedIndex === -1) {
                this.cartItems = [...this.cartItems, item];
            } else {
                this.cartItems =  [
                    ...this.cartItems.slice(0, existedIndex),
                    {
                        ...item,
                        quantity: item.quantity + this.cartItems[existedIndex].quantity
                    },
                    ...this.cartItems.slice(existedIndex + 1),
                ];
            }
        
        },

        removeCartItem(id) {
            this.cartItems = this.cartItems.filter(el => el.id !== id);
        },
    },
});