<template>
  <nav
    class="navbar bg-dark navbar-expand-md border-bottom border-body"
    data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="#">Shopping</a>
      <router-link class="nav-link cart-shape mobile-logo" to="/cart"
        ><img src="/icons8-cart-100.png" alt="cart icon" />
        <span>{{ cart.totalAmount }}</span></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/men">Men</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/orders">Orders</router-link>
          </li>
          <li
            class="nav-item"
            v-if="auth.user?.admin"
            to="'/product/'+':product.id'">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link cart-shape nav-logo" to="/cart"
              ><img src="/icons8-cart-100.png" alt="cart icon" />
              <span>{{ cart.totalAmount }}</span></router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item" v-if="auth.token">
            <button class="btn btn-outline-light" @click="auth.logout">
              Logout
            </button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from "@/stores/cartstore";
import { useAuthStore } from "@/stores/authstore";

export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  data() {
    return {
      cart: useCartStore(),
      auth: useAuthStore(),
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 15px;
}

.navbar-brand {
  color: #ffffff;
  font-weight: bold;
  font-size: 25px;
}

.nav-link {
  color: #cccccc;
  font-size: 16px;
  transition: color 0.3s ease-in-out;
  text-align: center;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-item {
  margin-right: 15px;
  text-align: center;
}

.nav-item:last-child {
  margin-right: 0;
}

.navbar-toggler {
  border-color: #ffffff;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=UTF8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%2888, 88, 88, 0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

button.btn {
  font-size: 1rem;
  padding: 7px 5px;
  border-radius: 6px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: block;
  width: 100%;
}

button.btn-outline-light:hover {
  background-color: #ffffff;
  color: #000000;
}

@media (max-width: 767px) {
  button.btn {
    width: auto;
    margin: 0 auto;
  }

  .nav-logo {
    display: none;
  }
  .mobile-logo {
    display: block !important;
  }
}
.mobile-logo {
  display: none;
}
.cart-shape {
  background-color: white;
  padding: 10px;
  border-radius: 50%;
  position: relative;
}
.cart-shape img {
  width: 30px;
}
.cart-shape span {
  position: absolute;
  background-color: red;
  border-radius: 50%;
  padding: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -20px;
  bottom: -5px;
}
.navbar-nav {
  align-items: center;
}
</style>
