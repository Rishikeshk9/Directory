import { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { createDepts, fetchDepts } from "../../api/Depts";
import Table from "../Table/Table";
function AddEmployee() {
  const [employeeDetails, setEmpDetails] = useState({
    name: "",
    type: "",
    parent: "",
    mobile: "",
    mobile2: "",
    website: "",
    email: "",
    image: "",
  });

  const [employees, setFetchEmployees] = useState();

  const [designations, setFetchDesignations] = useState(null);
  const [depts, setFetchDepts] = useState(null);
  const [users, setFetchUsers] = useState(null);

  const updateEmployees = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/employees`)
      .then(function (response) {
        console.log(response.data);
        setFetchEmployees(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    async function fetchDesignations() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/designations`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchDesignations(data);
          console.log(designations);
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
    fetchDesignations();

    fetchDepts();
    updateEmployees();
  }, []);

  function handleChange(event) {
    let key = event.target.name;
    setEmpDetails({ ...employeeDetails, [key]: event.target.value });
  }

  const handleImage = (e) => {
    setEmpDetails({ ...employeeDetails, image: e.target.files[0] });
  };

  function handleChangeType(e) {
    setEmpDetails({ ...employeeDetails, type: e.target.value });
  }
  function handleChangeDepartment(e) {
    setEmpDetails({ ...employeeDetails, parent: e.target.value });
  }

  const handleCreateEmployee = () => {
    console.log("Create New Employee... Requesting");
    const formData = new FormData();
    formData.append("name", employeeDetails.name);
    formData.append("designation", employeeDetails.type);
    formData.append("image", employeeDetails.image);
    formData.append("department", employeeDetails.parent);
    formData.append("mobile", employeeDetails.mobile);
    formData.append("mobile2", employeeDetails.mobile2);
    formData.append("website", employeeDetails.website);
    formData.append("email", employeeDetails.email);

    if (employeeDetails.name && employeeDetails.type && employeeDetails.parent)
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/employees`, formData)
        .then(function (response) {
          console.log(response.data);
          alert("Employee added successfully");
          updateEmployees();
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    
  };
  return (
    <div className="px-12 h-screen  ">
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn btn-primary ml-auto">
        Add new
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-slate-100   ">
          <div className="  gap-4  grid grid-cols-2 w-full md:w-1/2 mx-auto  rounded-xl ">
            <div className=" w-full col-span-2  mx-auto  rounded-xl">
              <div className="   gap-4  grid grid-cols-2">
                <input
                  type={"file"}
                  accept=".png, .jpg, .jpeg, "
                  onChange={handleImage}
                  name="image"
                  className="file-input file-input-bordered w-full  col-span-2"
                />
                <input
                  type="text"
                  value={employeeDetails?.name}
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
                    {"Select Designation"}
                  </option>
                  {designations?.length > 0
                    ? designations.map((option, key) => {
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
                  name={"department"}
                  onChange={(e) => handleChangeDepartment(e)}
                >
                  <option selected disabled>
                    {"Select Department"}
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
                  value={employeeDetails.mobile}
                  placeholder="Mobile"
                  onChange={handleChange}
                  name="mobile"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={employeeDetails.mobile2}
                  placeholder="Mobile 2"
                  onChange={handleChange}
                  name="mobile2"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={employeeDetails.website}
                  placeholder="Website"
                  onChange={handleChange}
                  name="website"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={employeeDetails.email}
                  placeholder="Mail ID"
                  onChange={handleChange}
                  name="email"
                  className="input input-bordered   w-full  "
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-success"
                  onClick={() => handleCreateEmployee()}
                >
                  Save
                </button>{" "}
                <label
                  htmlFor="my-modal"
                  className="btn  text-error btn-error btn-ghost"
                >
                  cancel
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full  mt-2 space-y-2">
        <Table data={employees} />
      </div>
    </div>
  );
}

export default AddEmployee;
