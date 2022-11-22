import { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { createDepts, fetchDepts } from "../../api/Depts";
function AddDept() {
  const [deptDetails, setDeptDetails] = useState({
    name: "",
    type: "",
    parent: "",
    mobile: "",
    mobile2: "",
    website: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    image: "",
  });
  const [types, setFetchTypes] = useState(null);
  const [depts, setFetchDepts] = useState(null);
  const [users, setFetchUsers] = useState(null);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    async function fetchTypes() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/types`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchTypes(data);
          console.log(types);
        })
        .catch((error) => console.log("error", error));
    }

    async function fetchUsers() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchUsers(data);
          console.log(users);
        })
        .catch((error) => console.log("error", error));
    }

    async function fetchDepts() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/depts`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchDepts(data);
          console.log("DEPTS", depts);
        })
        .catch((error) => console.log("error", error));
    }
    fetchTypes();
    fetchUsers();
    fetchDepts();
  }, []);

  function handleChange(event) {
    let key = event.target.name;
    setDeptDetails({ ...deptDetails, [key]: event.target.value });
  }

  const handleImage = (e) => {
    setDeptDetails({ ...deptDetails, image: e.target.files[0] });
  };

  function handleChangeType(e) {
    setDeptDetails({ ...deptDetails, type: e.target.value });
  }
  function handleChangeParent(e) {
    setDeptDetails({ ...deptDetails, parent: e.target.value });
  }

  const handleCreateDept = () => {
    const formData = new FormData();
    formData.append("name", deptDetails.name);
    formData.append("type", deptDetails.type);
    formData.append("image", deptDetails.image);
    formData.append("parent", deptDetails.parent);
    formData.append("mobile", deptDetails.mobile);
    formData.append("mobile2", deptDetails.mobile2);
    formData.append("website", deptDetails.website);
    formData.append("email", deptDetails.email);
    formData.append("address1", deptDetails.address1);
    formData.append("address2", deptDetails.address2);
    formData.append("city", deptDetails.city);
    formData.append("pincode", deptDetails.pincode);
    formData.append("state", deptDetails.state);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/depts`, formData)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="h-screen p-12">
    <div className=" w-full sm:w-1/2 mx-auto shadow-md bg-white rounded-xl">
      <div className="p-5  gap-4  grid grid-cols-2">
        <input
          type={"file"}
          accept=".png, .jpg, .jpeg, "
          onChange={handleImage}
          name="image"
          className="file-input file-input-bordered w-full max-w-xs" 
        />
         <input
          type="text"
          value={deptDetails?.name}
          onChange={handleChange}
          name="name"
          placeholder="Name"
          className="input input-bordered   w-full col-span-2"
        />

        <select
          className="select  select-bordered w-full  "
          onChange={(e) => handleChangeType(e)}
          name={"type"}
        >
          <option selected disabled>
            {"Select Type"}
          </option>
          {types?.length > 0
            ? types.map((option, key) => {
                return (
                  <option key={key} value={option.id}>
                    {option.name}
                  </option>
                );
              })
            : null}
        </select>

        <select
          className="select  select-bordered w-full  "
          name={"parent"}
          onChange={(e) => handleChangeParent(e)}
        >
          <option selected disabled>
            {"Select Parent"}
          </option>
          {depts?.length > 0
            ? depts.map((option, key) => {
                return (
                  <option key={key} value={option.id}>
                    {option.name}
                  </option>
                );
              })
            : null}
        </select>

        <input
          type="text"
          value={deptDetails.mobile}
          placeholder="Mobile"
          onChange={handleChange}
          name="mobile"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.mobile2}
          placeholder="Mobile 2"
          onChange={handleChange}
          name="mobile2"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.website}
          placeholder="Website"
          onChange={handleChange}
          name="website"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.email}
          placeholder="Mail ID"
          onChange={handleChange}
          name="email"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.address1}
          placeholder="Address Line 1"
          onChange={handleChange}
          name="address1"
          className="input input-bordered   w-full  col-span-2"
        />
        <input
          type="text"
          value={deptDetails.address2}
          placeholder="Address Line 2"
          onChange={handleChange}
          name="address2"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.city}
          placeholder="City"
          onChange={handleChange}
          name="city"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.pincode}
          placeholder="Pin Code"
          onChange={handleChange}
          name="pincode"
          className="input input-bordered   w-full  "
        />
        <Dropdown
          options={[{ name: "UP" }, { name: "Bihar" }]}
          placeholder={"Select State"}
          onChange={handleChange}
          name="state"
        />
        <button className="btn btn-primary" onClick={() => handleCreateDept()}>
          Save
        </button>
      </div>
    </div></div>
  );
}

export default AddDept;
