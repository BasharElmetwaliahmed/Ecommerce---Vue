<template>
  <div class="container mt-4">
    <h2 class="my-6">Your Orders</h2>

    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <table
      class="table table-bordered h-fit my-4"
      v-if="!loading && orders.length">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Total Amount</th>
          <th>Total Price</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.totalAmount }} items</td>
          <td>{{ priceFormatter(order.totalPrice) }}</td>
          <td>{{ order.createdAt }}</td>
        </tr>
      </tbody>
    </table>
    <!-- No Orders Message -->
    <div v-else-if="!loading" class="text-center mt-4">
      <p class="mt-2">You have no orders yet.</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authstore";

export default {
  data() {
    return {
      orders: [],
      auth: useAuthStore(),
      loading: true,
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${this.auth.user.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.orders = data.orders || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      this.loading = false;
    }
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
  },
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
}
</style>
