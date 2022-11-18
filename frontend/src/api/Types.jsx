import axios from 'axios';


export async function fetchTypes(){
    let data ;
    axios.get( `${process.env.REACT_APP_SERVER_URL}/api/types` )
    .then(function (response) {

        console.log(response.data);
        data = response.data;
       return response.data; 
    })

    return data;
}
  
