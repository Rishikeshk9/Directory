import axios from 'axios';
import React,{useEffect} from 'react'
import { useState } from 'react'
import Table from "../Table/Table"
function AddDesignation() {
  const [designation,setDesignation] = useState({
    name:"",
    image:''
  })

  const [designations,setFetchDesignations] = useState({
    name:"",
    image:''
  })

  function handleChange(event) {
    let key = event.target.name;
    setDesignation({ ...designation, [key]: event.target.value });
  }
  const handleImage = (e)=>{
    setDesignation({...designation,image:e.target.files[0]})
  }


  const createDesignation = (t)=>{
    const formData = new FormData();
    formData.append("name",designation.name);
    formData.append("image",designation.image);
    if(designation.name)  
    axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/designations`, formData)
    .then(function (response) {
      console.log(response.data);
      alert('Designation added successfully')
      updateDesignations();
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const updateDesignations = ()=>{
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/designations`)
    .then(function (response) {
      console.log(response.data);
      setFetchDesignations(response.data); 
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    updateDesignations();
  }, [])
  
  return (<div className='px-12 h-screen  '>
     
      {/* The button to open modal */}
<label htmlFor="my-modal" className="btn btn-primary ml-auto">Add new</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal ">
  <div className="modal-box bg-slate-100 text-white ">
  <div className="  gap-4  grid grid-cols-2 w-full md:w-1/2 mx-auto  rounded-xl ">
 
          <input  type={"file"}
          accept=".png, .jpg, .jpeg, "
          onChange={handleImage}
          name="image"className="file-input file-input-bordered w-full  col-span-2" />
        <input
          type="text"
          value={designation.name}
          onChange={handleChange}
          name="name"
          placeholder="Name"
          className="input input-bordered   w-full col-span-2" /><div className="modal-action">
      <button
          className="btn btn-success"
          onClick={() => createDesignation(designation)} >
          Save
        </button>      <label htmlFor="my-modal" className="btn  text-error btn-error btn-ghost">cancel</label>

    </div>
    </div>
  </div>
</div>
<div className='h-full  mt-2 space-y-2'>
      <Table data={designations}/>
      </div>
      
      </div>
  )
}

export default AddDesignation