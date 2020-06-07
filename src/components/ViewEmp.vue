<template>
  <div
    id="viewModal"
    class="modal"
    :showViewModal="showViewModal"
    v-bind:class="{'displayModal': showViewModal}"
  >
    <div class="container--small">
      <div class="modal-content" v-for="item in viewEmpRes" :key="item.id">
        <div class="modal-header">
          <span class="subheading">{{item.employeeCode}}</span>
          <h2 class="heading">{{item.preferredFullName}}</h2>
        </div>
        <div class="modal-body">
          <form name="viewForm">
            <div class>
              <div class="viewFormLeft">
                <div class="subheading">Name</div>
                <div class="subheading">Emp Code</div>
                <div class="subheading">Job Title</div>
                <div class="subheading">Phone Number</div>
                <div class="subheading">Email Id</div>
                <div class="subheading">Region</div>
                <div class="subheading">DOB</div>
              </div>
              <div class="viewFormRight">
                <div>{{item.preferredFullName}}</div>
                <div>{{item.employeeCode}}</div>
                <div>{{item.jobTitleName}}</div>
                <div>{{item.phoneNumber}}</div>
                <div>{{item.emailAddress}}</div>
                <div>{{item.region}}</div>
                <div>{{item.dob}}</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer pt-0">
          <button class="button button-secondary" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ViewEmp",
  props: {
    showViewModal: Boolean
  },
  computed: {
    ...mapState(["viewEmpRes"])
  },
  methods: {
    closeModal() {
      this.$emit("closeModalFunc");
    }
  }
};
</script>

<style scoped>
.viewFormRow {
  display: flex;
}
.viewFormLeft {
  width: 50%;
  display: inline-block;
  vertical-align: top;
}
.viewFormLeft div,
.viewFormRight div {
  display: block;
  padding-bottom: 12px;
}
.viewFormRight {
  width: calc(100% - 50% -4px);
  display: inline-block;
}
</style>
