import axios from "axios";
import { auth_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";


const register = async (data) => {
  const response = await axios.post(`${auth_base_url}/signup`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  if (response.status === 201) {
    localStorage.setItem('user-info', JSON.stringify(response?.data?.response))
  }
  // console.log(response)
  return response.data
  
  
}

const updateAvatar = async(data)=>{
  const response = await axios.put(`${auth_base_url}/update-avatar`, data, getConfig());
  if (response.status === 201) {
    const data = JSON.parse(localStorage.getItem('user-info'))
    const localStorageData = {
      ...data ,
      avatar : response?.data?.response?.avatar
    }
    localStorage.setItem('user-info', JSON.stringify(localStorageData))
  }
  return response.data

}

const login = async (data) => {
  const response = await axios.post(`${auth_base_url}/login`, data);
  if (response.status === 200) {
    localStorage.setItem('user-info', JSON.stringify(response?.data?.response))
  }
  // console.log(response)
  return response.data


}

const authService = {
    
  register, updateAvatar, login
}

export default authService;
