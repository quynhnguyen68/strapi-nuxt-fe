<template>
  <div>
    <div
      class="sm:grid grid-cols-2 justify-center shadow-lg items-center gap-3 m-5 md:m-5"
    >
      <div>
        <img
          class="max-h-screen"
          :src="`http://localhost:1337${data.attributes.image.data[0].attributes.url}`"
        />
      </div>
      <div class="sm:m-3 md:m-5 p-3 sm:p-0">
        <p class="my-2">
          <span>Price: </span>{{ formatPrice(data.attributes.price) }}
        </p>
        <span class="my-2">Quantity: </span
        ><input
          v-model="cartItem.quantity"
          class="p-3 border border-solid border-t-0 border-l-0 border-r-0 border-b-1"
          type="number"
        />
        <p class="my-2 text-sm">{{ data.attributes.description }}</p>
        <button
          class="button--green my-2"
          @click="addItemToCart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../store/index';

export default {
    setup() {
        const cartStore = useCartStore();
        return { cartStore };
    },

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            cartItem: {
                id: this.data.id,
                name: this.data.attributes.name,
                url: this.data.attributes.image.data[0].attributes.url,
                price: this.data.attributes.price,
                quantity: 1,
            },
        };
    },

    methods: {
        formatPrice(price) {
            return `$${price}`;
        },
      
        addItemToCart() {
            this.cartStore.setCartItem(this.cartItem);
        },
    },
};
</script>

<style scoped></style>
