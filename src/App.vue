<template>
  <div class="layout">
    <NavBar msg="Welcome to Your Vue.js App" />
    <router-view />
    <FooterN />
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import FooterN from "@/components/FooterN.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FooterN
  },
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height:100vh ;
}

.layout > .content {
  flex: 1;
}

.layout footer {
  margin-top: auto;
}
</style>
