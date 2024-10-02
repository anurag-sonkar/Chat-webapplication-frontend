import axios from "axios";
import { chat_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const getAllChats = async () => {
  const response = await axios.get(`${chat_base_url}/mychats`, getConfig());
  
  console.log(response)
  return response.data
  
  
}

const chatService = {
  getAllChats
}

export default chatService;
