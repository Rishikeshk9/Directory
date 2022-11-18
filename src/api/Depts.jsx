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
    .post(`${process.env.REACT_APP_SERVER_URL}/api/depts`, {
      name: deptData?.name,
      type: deptData?.type,
      parent: deptData?.parent,
      mobile: deptData?.mobile,
      mobile2: deptData?.mobile2,
      website: deptData?.website,
      email: deptData?.mail,
      address: deptData?.address,
      address2: deptData?.address2,
      pin: deptData?.pin,
      state: deptData?.state,
    })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
