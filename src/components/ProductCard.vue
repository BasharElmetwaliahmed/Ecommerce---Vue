<template>
  <div class="card p-4 h-100">
    <img class="card-img" :src="product.image" alt="Product Image" />
    <div class="d-flex justify-content-end">
      <a href="#" class="card-link text-danger like">
        <i class="fas fa-heart"></i>
      </a>
    </div>
    <div class="card-body d-flex flex-column title">
      <router-link
        class="link"
        :to="{
          name: 'productpage',
          params: { productId: product.id },
        }">
        <h4 class="card-title">{{ product.title }}</h4>
      </router-link>
      <h6 class="card-subtitle mb-2 text-muted">{{ product.category }}</h6>
      <p class="card-text">{{ product.description.slice(0, 60) }}...</p>
      <div class="options d-flex flex-fill"></div>
      <div class="buy d-flex justify-content-between align-items-center">
        <div class="price text-success">
          <h5 class="mt-4">{{ priceFormatter(product.price) }}</h5>
        </div>
        <button
          v-if="!isInCart"
          class="btn btn-danger mt-3 cursor-pointer"
          @click="addToCart">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button
          v-else
          class="btn btn-warning mt-3 cursor-pointer"
          @click="removeFromCart">
          <i class="fas fa-trash"></i> Remove from Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartstore";

export default {
  props: ["product"],
  data() {
    return {
      cartstore: useCartStore(),
    };
  },
  computed: {
    isInCart() {
      return this.cartstore.checkExistence(this.product.id);
    },
  },
  methods: {
    priceFormatter(amount) {
      const formatter = new Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formatter.format(amount);
    },
    addToCart() {
      this.cartstore.addProduct(this.product);
    },
    removeFromCart() {
      this.cartstore.removeProduct(this.product.id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.card-img {
  aspect-ratio: 16 / 9;
}
.title,
.link {
  text-decoration: none;
  color: black;
}
</style>
