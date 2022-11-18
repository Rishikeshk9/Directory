import { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { fetchUsers } from "../../api/Users";
import { createDepts, fetchDepts } from "../../api/Depts";
import loadTypes from "../../api/Types";
function Navbar() {
  const [deptDetails, setDeptDetails] = useState();
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
          console.log("DEPTS",depts);
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

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">Navbar Title</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-5  gap-4  grid grid-cols-2">
          <div className="rounded-lg w-1/2 h-36 bg-base-300 col-span-2"></div>
          <input
            type="text"
            value={deptDetails?.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
            className="input input-bordered   w-full col-span-2"
          />
          <Dropdown options={types} placeholder={"Select Type"} />
           
          <Dropdown options={depts} placeholder={"Select Parent"} />
          <input
            type="text"
            placeholder="Mobile"
            onChange={handleChange}
            name="mobile"
            className="input input-bordered   w-full  "
          />
          <input
            type="text"
            placeholder="Mobile 2"
            onChange={handleChange}
            name="mobile2"
            className="input input-bordered   w-full  "
          />
          <input
            type="text"
            placeholder="Website"
            onChange={handleChange}
            name="website"
            className="input input-bordered   w-full  "
          />
          <input
            type="text"
            placeholder="Mail ID"
            onChange={handleChange}
            name="mail"
            className="input input-bordered   w-full  "
          />
          <input
            type="text"
            placeholder="Address Line 1"
            onChange={handleChange}
            name="address"
            className="input input-bordered   w-full  col-span-2"
          />
          <input
            type="text"
            placeholder="Address Line 2"
            onChange={handleChange}
            name="address2"
            className="input input-bordered   w-full  "
          />
          <input
            type="text"
            placeholder="City"
            onChange={handleChange}
            name="city"
            className="input input-bordered   w-full  "
          />
          <input
            type="text"
            placeholder="Pin Code"
            onChange={handleChange}
            name="pin"
            className="input input-bordered   w-full  "
          />
          <Dropdown
            options={["UP", "Bihar"]}
            placeholder={"Select State"}
            onChange={handleChange}
            name="state"
          />
          <button
            className="btn btn-primary"
            onClick={() => createDepts(deptDetails)}
          >
            Save
          </button>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
