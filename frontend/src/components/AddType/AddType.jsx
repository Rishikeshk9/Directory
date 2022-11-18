import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function AddType() {
  const [type,setType] = useState({
    name:"",
    image:''
  })



  function handleChange(event) {
    let key = event.target.name;
    setType({ ...type, [key]: event.target.value });
  }
  const handleImage = (e)=>{
    setType({...type,image:e.target.files[0]})
  }


  const createType = (t)=>{
    const formData = new FormData();
    formData.append("name",type.name);
    formData.append("image",type.image);

    axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/types`, formData)
    .then(function (response) {
      console.log(response.data);
      alert('Type added successfully')
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
      <div className="p-5  gap-4  grid grid-cols-2">
      <input
          type={"file"}
          accept=".png, .jpg, .jpeg, "
          onChange={handleImage}
          name="image"
          className="input input-bordered   w-full col-span-2"
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
      </div>
    </div>
  )
}

export default AddType