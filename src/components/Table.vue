<template>
  <div class="table">
    <div class="search">
      <input type="search" v-model="searchedText" name="search" id="search" placeholder="Search..." />
    </div>
    <div v-if="loading && getEmpRes.length > 0">
      <table class="emp-table">
        <thead>
          <tr>
            <th @click="sort('id')" :class="{'sort-icon': currentSort === 'id'}">ID</th>
            <th
              @click="sort('preferredFullName')"
              :class="{'sort-icon': currentSort === 'preferredFullName'}"
            >FullName</th>
            <th
              @click="sort('employeeCode')"
              :class="{'sort-icon': currentSort === 'employeeCode'}"
            >Employee Code</th>
            <th
              @click="sort('jobTitleName')"
              :class="{'sort-icon': currentSort === 'jobTitleName'}"
            >Job Title</th>
            <th
              @click="sort('phoneNumber')"
              :class="{'sort-icon': currentSort === 'phoneNumber'}"
            >Phone Number</th>
            <th
              @click="sort('emailAddress')"
              :class="{'sort-icon': currentSort === 'emailAddress'}"
            >Email ID</th>
            <th @click="sort('region')" :class="{'sort-icon': currentSort === 'region'}">Region</th>
            <th @click="sort('dob')" :class="{'sort-icon': currentSort === 'dob'}">DOB</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in showProducts" :key="emp.id">
            <td class="pa-0">
              <a class="emp-id" @click="viewEmpHandler(emp.id)">{{emp.id}}</a>
            </td>
            <td>{{emp.preferredFullName}}</td>
            <td>{{emp.employeeCode}}</td>
            <td>{{emp.jobTitleName}}</td>
            <td>{{emp.phoneNumber}}</td>
            <td>{{emp.emailAddress}}</td>
            <td>{{emp.region}}</td>
            <td>{{emp.dob}}</td>
            <td class="pa-0">
              <div class="dropdown">
                <img src="../assets/more.svg" alt width="20" @click="menuDropdownHandler(emp.id)" />
                <div
                  id="myDropdown"
                  class="dropdown-content"
                  v-bind:class="{'show-dropdown': (emp.id === selectedUser)}"
                >
                  <a @click="viewEmpHandler(emp.id)">View</a>
                  <a @click="editEmpHandler(emp.id)">Edit</a>
                  <a @click="deleteEmpHandler(emp.id)">Delete</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" class="prev" :disabled="(this.currentPage) == 1"></button>
        <ul class="paginationList flex-div">
          <li
            v-for="pageNumber in totalPages"
            :key="pageNumber.id"
            :class="{current: currentPage === pageNumber}"
          >
            <a @click="setPage(pageNumber)">{{pageNumber}}</a>
          </li>
        </ul>
        <button
          @click="nextPage"
          class="next"
          :disabled="(this.currentPage*this.pageSize) >= this.getEmpRes.length"
        ></button>
      </div>
    </div>

    <div v-else class="text-center">
      <img src="../assets/loader.gif" alt />
    </div>

    <!-- open modal for view emp -->
    <ViewEmp :showViewModal="showViewModal" @closeModalFunc="showViewModal = false" />
    <CreateEmp :showModal="showModal" @closeModalFunc="showModal = false" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import ViewEmp from "../components/ViewEmp";
import CreateEmp from "../components/CreateEmp";
import { API_ENDPOINTS } from '../store/constants'

export default {
  name: "Table",
  components: {
    ViewEmp,
    CreateEmp
  },
  data() {
    return {
      loading: false,
      searchedText: "",
      showViewModal: false,
      selectedUser: null,
      showModal: false,
      currentSort: "id",
      currentSortDir: "asc",
      pageSize: 2,
      currentPage: 1,
      resultCount: 0
    };
  },
  computed: {
    ...mapState(["getEmpRes"]),
    totalPages: function() {
      return Math.ceil(this.resultCount / this.pageSize);
    },
    showProducts() {
      return this.getEmpRes
        .filter(item => {
          return (
            item.id === this.searchedText ||
            item.preferredFullName.toLowerCase().includes(this.searchedText) ||
            item.employeeCode
              .toString()
              .toLowerCase()
              .includes(this.searchedText) ||
            item.jobTitleName
              .toString()
              .toLowerCase()
              .includes(this.searchedText) ||
            item.phoneNumber
              .toString()
              .toLowerCase()
              .includes(this.searchedText) ||
            item.emailAddress
              .toString()
              .toLowerCase()
              .includes(this.searchedText)
          );
        })
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") {
            modifier = -1;
          }
          if (a[this.currentSort] < b[this.currentSort]) {
            return -1 * modifier;
          }
          if (a[this.currentSort] > b[this.currentSort]) {
            return 1 * modifier;
          }
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) {
            return true;
          }
        });
    }
  },
  mounted() {
    axios
      .get(API_ENDPOINTS.GET_EMP_DATA)
      .then(response => {
        this.loading = true;
        let emp_table_data = response.data[0];
        this.resultCount = emp_table_data.length;
        this.$store.commit("getEmpData", emp_table_data);
      });
    this.loading = false;
  },
  created() {
    window.addEventListener("click", this.close);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.close);
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.selectedUser = null;
      }
    },
    menuDropdownHandler(user) {
      this.selectedUser = user;
    },
    deleteEmpHandler(id) {
      //    axios.delete(`https://my-json-server.typicode.com/darshanp40/employeedb/employees/${id}`)
      //    .then((response) => {
      //         this.$store.commit('deleteEmp', id)
      //     })
      this.$store.commit("deleteEmp", id);
    },
    editEmpHandler(id) {
      this.showModal = true;
      let edit_emp_data = this.getEmpRes.filter(function(item) {
        return item.id == id;
      });
      this.$store.commit("editEmpData", edit_emp_data);
    },
    viewEmpHandler(id) {
      this.showViewModal = true;
      let view_emp_data = this.getEmpRes.filter(function(item) {
        return item.id == id;
      });
      this.$store.commit("viewEmpData", view_emp_data);
    },
    sort(col) {
      if (this.currentSort == col) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = col;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.getEmpRes.length) {
        this.currentPage++;
      }
    },
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
    }
  }
};
</script>

<style>
.emp-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

.emp-table td,
.emp-table th {
  padding: 16px 12px;
}

.emp-table tr {
  border-bottom: 1px solid #ccc;
}

.emp-table th {
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: #666;
  font-size: 14px;
  min-width: 20px;
}

.emp-id {
  color: #3a77ec;
  text-decoration: none;
  padding: 16px 12px;
  cursor: pointer;
}
.search {
  width: 200px;
}
</style>
