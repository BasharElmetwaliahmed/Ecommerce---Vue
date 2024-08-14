<template>
  <main>
    <div class="hero-section">
      <div class="hero-content">
        <img src="/hero-2.c303b8aecb19f8d4efab.jpg" class='hero-img' />
        <h1>Welcome to Our Store</h1>
        <p>Discover our top products and special offers!</p>
      </div>
    </div>
    <div v-if="loading" class="text-center full-screen">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <SectionHeading title="Top Products" />
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
      loading: true,
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        this.loading = true;
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        this.products = result;
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
.hero-section {
  background-color: #F7EFE5;
  color: #982b1c;
  padding: 200px 0;
  text-align: center;
  font-weight: 500;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.full-screen {
  min-height: calc(100vh - 57px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-img{
  max-width: 100%;
  width: 600px;
}
</style>
