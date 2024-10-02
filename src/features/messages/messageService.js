import axios from "axios";
import { message_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const getAllMessages = async (id) => {
  console.log(id)

  const response = await axios.get(`${message_base_url}/message/${id}` , getConfig());

  console.log(response)
  return response.data


}


const messageService = {

  getAllMessages
}

export default messageService;
