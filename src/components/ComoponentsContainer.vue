<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 col-lg-4  mb-4" v-for="product in products" :key="product.id">
      <product-card :product="product"></product-card>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "./ProductCard.vue";

export default {

  props: ["products"],
  data: function () {
    return {
      currProducts: this.products,
      active: this.isActive,
    };
  },
  methods: {

  },
  mounted() {
  },
  components:{
    ProductCard
  }
};
</script>
