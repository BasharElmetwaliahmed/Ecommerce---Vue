import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import { createPinia } from "pinia";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



const pinia = createPinia();



createApp(App).use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
}).use(pinia).use(router).mount("#app");
