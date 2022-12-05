import axios from "axios";
import Dropdown from "../dropdown/Dropdown";
import { useEffect, useState } from "react";

function Table(props) {


  const [types, setFetchTypes] = useState(null);
  const [depts, setFetchDepts] = useState(null);
  const [users, setFetchUsers] = useState(null);

  const [details, setDetails] = useState({
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

  function deleteData(id) {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + `/api/${props.what}/` + id, {
        data: {
          id: id,
        },
      })
      .then(props.callback);
  }

  function editData(id, caseName) {

    // switch (caseName) {
    //   case "Dept":
    //     text = "Banana is good!";
    //     break;
    //   case "Designation":
    //     text = "I am not a fan of orange.";
    //     break;
    //   case "Employee":
    //     text = "How you like them apples?";
    //     break;
    //   case "Type":
    //     text = "How you like them apples?";
    //     break;
    //   default:
    //     text = "I have never heard of that...";
    // }
    axios
      .put(process.env.REACT_APP_SERVER_URL + `/api/${props.what}/` + id, {
        data: {
          id: id,

        },
      })
      .then(props.callback);
  }
  
  function handleChange(event) {
    let key = event.target.name;
    setDetails({ ...details, [key]: event.target.value });
  }


  const handleImage = (e) => {
    setDetails({ ...details, image: e.target.files[0] });
  };

  function handleChangeType(e) {
    setDetails({ ...details, type: e.target.value });
  }
  function handleChangeParent(e) {
    setDetails({ ...details, parent: e.target.value });
  }

  function fetchDept(id)
  {
    let data;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/depts/${id}`)
      .then(function (response) {
        console.log(response.data);
        data = response.data;
        setDetails(data);
        console.log("DEPTS", depts);
      })
      .catch((error) => console.log("error", error));
  }

  const handleUpdateDept = (id) => {
    const formData = new FormData(); 
    formData.append("name", details.name);
    formData.append("type", details.type);
    formData.append("image", details.image);
    formData.append("parent", details.parent);
    formData.append("mobile", details.mobile);
    formData.append("mobile2", details.mobile2);
    formData.append("website", details.website);
    formData.append("email", details.email);
    formData.append("address1", details.address1);
    formData.append("address2", details.address2);
    formData.append("city", details.city);
    formData.append("pincode", details.pincode);
    formData.append("state", details.state);
    console.log(details);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/depts/${id}`, formData)
      .then(function (response) {

        //console.log(response.data);
        props.callback();
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="overflow-x-auto w-full rounded-2xl">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Profile</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.length > 0 ? (
            props.data.map((element, key) => {
              return (
                <tr key={key}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              element.image
                                ? element.image
                                : "https://via.placeholder.com/150"
                            }
                            className="h-12 w-12"
                            alt="Avatar"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{element.name}  </p>

                    {/* Edit Modal */}
                    <input
                      type="checkbox"
                      id={`${element.id}edit`}
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box text-center items-center">
                      <div className="   gap-4  grid grid-cols-2">
                <input
                  type={"file"}
                  accept=".png, .jpg, .jpeg, "
                  onChange={handleImage}
                  name="image"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  value={details?.name}
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
                  value={details.mobile}
                  placeholder="Mobile"
                  onChange={handleChange}
                  name="mobile"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={details.mobile2}
                  placeholder="Mobile 2"
                  onChange={handleChange}
                  name="mobile2"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={details.website}
                  placeholder="Website"
                  onChange={handleChange}
                  name="website"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={details.email}
                  placeholder="Mail ID"
                  onChange={handleChange}
                  name="email"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={details.address1}
                  placeholder="Address Line 1"
                  onChange={handleChange}
                  name="address1"
                  className="input input-bordered   w-full  col-span-2"
                />
                <input
                  type="text"
                  value={details.address2}
                  placeholder="Address Line 2"
                  onChange={handleChange}
                  name="address2"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={details.city}
                  placeholder="City"
                  onChange={handleChange}
                  name="city"
                  className="input input-bordered   w-full  "
                />
                <input
                  type="text"
                  value={details.pincode}
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
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateDept(element.id)}
                >
                  Update
                </button>
                <label
                  htmlFor={`${element.id}edit`}
                  className="btn  text-error btn-error btn-ghost"
                >
                  cancel
                </label>
              </div>
                      </div>
                    </div>
                    {/* Delete Modal  */}
                    <input
                      type="checkbox"
                      id={element.id}
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box text-center items-center">
                        <h3 class=" text-lg">
                          Are You Sure to Delete{" "}
                          <span className="font-bold">{element.name}?</span>
                        </h3>
                        <div class="space-x-4 space-y-2 text-center items-center">
                          <label
                            for={element.id}
                            class="btn btn-error"
                            onClick={() => deleteData(element.id)}
                          >
                            Yay!
                          </label>
                          <label for={element.id} class="btn btn-ghost">
                            Cancel
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <label
                    onClick={()=>fetchDept(element.id)}
                      for={`${element.id}edit`}
                      className="btn btn-circle   mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-slate-400"
                        viewBox="0 0 512 512"
                      >
                        {" "}
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                      </svg>
                    </label>
                    <label for={element.id} className="btn btn-circle ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 fill-red-400"
                        viewBox="0 0 448 512"
                      >
                        {" "}
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </label>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Profile</th>
            <th>Designations</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
