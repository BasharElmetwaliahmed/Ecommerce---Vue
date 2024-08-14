import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage";
import MenPage from "@/views/MenPage";
import AdminPage from "@/views/AdminPage";
import CartPage from "@/views/CartPage";
import LoginPage from "@/views/LoginPage";
import OrdersPage from "@/views/OrderPage";
import ProductPage from "@/views/ProductPage";

import { useAuthStore } from "@/stores/authstore";

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "Home",
    meta: {
      title: "Home",
    },
  },
  {
    name: "men",
    path: "/men",
    component: MenPage,
    meta: {
      description: "Men clothes  page",
      title: "Men",
    },
  },
  {
    name: "electronics",
    path: "/electronics",
    component: MenPage,
    meta: {
      description: "Electronics  page",
      title: "Electronics",
    },
  },
  {
    name: "admin",
    path: "/admin",
    component: AdminPage,
    meta: {
      description: "Add products  page",
      title: "Admin page",
      admin: true,
    },
  },
  {
    name: "productpage",
    path: "/products/:productId",
    component: ProductPage,
    meta: {
      description: "Product  page",
      title: "Product",
    },
  },
  {
    name: "cart",
    path: "/cart",
    component: CartPage,
    meta: {
      title: "Cart",
      authorized: true,
    },
  },
  {
    name: "orders",
    path: "/orders",
    component: OrdersPage,
    meta: {
      title: "Order",
      authorized: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.authorized && !authStore?.user?.id) {
    return next("/login");
  }

  if (to?.meta?.admin) {
    if (!authStore?.user?.id) {
      return next("/login");
    } else if (!authStore?.user?.admin) {
      console.log(authStore);
      return next("/orders");
    }
  }
  console.log(authStore?.user?.admin);

  next();
});
export default router;
