import axios from "axios";
import { user_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const getAllNotifications = async () => {
  const response = await axios.get(`${user_base_url}/getmynotifications`, getConfig())
  // console.log(response)
  return response?.data
}


const notificationService = {
  getAllNotifications, 
}

export default notificationService;
