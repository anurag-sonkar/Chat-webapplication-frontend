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
  console.log(response)
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

// const login = async (userData) => {
//     // console.log(userData)
//     const response = await axios.post(`${auth_base_url}/auth/admin-login`, userData);
//     console.log(response)

//     if(response.status === 201){
//         localStorage.setItem('user',JSON.stringify(response.data))
//     }
//     return response.data.result; 
// }

// const signOut = async ()=>{
//     const response = await axios.put(`${auth_base_url}/logout`,{}, getConfig())
//     if(response.data){
//       ['user', 'collapsed', 'selectedKey', 'dashboardThemeState' , 'tour' , 'offline-image'].forEach((key) => localStorage.removeItem(key));
//     }
//     // console.log(response.data)
//     return response.data
    
// }



// const forgotPassword = async (data)=>{
//   const response = await axios.post(`${auth_base_url}/auth/forgot-password` , data)
//   console.log(response)
//   return response.data
// }

// const resetPassword = async (data)=>{
//   try {
//       const {password ,token} = data
//   const response = await axios.put(`${auth_base_url}/auth/reset-password/${token}` , {password})
//   console.log(response)
//   return response.data
//   } catch (error) {
//       return error.message
      
//   }
// }





const authService = {
    // login,signOut,register,forgotPassword,resetPassword
  register, updateAvatar
}

export default authService;
