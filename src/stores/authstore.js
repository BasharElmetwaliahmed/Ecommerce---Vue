import { defineStore } from "pinia";
import router from "@/router"; // Adjust the path to where your router is located
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    token: localStorage.getItem("token") || "",
    toast: useToast(),
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await fetch(
          `http://localhost:3000/users?email=${username}&password=${password}`
        );
        const users = await response.json();
        if (users.length > 0 && users[0].password == password) {
          this.user = users[0];
          this.token = users[0].token;
          localStorage.setItem("token", this.token);
          localStorage.setItem("user", JSON.stringify(this.user));
          this.toast.success("Login Success");
          router.push({ path: "/", replace: true });
        } else {
          this.toast.error("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
        this.toast.error("An error occurred");
      }
    },
    logout() {
      this.user = null;
      this.token = "";
      localStorage.clear();
      this.toast.success("Logout Success");
      router.replace("/login");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
