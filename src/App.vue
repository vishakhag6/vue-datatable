<template>
  <div id="app">
    <Header />
    <Employees />
  </div>
</template>

<script>
import Header from "./components/Header";
import Employees from "./components/Employees";

export default {
  name: "App",
  components: {
    Header,
    Employees
  }
};
</script>

<style>
@import "./assets/styles/reset.css";
@import "./assets/styles/common.css";
</style>
