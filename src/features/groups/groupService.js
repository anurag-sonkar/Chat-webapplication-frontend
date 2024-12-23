import axios from "axios";
import { chat_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";

const getAllMyGroups = async()=>{
  const response = await axios.get(`${chat_base_url}/mygroups`, getConfig())
  return response.data
}

const updateGroupName = async(data)=>{
  const response = await axios.put(`${chat_base_url}/renamegroup`, data , getConfig())
  return response.data
  
}

const removeGroupMember = async(data)=>{
  const response = await axios.put(`${chat_base_url}/removegroupmember` ,data , getConfig())
  return response.data
}

const addNewGroupMembers = async(data)=>{
  const response = await axios.put(`${chat_base_url}/addgroupmember` ,data , getConfig())
  return response.data

}
const groupService = {
  getAllMyGroups, updateGroupName, removeGroupMember, addNewGroupMembers
}

export default groupService;
