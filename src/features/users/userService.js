import axios from "axios";
import { user_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const search = async (search) => {
  const response = await axios.get(`${user_base_url}/?search=${search}`, getConfig());
 
  console.log(response)
  return response.data
  
  
}



const userService = {
  search
    
}

export default userService;
