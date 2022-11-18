import axios from 'axios';


export  function fetchUsers(){
    axios.get( `${process.env.REACT_APP_SERVER_URL}/api/users` )
    .then(function (response) {

        console.log(response.data);
       return response;
     
    })}
  
