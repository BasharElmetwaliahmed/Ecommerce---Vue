<template>
  <div v-if="product" class="product-container flex-grow-1 align-items-center">
    <div class="container grow-1 align-items-center d-flex flex-wrap">
      <div class="product-image col-md-6 mb-4">
        <img
          :src="product.image"
          :alt="product.title"
          class="img-fluid rounded shadow-sm w-75" />
      </div>
      <div class="product-details col-md-6">
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-category text-muted">{{ product.category }}</p>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price h4 text-success">
          {{ priceFormatter(product.price) }}
        </p>
        <div class="quantity-controls my-4">
          <div
            class="d-flex gap-2 align-items-center mx-auto justify-content-center">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="decreaseQuantity"
              :disabled="totalAmount <= 0">
              -
            </button>
            <span class="quantity-display">{{ totalAmount }}</span>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="increaseQuantity">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="spinner-border mx-auto my-5" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cartstore";
export default {
  data() {
    return {
      cart: useCartStore(),
      product: null,
    };
  },
  computed: {
    totalAmount() {
      return this.cart.cart.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },
    totalPrice() {
      return this.cart.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
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
    fetchProduct() {
      const productId = this.$route.params.productId;
      console.log(productId);
      fetch(`http://localhost:3000/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          this.product = data;
          console.log(this.product);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    },
    increaseQuantity() {
      this.cart.increaseQuantity(this.product);
    },
    decreaseQuantity() {
      this.cart.decreaseQuantity(this.product);
    },
    clearCart() {
      this.cart.removeProduct(this.product);
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  display: flex;
}

.product-image {
  text-align: center;
}

.product-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-decoration: none;
}

.product-category {
  font-size: 1rem;
  margin-bottom: 15px;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.product-price {
  font-size: 1.8rem;
  font-weight: 600;
}

.quantity-controls .btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity-display {
  font-size: 1.2rem;
  padding: 0 15px;
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}
</style>
