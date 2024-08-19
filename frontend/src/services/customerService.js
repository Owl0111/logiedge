import axios from 'axios';


const baseURL = 'http://localhost:3000/api'
const customerURL = `${baseURL}/customer`

const getCustomers =async ()=> {
    const response = await axios.get(customerURL);
    const {data} = await response.data;
    return data;
}

const createCustomer = async (customer)=>{
    const response = await axios.post(customerURL, customer);
    const {data} = await response.data;
    return data;
}

const getCustomerById = async (id) => {
    const response = await axios.get(`${customerURL}/${id}`);
    const {data} = await response.data;
    return data;

}
export default {getCustomers, createCustomer, getCustomerById};