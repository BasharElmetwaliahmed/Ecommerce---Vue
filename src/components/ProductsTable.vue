<template>
  <div class="container mt-5">
    <h2 class="mb-4">Manage Products</h2>
    <!-- Add Product Button -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      :editedProduct="editedProduct"
      @click="addProductResetModal"
      data-bs-target="#addProductModal">
      Add Product
    </button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!products.length">
          <td colspan="7" class="text-center">No products available.</td>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td>{{ product.title }}</td>
          <td>{{ priceFormatter(product.price) }}</td>
          <td>{{ product.category }}</td>
          <td><img :src="product.image" alt="Product Image" width="50" /></td>
          <td class="d-flex flex-column justify-content-center">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addProductModal"
              class="btn btn-warning btn-sm mb-2"
              @click="editProduct(product)">
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="prepareDelete(product.id)"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmModal">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <DeleteConfirmModal
      @confirm-delete="deleteProduct"
      :deleteLoading="deleteLoading" />
    <CreateProduct
      :editedProduct="editedProduct"
      @fetchProducts="fetchProducts" />
  </div>
</template>

<script>
import DeleteConfirmModal from "./ConfirmationDelete.vue";
import CreateProduct from "./CreateProduct.vue";

export default {
  components: {
    DeleteConfirmModal,
    CreateProduct,
  },
  data() {
    return {
      products: [],
      productToDelete: null,
      deleteLoading: false,
      editedProduct: null,
    };
  },
  async mounted() {
    await this.fetchProducts();
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
    addProductResetModal() {
      console.log("aa");

      this.editedProduct = null;
    },
    async fetchProducts() {
      console.log(this.product);
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    },

    editProduct(product) {
      this.editedProduct = product;
    },
    prepareDelete(id) {
      this.productToDelete = id;
    },
    async deleteProduct() {
      if (this.productToDelete === null) return;
      this.deleteLoading = true;
      try {
        const response = await fetch(
          `http://localhost:3000/products/${this.productToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.products = this.products.filter(
          (product) => product.id !== this.productToDelete
        );
        this.productToDelete = null;
      } catch (error) {
        console.error("There was an error deleting the product!", error);
      } finally {
        this.deleteLoading = false;
        document.getElementById("deleteConfirmModalLabel").click();
      }
    },
  },
  onUpdated: function () {
    this.fetchProducts();
  },
};
</script>

<style>
.table {
  table-layout: auto;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.table td.d-flex {
  height: 100%;
}

.table td.d-flex .btn {
  width: 100%;
}
</style>
