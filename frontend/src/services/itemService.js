import axios from 'axios';


const baseURL = 'http://localhost:3000/api'
const itemURL = `${baseURL}/item`

const getItems =async ()=> {
    const response = await axios.get(itemURL);
    console.log(response)
    const {data} = await response.data;
    return data;
}

const createItem = async (item)=>{
    const response = await axios.post(itemURL, item);
    console.log(response)
    const {data} = await response.data;
    return data;
}

export default {getItems, createItem};