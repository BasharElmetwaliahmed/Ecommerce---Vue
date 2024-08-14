import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    totalPrice: 0,
    totalAmount: 0,
  }),
  actions: {
    addProduct(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.calculateTotals();
    },
    removeProduct(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
      this.calculateTotals();
    },
    increaseQuantity(addedProduct) {
      const product = this.cart.find((item) => item.id === addedProduct.id);
      if (product) {
        product.quantity++;
        this.calculateTotals();
      } else {
        this.addProduct(addedProduct);
      }
    },
    decreaseQuantity(decreasedProduct) {
      const product = this.cart.find((item) => item.id === decreasedProduct.id);
      console.log(this.cart);
      if (product && product.quantity > 1) {
        product.quantity--;
      } else {
        this.removeProduct(decreasedProduct);
      }
      this.calculateTotals();
    },
    clearCart() {
      this.cart = [];
      this.totalPrice = 0;
      this.totalAmount = 0;
    },
    calculateTotals() {
      this.totalAmount = this.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      this.totalPrice = this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    checkExistence(productId) {
      return this.cart.some((item) => item.id === productId);
    },
  },
});
