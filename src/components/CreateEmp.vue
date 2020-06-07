<template>
  <div id="myModal" class="modal" :showModal="showModal" v-bind:class="{'displayModal': showModal}">
    <div class="container--small">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="main-heading">Create Employee</h2>
        </div>
        <div class="modal-body">
          <form name="createForm">
            <div class="my-12">
              <label>ID</label>
              <div class="create-emp-id width-50">
                <span class="create-emp-id-label">EM</span>
                <input type="text" name="ID" placeholder="02" v-model="employeeCode" />
              </div>
            </div>
            <div class="flex-div">
              <div class="my-12 mr-12">
                <label>FirstName</label>
                <input type="text" name="firstname" placeholder="John" v-model="firstName" />
              </div>
              <div class="my-12">
                <label>LastName</label>
                <input type="text" name="ID" placeholder="Doe" v-model="lastName" />
              </div>
            </div>
            <div class="my-12">
              <label>Job Title</label>
              <input
                type="text"
                name="jobtitle"
                placeholder="Software Engineer"
                v-model="jobTitleName"
              />
            </div>
            <div class="my-12">
              <label>Email</label>
              <input type="text" name="email" placeholder="john@gmail.com" v-model="emailAddress" />
            </div>
            <div class="my-12">
              <label>Phone Number</label>
              <input type="text" name="phone" placeholder="0987654321" v-model="phoneNumber" />
            </div>
            <div class="flex-div">
              <div class="my-12 mr-12">
                <label>Region</label>
                <input type="text" name="region" placeholder="region" v-model="region" />
              </div>
              <div class="my-12">
                <label>DOB</label>
                <input type="date" name="dob" placeholder="dob" v-model="dob" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer pt-0">
          <button class="button button-primary" @click="createEmp">Create</button>
          <button class="button button-secondary" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "CreateEmp",
  props: {
    showModal: Boolean
  },
  computed: {
    ...mapState(["empObj", "viewEmpRes"]),
    employeeCode: {
      get() {
        return this.empObj.employeeCode;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "employeeCode", value });
      }
    },
    firstName: {
      get() {
        return this.empObj.firstName;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "firstName", value });
      }
    },
    lastName: {
      get() {
        return this.empObj.lastName;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "lastName", value });
      }
    },
    jobTitleName: {
      get() {
        return this.empObj.jobTitleName;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "jobTitleName", value });
      }
    },
    emailAddress: {
      get() {
        return this.empObj.emailAddress;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "emailAddress", value });
      }
    },
    phoneNumber: {
      get() {
        return this.empObj.phoneNumber;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "phoneNumber", value });
      }
    },
    region: {
      get() {
        return this.empObj.region;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "region", value });
      }
    },
    dob: {
      get() {
        return this.empObj.dob;
      },
      set(value) {
        this.$store.commit("updateEmpObjData", { key: "dob", value });
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModalFunc");
    },
    createEmp() {
      let payload = {
        ...this.empObj,
        preferredFullName: this.empObj.firstName + this.empObj.lastName
      };
      axios
        .post(
          `https://my-json-server.typicode.com/darshanp40/employeedb/employees/${this.empObj.employeeCode}`,
          payload
        )
        .then(value => {
          let showResMessage = "";
          if (value.status === "201") {
            showResMessage = "Saved successfully";
            alert(showResMessage);
            this.closeModal();
          } else {
            showResMessage =
              "Some error occoured. Please try again after some time";
            alert(showResMessage);
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style scoped>
.create-emp-id {
  display: flex;
  align-items: center;
  padding-left: 0;
}
.create-emp-id-label {
  background: #d2d2d2;
  color: #333;
  padding: 10px;
  border-radius: 4px 0 0 4px;
}
.create-emp-id input {
  border-radius: 0 4px 4px 0;
}
</style>
