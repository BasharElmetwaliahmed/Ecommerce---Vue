<template>
  <h1 class="my-5 heading-sec">{{ title }}</h1>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style scoped>
.heading-sec {
  position: relative;
  width: fit-content;
  margin: auto;
  text-transform: capitalize;
}
.heading-sec::before {
  content: "";
  position: absolute;
  width: 60px;
  height: 3px;
  background-color: red;
  bottom: -15px;
  transition: all 0.3s ease-in-out;
}
.heading-sec:hover::before {
  width: 100%;
}
</style>
