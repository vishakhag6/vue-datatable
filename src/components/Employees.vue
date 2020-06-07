<template>
  <div class="employees">
    <div class="container">
      <div class="mt-60">
        <div class="emp-header">
          <h1 class="main-heading">Employees</h1>
          <button class="button button-primary" @click="showModalFunc">Create Employee</button>
          <CreateEmp :showModal="showModal" @closeModalFunc="showModal = false" />
        </div>
        <div class="emp-body">
          <Table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table";
import CreateEmp from "../components/CreateEmp";
export default {
  name: "Employees",
  components: {
    Table,
    CreateEmp
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    showModalFunc() {
      this.showModal = true;
    }
  }
};
</script>

<style>
.emp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 18px;
}
.main-heading {
  font-size: 32px;
  font-weight: 500;
}
</style>
