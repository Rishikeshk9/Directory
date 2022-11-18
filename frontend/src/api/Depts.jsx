import axios from "axios";

export function fetchDepts() {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/depts`)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    });
}

export function createDepts(deptData) {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/depts`, deptData)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
