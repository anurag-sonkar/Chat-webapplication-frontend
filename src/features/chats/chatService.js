import axios from "axios";
import { chat_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const getAllChats = async () => {
  const response = await axios.get(`${chat_base_url}/mychats`, getConfig());
  
  // console.log(response)
  return response.data
  
  
}

const createNewGroup = async (data) => {
  // console.log(data)
  const config = getConfig()
  console.log(config.headers.Authorization)
  const response = await axios.post(`${chat_base_url}/group`, data, {
    headers: {
      Authorization: `${config?.headers?.Authorization}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(response)
  return response.data
}

const chatService = {
  getAllChats, createNewGroup
}

export default chatService;
