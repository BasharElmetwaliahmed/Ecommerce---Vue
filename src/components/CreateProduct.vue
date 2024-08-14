<template>
  <div>
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
      ref="addProductModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              id="addProductBtnClose"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="productImageURL" class="form-label"
                  >Image URL</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="productImageURL"
                  v-model="product.image"
                  placeholder="Enter image URL"
                  required />
              </div>
              <div class="mb-3">
                <label for="productTitle" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="productTitle"
                  v-model="product.title"
                  required />
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="productPrice"
                  v-model="product.price"
                  required />
              </div>
              <div class="mb-3">
                <label for="productCategory" class="form-label">Category</label>
                <select
                  class="form-select"
                  id="productCategory"
                  v-model="product.category"
                  required>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label"
                  >Description</label
                >
                <textarea
                  class="form-control"
                  id="productDescription"
                  v-model="product.description"
                  rows="3"
                  required></textarea>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      product: {
        image: "",
        title: "",
        price: "",
        category: "electronics",
        description: "",
      },
      edit: false,
      toast: useToast(),
    };
  },
  props: ["editedProduct"],
  watch: {
    editedProduct: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.product = { ...newVal };
          this.edit = true;
        } else {
          this.resetProduct();
        }
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        const newProduct = {
          image: this.product.image,
          title: this.product.title,
          price: this.product.price,
          category: this.product.category,
          description: this.product.description,
          id: `${Math.floor(Math.random() * (9000 - 100 + 1)) + 100}`,
        };

        if (!Number(this.product.price) || +this.product.price < 0) {
          return this.toast.error("Price must be number greater than 0");
        }
        let method = "POST";
        let url = "http://localhost:3000/products";
        if (this.edit) {
          method = "PUT";
          url += `/${this.product.id}`;
        }
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await response.json();

        this.hideModal();
        this.resetProduct();
        this.$emit("fetchProducts");
        if (this.edit) this.toast.success("Product Edited successfully");
        else this.toast.success("Product created successfully");
      } catch (error) {
        console.error("Error handling the form submission:", error);
      }
    },
    hideModal() {
      document.getElementById("addProductBtnClose").click();
      this.resetProduct();
    },
    resetProduct() {
      this.product = {
        image: "",
        title: "",
        price: "",
        category: "electronics",
        description: "",
      };
      this.edit = false;
    },
  },
};
</script>

<style scoped></style>
