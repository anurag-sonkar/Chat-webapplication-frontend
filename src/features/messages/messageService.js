import axios from "axios";
import { message_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const getAllMessages = async (id) => {
  const response = await axios.get(`${message_base_url}/message/${id}` , getConfig());

  // console.log(response)
  return response.data


}

const sendMessage = async(data)=>{
  console.log("data",data)
  const response = await axios.post(`${message_base_url}/message` , data , getConfig())
  console.log(response)
  return response.data
}


const messageService = {

  getAllMessages, sendMessage
}

export default messageService;
