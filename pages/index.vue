<template>
    <div>
        <HeroSection />
        <Nav class="sticky top-0" />
        <div class="sm:w-11/12 md:w-4/5 mx-auto">
            <h1 class="m-5 font-bold text-lg">Featured Products</h1>
            <Featured class="mx-auto" :data="featuredProducts" />
        </div>
        <Ads class="mx-auto sm:m-10" />
        <Newsletter />
        <Footer/>
    </div>
</template>

<script setup>
definePageMeta({
  title: 'Featured products'
});

const { find } = useStrapi4();
const response = await find('products', { 
  filters: {
    featured: {
      $eq: true
    }
  },
  populate: 'image'
});
const featuredProducts = response.data;
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
