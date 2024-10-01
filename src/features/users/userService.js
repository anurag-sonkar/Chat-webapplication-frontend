import axios from "axios";
import { user_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const search = async (search) => {
  const response = await axios.get(`${user_base_url}/?search=${search}`, getConfig());

  return response.data


}

const sendFriendRequest = async (userId) => {
  const response = await axios.put(`${user_base_url}/sendrequest`, {userId}, getConfig())
  console.log(response)
  return response?.data
}

const acceptFriendRequest = async (requestId) => {
  const data = {
    requestId , accept : true
  }
  const response = await axios.put(`${user_base_url}/acceptrequest`, data ,getConfig())
  console.log(response)
  return
}


const userService = {
  search
  , sendFriendRequest, acceptFriendRequest
}

export default userService;
