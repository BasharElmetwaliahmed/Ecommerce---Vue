<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row justify-content-center form">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authstore";
export default {
  data() {
    return {
      email: "",
      password: "",
      auth:useAuthStore()
    };
  },
  methods: {
    handleSubmit() {
      // Handle login logic here
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      // You can make an API call or perform any other action here
      this.auth.login(this.email,this.password)
    },
  },
};
</script>

<style scoped>
.container {
  min-height: calc(100vh - 81px);
}
.form {
  max-width: 500px;
  width: 500px;
}
</style>
