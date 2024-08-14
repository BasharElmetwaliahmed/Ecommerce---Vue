<template>
  <main class="full-screen">
    <div v-if="loading" class="text-center  d-flex justify-content-center align-items-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <SectionHeading title="men clothing" />
      <ComponentContainer :products="products" />
    </div>
  </main>
</template>
<script>
import ComponentContainer from "../components/ComoponentsContainer.vue";
import SectionHeading from "../components/SectionHeading.vue";
export default {
  components: {
    ComponentContainer,
    SectionHeading,
  },
  data() {
    return {
      products: [],
      isActive: true,
      loading: true,
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    updateActive(data) {
      this.isActive = data;
    },
    async getProducts() {
      try {
        this.loading = true;
        const response = await fetch(
          "http://localhost:3000/products?category=men's clothing"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        this.products = result.filter(
          (product) => product.category == "men's clothing"
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.full-screen {
  min-height: calc(100vh - 129px);

}
</style>
