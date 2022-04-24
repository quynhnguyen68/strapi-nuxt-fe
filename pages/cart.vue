<template>
    <div>
        <HeroSection />
        <Nav class="sticky top-0" />
         <div class="w-4/5 sm:w-1/2 mx-auto">
            <h1 class="m-5 font-bold text-lg">Your Cart</h1>
        </div>

        <div
            v-for="item in getCart"
            :key="item.id"
            class="w-4/5 sm:w-1/2 flex items-center space-x-3 mx-auto shadow-lg m-5 p-3 relative"
        >
            <div>
                <img class="h-24" :src="`http://localhost:1337${item.url}`" alt="" />
            </div>
            <div>
                <p>{{ item.name }}</p>
                <p>{{ formatQuantity(item.quantity) }}</p>
                <p>{{ formatPrice(item.quantity * item.price) }}</p>
                <button 
                    class="button--delete" 
                    @click="deleteCartItem(item.id)"
                >
                    x
                </button>
            </div>
        </div>

        <div class="w-4/5 sm:w-1/2 mb-2 mx-auto">
            <p>
                <span>Total: </span> {{ formatPrice(formatCartTotal(getCartTotal)) }}
            </p>
        
            <button
                v-show="getCartTotal > 0"
                class="button--green mx-auto"
                @click="handleSubmit"
            >
                Checkout
            </button>
        </div>
        <Ads class="mx-auto sm:m-10" />
        <Footer />
    </div>
</template>

<script>
// import { loadStripe } from "@stripe/stripe-js";
import { mapState } from 'pinia';
import { useCartStore } from '../store/index';

export default {
    setup() {
        const cartStore = useCartStore();
        const { create } = useStrapi4();
        return { cartStore, create };
    },

    data() {
        return {
        dataItems: {},
        session: {},
        stripe: {},
        stripePromise: {},
        };
    },

    computed: {
        ...mapState(useCartStore, ['getCart', 'getCartTotal']),
    },

    //   mounted() {
    //     this.displayMessage();
    //   },

    methods: {
        async handleSubmit(e) {

        e.preventDefault();
        const response = await this.create(
            'orders',
            {
                items: this.getCart,
            }
        );

        console.log(response);
    
        // stripe logic
        //   const stripePromise = loadStripe("http://localhost:1337/api");
        //   const session = response;
        //   const stripe = await stripePromise;
        //   const result = await stripe.redirectToCheckout({
        //     sessionId: session.id,
        //   });

        //   if (result.error) {
        //     this.$nuxt.context.error(result.error.message);
        //   }
    },
    // using vue-swal to display messages
    // displayMessage() {
    //   if (this.$route.query.success) {
    //     this.$swal({
    //       title: "Order placed!",
    //       text: "Thanks for placing your orders",
    //       icon: "success",
    //       button: "Ok",
    //     });
    //   } else if (this.$route.query.canceled) {
    //     this.$swal({
    //       title: "Order canceled!",
    //       text: "continue to shop around and checkout when you're ready.",
    //       icon: "warning",
    //       button: "Ok",
    //     });
    //   }
    // },

    formatCartTotal(num) {
        if (num > 0) {
            return num.toFixed(2);
        } else {
            return num;
        }
    },
    
    deleteCartItem(id) {
        this.cartStore.removeCartItem(id);
    },

    formatQuantity(num) {
        const qtyNum = num === 1 ? `${num} unit` : `${num} units`;
        return qtyNum;
    },

    formatPrice(price) {
        return `$${price}`;
    },
  },
};
</script>

<style scoped>
.button--delete {
    @apply right-2 top-2 absolute h-8 w-8;
}
</style>
