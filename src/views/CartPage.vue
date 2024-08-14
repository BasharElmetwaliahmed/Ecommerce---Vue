<template>
  <div class="container mt-4 page">
    <h2 class="my-6">Shopping Cart</h2>
    <table class="table table-bordered h-fit my-4" v-if="cart.cart.length">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cart.cart" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ priceFormatter(product.price) }}</td>
          <td>{{ product.quantity }}</td>
          <td
            class="d-flex gap-2 justify-content-center align-items-center h-fit">
            <button
              class="btn btn-primary btn-sm"
              @click="increaseQuantity(product)">
              +
            </button>
            <button
              class="btn btn-secondary btn-sm"
              @click="decreaseQuantity(product)">
              -
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="cart.cart.length" class="text-right mt-3">
      <p class="font-weight-bold">Total Amount: {{ totalAmount }} items</p>
      <p class="font-weight-bold">
        Total Price: {{ priceFormatter(totalPrice) }}
      </p>
      <button class="btn btn-success m-3" @click="placeOrder">
        Place Order
      </button>
      <button class="btn btn-danger m-3" @click="clearCart">Clear Cart</button>
    </div>
    <div
      v-else
      class="text-center mt-4 h-full d-flex justify-content-center align-items-center">
      <i class="bi bi-bag"></i>
      <p class="mt-2">Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartstore";
import { useAuthStore } from "../stores/authstore";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      cart: useCartStore(),
      auth: useAuthStore(),
      toast: useToast(),
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
    increaseQuantity(productId) {
      this.cart.increaseQuantity(productId);
    },
    decreaseQuantity(productId) {
      this.cart.decreaseQuantity(productId);
    },
    clearCart() {
      this.cart.clearCart();
    },
    priceFormatter(amount) {
      const formatter = new Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formatter.format(amount);
    },
    async placeOrder() {
  console.log(this.auth.user);
  if (confirm("Are you sure you want to place the order?")) {
    try {
      // Fetch the latest user data to ensure you have the most up-to-date information
      const response = await fetch(`http://localhost:3000/users/${this.auth.user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();

      // Create the new order
      const newOrder = {
        id: userData.orders.length > 0
          ? userData.orders[userData.orders.length - 1].id + 1
          : 1, // Start with ID 1 if there are no orders
        totalAmount: this.totalAmount,
        totalPrice: this.totalPrice,
        createdAt: new Date().toLocaleString(),
      };

      // Append the new order to the existing orders array
      const updatedOrders = [...userData.orders, newOrder];

      // Prepare the updated user data
      const updatedUser = {
        ...userData,
        orders: updatedOrders,
      };

      // Send the PATCH request to update the user data
      const updateResponse = await fetch(`http://localhost:3000/users/${this.auth.user.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update orders');
      }

      this.toast.success("Order placed successfully");
      this.cart.clearCart();
      this.$router.push("/orders");

    } catch (error) {
      console.error("Error placing order:", error);
      this.toast.error("Failed to place order");
    }
  }
}

  },
};
</script>

<style scoped>
.page {
  min-height: calc(100vh - 105px);
  box-sizing: border-box;
}
</style>
