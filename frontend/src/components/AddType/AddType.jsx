import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Table from "../Table/Table";

function AddType() {
  const [type, setType] = useState({
    name: "",
    image: "",
  });

  const [types, setFetchTypes] = useState(null);

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

  useEffect(() => {
    fetchTypes();
  }, []);

  function handleChange(event) {
    let key = event.target.name;
    setType({ ...type, [key]: event.target.value });
  }
  const handleImage = (e) => {
    setType({ ...type, image: e.target.files[0] });
  };

  const createType = (t) => {
    const formData = new FormData();
    formData.append("name", type.name);
    formData.append("image", type.image);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/types`, formData)
      .then(function (response) {
        console.log(response.data);
        fetchTypes();
        alert("Type added successfully");

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
        <div className="modal-box bg-slate-100 text-black/60 ">
          <div className="  gap-4  grid grid-cols-2 w-full   mx-auto  rounded-xl ">
            <div className=" w-full col-span-2  mx-auto  rounded-xl">
              <div className="   gap-4  grid grid-cols-2">
                <input
                  type={"file"}
                  accept=".png, .jpg, .jpeg, "
                  onChange={handleImage}
                  name="image"
                  className="file-input file-input-bordered   w-full col-span-2"
                />
                <input
                  type="text"
                  value={type.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered   w-full col-span-2"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => createType(type)}
                >
                  Save
                </button>
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
        <Table data={types} callback={fetchTypes} what={"types"}/>
      </div>
    </div>
  );
}

export default AddType;
