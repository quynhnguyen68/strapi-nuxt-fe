<template>
    <div>
        <HeroSection />
        <Nav class="sticky top-0" />
        <h1 class="font-bold m-5 md:mx-10">
            {{ currentProduct.name }}
        </h1>
        <ProductDetail :data="currentProduct" />
        <Ads class="mx-auto sm:m-10" />
        <Newsletter />
        <Footer />
    </div>
</template>

<script setup>
const route = useRoute();
const { findOne } = useStrapi4();
const response = await findOne('products', route.params.id, {
  populate: 'image'
});
const currentProduct = response.data;
</script>

<style scoped></style>
