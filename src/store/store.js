import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state: {
            getEmpRes: [],
            viewEmpRes: [],
            empObj: {
                "jobTitleName": "",
                "firstName": "",
                "lastName": "",
                "preferredFullName": "Neil Irani",
                "employeeCode": "",
                "region": "",
                "dob": "",
                "phoneNumber": "",
                "emailAddress": ""
            }
        },
        mutations: {
            getEmpData(state, value) {
                state.getEmpRes = value
            },
            updateEmpObjData(state, { key, value }) {
                state.empObj[key] = value
            },
            viewEmpData(state, value) {
                state.viewEmpRes = value
            },
            deleteEmp(state, value) {
                state.getEmpRes = state.getEmpRes.filter(obj => obj.id !== value)
            },
            editEmpData(state, value) {
                state.empObj = value[0]
                let date = value[0].dob.replace(/\//g, '-')
                state.empObj.dob = date.split("-").reverse().join("-")
            }
        }
    }
)